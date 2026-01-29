import os
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from config import VECTOR_STORE_DIR
from dotenv import load_dotenv

load_dotenv()

def create_vector_store(chunks):
    """
    Creates FAISS vector store from document chunks
    and saves it locally.
    """

    embeddings = OpenAIEmbeddings()

    vector_store = FAISS.from_documents(
        documents=chunks,
        embedding=embeddings)

    os.makedirs(VECTOR_STORE_DIR, exist_ok=True)
    vector_store.save_local(VECTOR_STORE_DIR)

    return vector_store