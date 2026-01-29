from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from config import VECTOR_STORE_DIR
from dotenv import load_dotenv

load_dotenv()

def get_retriever(k: int = 3):
    """
    Loads FAISS vector store from disk
    and returns retriever object.
    """

    embeddings = OpenAIEmbeddings()

    vector_store = FAISS.load_local(
        VECTOR_STORE_DIR, 
        embeddings,
        allow_dangerous_deserialization=True)

    return vector_store.as_retriever(search_kwargs={"k": k})