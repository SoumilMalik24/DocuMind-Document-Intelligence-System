from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

from ingestion.loader import load_pdfs_from_folder
from ingestion.chunking import chunk_documents
from ingestion.embeddings import create_vector_store
from retriever import get_retriever
from rag_pipeline import run_rag
from config import DATA_DIR, VECTOR_STORE_DIR

from pydantic import BaseModel

# -------------------------------------------------
# FastAPI app
# -------------------------------------------------

app = FastAPI(title="DocuMind API")

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------
# Models
# -------------------------------------------------

class QuestionRequest(BaseModel):
    question: str


# -------------------------------------------------
# Health Check
# -------------------------------------------------

@app.get("/health")
def health():
    return {
        "server": "running",
        "documents_uploaded": os.path.exists(DATA_DIR)
        and len(os.listdir(DATA_DIR)) > 0,
        "vector_store_ready": os.path.exists(VECTOR_STORE_DIR),
        "openai_api_key_loaded": bool(os.getenv("OPENAI_API_KEY")),
    }


# -------------------------------------------------
# Upload PDF & Create Embeddings
# -------------------------------------------------

@app.post("/upload")
async def upload_document(file: UploadFile = File(...)):

    # Validate file type
    if not file.filename.lower().endswith(".pdf"):
        return {
            "error": "Only PDF files are supported."
        }

    # Clear old data (fresh knowledge base)
    if os.path.exists(DATA_DIR):
        shutil.rmtree(DATA_DIR)

    if os.path.exists(VECTOR_STORE_DIR):
        shutil.rmtree(VECTOR_STORE_DIR)

    os.makedirs(DATA_DIR, exist_ok=True)

    # Save uploaded file
    file_path = os.path.join(DATA_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        # Ingestion pipeline
        documents = load_pdfs_from_folder(DATA_DIR)
        chunks = chunk_documents(documents)

        create_vector_store(chunks)

    except Exception as e:
        return {
            "error": "Failed to process document.",
            "details": str(e)
        }

    return {
        "message": "Document processed successfully",
        "chunks_created": len(chunks)
    }


# -------------------------------------------------
# Ask Question (RAG)
# -------------------------------------------------

@app.post("/ask")
def ask_question(request: QuestionRequest):

    # Empty question check
    if not request.question.strip():
        return {
            "error": "Question cannot be empty."
        }

    # Vector store existence check
    if not os.path.exists(VECTOR_STORE_DIR):
        return {
            "error": "No document uploaded yet. Please upload a PDF first."
        }

    try:
        answer = run_rag(request.question)
        return {"answer": answer}

    except Exception as e:
        return {
            "error": "Failed to generate answer.",
            "details": str(e)
        }