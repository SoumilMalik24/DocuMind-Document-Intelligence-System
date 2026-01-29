import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

DATA_DIR = os.path.join(BASE_DIR, "data", "documents")
VECTOR_STORE_DIR = os.path.join(BASE_DIR, "vector_store")

CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200

TOP_K = 3
