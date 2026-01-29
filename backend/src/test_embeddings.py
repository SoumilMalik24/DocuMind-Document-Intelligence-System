from ingestion.loader import load_pdfs_from_folder
from ingestion.chunking import chunk_documents
from ingestion.embeddings import create_vector_store
from retriever.retriever import get_retriever
from config import DATA_DIR

print("Loading documents...")
docs = load_pdfs_from_folder(DATA_DIR)

print("Chunking...")
chunks = chunk_documents(docs)

print("Creating vector store...")
create_vector_store(chunks)

print("Loading retriever...")
retriever = get_retriever()

results = retriever.invoke("What is this document about?")

print("\nRetrieved context:\n")
print(results[0].page_content[:300])
