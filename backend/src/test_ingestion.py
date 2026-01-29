from ingestion.loader import load_pdfs_from_folder
from ingestion.chunking import chunk_documents
from config import DATA_DIR

docs = load_pdfs_from_folder(DATA_DIR)
chunks = chunk_documents(docs)

print(f"Pages loaded: {len(docs)}")
print(f"Chunks created: {len(chunks)}")
print(chunks[0].page_content[:300])
