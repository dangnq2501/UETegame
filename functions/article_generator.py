import hashlib
import json
import pickle
import requests
import os
import re
from bs4 import BeautifulSoup

from core.model import llm0, llm4, tiktoken_len
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

NUMBER_OF_CRAWLED_WEBSITES = 3
MAXIMUM_ARTICLE_LENGTH = [5000, 2000, 1000]

ARTICLE_GENERATOR_TEMPLATE = """
Instructions:
Article must have the same language as the websites crawled.
Your task is generating a very very long article in markdown about topic "{topic}".
You can use the following informations as a reference:

{websites}

Article:"""

ARTICLE_GENERATOR_PROMPT = PromptTemplate(template=ARTICLE_GENERATOR_TEMPLATE, input_variables=['websites', 'topic'])

class ArticleGenerator:

    def __init__(self, topic):
        self.topic = topic
        self.chain = LLMChain(llm=llm4, prompt=ARTICLE_GENERATOR_PROMPT)
        file_hash = hashlib.blake2b()
        file_hash.update(bytes(topic, 'utf-8'))
        self.id = f"topic_{file_hash.hexdigest()[:32]}"
        self.article = ""

    def run(self):
        contents = self.crawl_data_from_websites()

        # sort contents by length
        contents.sort(key=lambda x: len(x), reverse=True)

        contents = [content[:min(MAXIMUM_ARTICLE_LENGTH[i], len(content))]
                    for i, content in enumerate(contents)]
        
        str_contents = ""

        for i, content in enumerate(contents):
            str_contents += f"Website {i}: {content}\n"
        
        self.article = self.chain.predict(topic=self.topic, websites=str_contents)

        lines = self.article.split('\n')

        self.article = ""
        current_header = None
        image_set = set()
        for i, line in enumerate(lines):
            self.article += line + '\n'

            # check if the line is heading
            if line.startswith('##'):
                current_header = line[3:]

            if current_header is not None and i + 1 < len(lines) and lines[i + 1].startswith('##'):
                images = self.search_images(self.topic + " " + current_header)

                for image in images:
                    if image not in image_set:
                        self.article += f"![{current_header}]({image})\n"
                        image_set.add(image)
                        break

                current_header = None
        
        with open(f"data/{self.id}.md", 'w', encoding="utf-8") as fp:
            print(self.article, file=fp)
        from wsevent import update_progress
        update_progress(self.id, 1)

        return self.article

    def crawl_data_from_websites(self):
        links = self.search(self.topic)
        contents = []

        for link in links:
            try:            
                print("Visiting", link)
                response = requests.get(link)
                soup = BeautifulSoup(response.text, 'lxml')
 
                for el in soup.find_all('header'):
                    el.extract()

                for el in soup.find_all('nav'):
                    el.extract()

                content = soup.text
                content = re.sub(r'\s+', ' ', content).replace('\n', '').replace('\t', '')
                contents.append(content)
            except:
                pass

        return contents

    def search(self, query):
        url = "https://google.serper.dev/search"

        payload = json.dumps({
            "q": query,
            "gl": "vn",
            "hl": "vi"
        })

        headers = {
            'X-API-KEY': os.environ['SERPER_API_KEY'],
            'Content-Type': 'application/json'
        }

        response = requests.request("POST", url, headers=headers, data=payload)
        data = response.json()

        links = [o['link'] for o in data['organic']]
        links = links[:min(NUMBER_OF_CRAWLED_WEBSITES, len(links))]

        return links

    def search_images(self, query):
        url = "https://google.serper.dev/images"

        payload = json.dumps({
            "q": query,
            "gl": "vn",
            "hl": "vi"
        })

        headers = {
            'X-API-KEY': os.environ['SERPER_API_KEY'],
            'Content-Type': 'application/json'
        }

        response = requests.request("POST", url, headers=headers, data=payload)
        data = response.json()

        images = [o['imageUrl'] for o in data['images']]

        return images