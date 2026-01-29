import os
from langchain_community.document_loaders import PyPDFLoader

def load_pdfs_from_folder(folder_path: str):
    """
    Loads all PDF files from a folder
    and returns a list of LangChain Documents.
    """

    documents = []
    for filename in os.listdir(folder_path):
        if filename.endswith(".pdf"):
            file_path = os.path.join(folder_path, filename)
            
            loader = PyPDFLoader(file_path)

            documents.extend(loader.load())
    
    return documents