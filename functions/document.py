import os
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from core.model import tiktoken_len, embeddings, llm0, llm

class DocumentAbout:
    def __init__(self, data = {}):
        self.id = data.get("id") or ""
        self.type = data.get("type") or "query"
        self.name = data.get("name") or ""
        self.processing_status = 0

class DocumentModel:
    def print_debug(self, msg):
        print(f"[id={self.id}] {msg}.")

    def __init__(self, data):
        self.id = data.get("id")
        self.text = data.get("text") or ""
        self.type = data.get("type") or "query"
        self.name = data.get("name") or ""
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=tiktoken_len
        )
        moderu = llm if self.type == "yt" else llm0
        self.chain = load_qa_chain(llm=moderu, chain_type="stuff")
        self.status = None
        self.processing_status = 0
        self.print_debug("New model created")

    def process(self):
        if self.id == None:
            self.status = "Where is the id??"
            self.print_debug(self.status)
            return
        
        if self.type == "query":
            if os.path.exists(f"data/vs_{self.id}"):
                self.faiss_db = FAISS.load_local(f"data/vs_{self.id}", embeddings)
                self.processing_status = 1
                self.print_debug("Loaded previous DB")
            else:
                self.status = "Can't find saved DB."
        else:
            if os.path.exists(f"data/vs_{self.id}"):
                self.status = None
                self.faiss_db = FAISS.load_local(f"data/vs_{self.id}", embeddings)
                self.processing_status = 1
                self.print_debug("Loaded previous DB")
            elif self.text == None or self.text == "":
                self.status = "Where text??"
            else:
                self.status = None
                self.print_debug("Processing")

                chunks = self.text_splitter.split_text(text=self.text)
                self.print_debug(f"Num of chunks: {len(chunks)}")
                self.faiss_db = FAISS.from_texts(chunks, embeddings)
                self.status = None
                self.processing_status = 1
                from wsevent import update_progress
                update_progress(self.id, 1)
                self.faiss_db.save_local(f"data/vs_{self.id}")
                self.print_debug("Saved DB")

    def query(self, text):
        if self.status == None and self.processing_status == 1:
            similar_docs = self.faiss_db.similarity_search(query=text, k=3)
            return self.chain.run(input_documents=similar_docs, question=text)
        else:
            self.print_debug(self.status)
            return self.status