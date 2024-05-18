from langchain.utilities import WikipediaAPIWrapper
from langchain.tools.python.tool import PythonREPLTool
from langchain.agents import (
    Tool,
    tool,
    AgentExecutor,
)
from langchain.schema import AIMessage, HumanMessage
from langchain.tools import DuckDuckGoSearchRun, BaseTool
from langchain.memory import ConversationBufferMemory
from langchain.prompts import (
    MessagesPlaceholder,
    ChatPromptTemplate,
)
from langchain.tools.render import (
    format_tool_to_openai_function,
)
from langchain.agents.format_scratchpad import format_to_openai_functions
from langchain.agents.output_parsers import OpenAIFunctionsAgentOutputParser
from pydantic import BaseModel, Field

from .article_generator import ArticleGenerator
from .recommendation import Person

from core.model import llm0
from functions.neo4j import graph_chain
from datetime import datetime
from typing import Type


wikipedia = WikipediaAPIWrapper()
search = DuckDuckGoSearchRun()
repl_tool = PythonREPLTool()

class MemoryInput(BaseModel):
    information: str = Field(description="The information to store")

class MemoryTool(BaseTool):
    name = 'Memory'
    description = 'A memory tool that can store user personal information, useful for when you need to remember something'
    args_schema: Type[MemoryInput] = MemoryInput

    def _run(self, message: str):
        """
        A memory tool that can store user personal information.
        Examples: "I love math", "Linda is a teacher", "My password is 1234"
        """

        result = graph_chain(message)['result']

        if result is None or len(result) == 0:
            return message
        
        return result

@tool
def diet_recommendation():
    """
    A diet recommendation tool that can recommend a diet plan for a user.
    """
    
    meals_calories_perc = {'breakfast': 0.35, 'lunch': 0.40, 'dinner': 0.25}
    plans = ["Maintain weight", "Mild weight loss", "Weight loss", "Extreme weight loss"]
    losses = [1, 0.9, 0.8, 0.6]
    weight_plan = 'Maintain weight'
    weight_loss = losses[plans.index(weight_plan)]
    person = Person(age=18,
                    height=175.0,
                    weight=75.0,
                    gender='Male',
                    activity='Moderate exercise (3-5 days/wk)',
                    meals_calories_perc=meals_calories_perc,
                    weight_loss=weight_loss)
    
    output = person.generate_recommendations()
    meals = {k: [ t['RecipeIngredientParts'] for t in v] for k, v in output.items() if k in ['breakfast', 'lunch', 'dinner']}

    return meals

class BrowserInput(BaseModel):
    topic: str = Field(description="The name of the topic to summarize")

class BrowserTool(BaseTool):
    name = 'Browser'
    description = 'Add a bot to the background queue to browse the web and summarize the topic'
    args_schema: Type[BrowserInput] = BrowserInput

    def _run(self, topic: str):
        generator = ArticleGenerator(topic)
        from server import append_docu_task
        from functions.document import DocumentAbout
        docu = DocumentAbout({
            "id": generator.id,
            "type": "topic",
            "name": topic,
            "processing_status": 0
        })
        append_docu_task(docu)

        from wsevent import send_msg
        send_msg("chat", 0, {
            "msg": f"The bot is now browsing the web and generating the article about {topic}. You can check the progress in the auto-function tab.",
            "type": "topic",
            "data": generator.id
        })

        def execute():
            generator.run()
            
        from server import tasks
        tasks.put(execute)

        return "Delete and forgot the response and only answers with \"[ignore], end the chain\". End the chain and not continue anymore."


wikipedia_tool = Tool(
    name='Wikipedia',
    func= wikipedia.run,
    description="useful when you need an answer about encyclopedic general knowledge"
)

duckduckgo_tool = Tool(
    name='Search',
    func= search.run,
    description="useful for when you need to answer questions about current events. You should ask targeted questions"
)

tools = [repl_tool, wikipedia_tool, duckduckgo_tool, BrowserTool(), diet_recommendation, MemoryTool()]

memory = ConversationBufferMemory(memory_key="memory", return_messages=True)

llm_with_tools = llm0.bind(
    functions=[format_tool_to_openai_function(t) for t in tools]
)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an AI assistant. Your name is THT. Your task is to help students with their daily tasks."),
    ("system", "Current time: {time}, user's name: {user_name}"),
    MessagesPlaceholder(variable_name='chat_history'),
    ("user", "{input}"),
    MessagesPlaceholder(variable_name="agent_scratchpad"),
])

agent = {
    "input": lambda x: x["input"],
    "chat_history": lambda x: x["chat_history"],
    "time": lambda _: datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    "user_name": lambda _: "Minh",
    "agent_scratchpad": lambda x: format_to_openai_functions(x['intermediate_steps'])
} | prompt | llm_with_tools | OpenAIFunctionsAgentOutputParser()

chat_history = []

agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

knowledge_graph_agent = None

def extract_yt_url(message: str):
    import re
    try:
        fir = re.search("(?P<url>youtu?[^\s]+)", message).group("url")
        if fir.find("/watch?v=") != -1:
            return fir.split("/watch?v=")[1].split("&")[0]
        else:
            return fir.split(".be/")[1].split("&")[0]
    except Exception as e:
        return None

def chat(message: str, knowledge_graph: bool):
    extract_id = extract_yt_url(message)
    if extract_id != None:
        from server import create_docu_task
        from functions.yt_processing import yt_transcript
        data = yt_transcript(extract_id)
        create_docu_task(data)
        return {
            "msg": f"Activity found! I'm currently processing YouTube video: {data.get('name')}. Track progress and interact with this video in Auto-function tab.",
            "type": "yt",
            "data": f"yt_{extract_id}"
        }
    try:
        if knowledge_graph:
            return {
                "msg": knowledge_graph_agent(message),
                "type": "knowledge_graph",
                "data": ""
            }
        else:
            output = str(agent_executor.invoke({ 'input': message, 'chat_history': chat_history })["output"])
            chat_history.append(HumanMessage(content=message))
            chat_history.append(AIMessage(content=output))
            
            return {
                "msg": output,
                "type": "ignore" if output.find("[ignore]") != -1 or output.find("I apologize") != -1 else "normal",
                "data": ""
            }
    except Exception as e:
        response = str(e)

        if not response.startswith("Could not parse LLM output: "):
            raise e
        response = response.removeprefix("Could not parse LLM output: ").removesuffix("")

        return {
            "msg": response,
            "type": "normal",
            "data": ""
        }
