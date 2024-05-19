import os
# from langchain.llms import OpenAI
# from langchain.embeddings import OpenAIEmbeddings
from langchain_google_genai import GoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import tiktoken

from dotenv import load_dotenv

load_dotenv()

tokenize = tiktoken.get_encoding("cl100k_base")
# llm = OpenAI(
#     model_name="openai/gpt-3.5-turbo-0125", 
#     openai_api_key=os.environ.get("OPENAI_API_KEY") or os.getenv("OPENAI_API_KEY"),
#     openai_api_base = os.environ.get("OPENAI_API_BASE") or os.getenv("OPENAI_API_BASE"),
#     temperature=0, 
#     model_kwargs={
#         "headers": { "HTTP-Referer": "https://github.com" },
#     }
# )

llm = GoogleGenerativeAI(model="gemini-pro", google_api_key=os.environ.get("GOOGLE_API_KEY") or os.getenv("GOOGLE_API_KEY"))
embeddings_model = GoogleGenerativeAIEmbeddings(model="models/embedding-001")


def tiktoken_len(text):
    tokens = tokenize.encode(text, disallowed_special=())

    return len(tokens)
