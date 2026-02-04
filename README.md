# 🧠 DocuMind — AI Document Intelligence System

**DocuMind** is an AI-powered document intelligence platform that allows users to **upload PDFs and interact with them using natural language**.
It is built using a **Retrieval-Augmented Generation (RAG)** pipeline, enabling accurate, context-aware answers grounded in document content.

---

## 🚀 Features

* **📄 PDF Upload & Processing**
  Upload PDF documents which are chunked, embedded, and stored in a vector database.

* **💬 Chat with Your Documents**
  Ask natural language questions and receive AI-generated answers based strictly on document context.

* **🎨 Modern AI SaaS UI**
  Clean, dark-themed interface with neon accents built using **React + Tailwind CSS**.

* **🧠 RAG-Based Intelligence**
  Combines semantic search with LLM reasoning for accurate, grounded responses.

* **⚡ Fast & Responsive**
  Optimized frontend and async backend APIs for smooth user experience.

---

## 🛠️ Tech Stack

### **Frontend**

* **Framework**: React (Vite)
* **Styling**: Tailwind CSS (v4)
* **HTTP Client**: Fetch / Axios
* **Routing**: React Router
* **Deployment**: Vercel

### **Backend**

* **Framework**: FastAPI
* **RAG Orchestration**: LangChain
* **Vector Store**: FAISS
* **Embeddings**: OpenAI / compatible embedding model
* **LLM**: OpenAI-compatible chat model
* **Deployment**: Render

---

## 📂 Project Structure

```bash
DocuMind-Document-Intelligence-System/
├── frontend/
│   ├── src/
│   │   ├── components/     # UI components (UploadBox, ChatWindow, etc.)
│   │   ├── pages/          # Home & Chat pages
│   │   ├── services/       # API integration layer
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── api/            # FastAPI routes
│   │   ├── services/       # RAG, embeddings, vector logic
│   │   └── core/           # Config & settings
│   ├── main.py
│   └── requirements.txt
│
├── README.md
└── .gitignore
```

---

## ⚡ Getting Started

### Prerequisites

* Node.js (18+ recommended)
* Python 3.9+
* Git

---

## 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at:

```
http://localhost:5173
```

---

## 🔹 Backend Setup

```bash
cd backend
python -m venv venv
```

Activate virtual environment:

```bash
# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the server:

```bash
uvicorn main:app --reload
```

Backend will be available at:

```
http://localhost:8000
```

---

## 🔌 API Overview

### Health Check

```
GET /health
```

### Upload Document

```
POST /upload
Content-Type: multipart/form-data
```

### Ask Question

```
POST /ask
Content-Type: application/json
```

---

## 📸 Screenshots

*Add screenshots or GIFs here to showcase:*

* Upload interface
* Chat interface
* AI responses

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/feature-name`)
3. Commit changes
4. Push to your fork
5. Open a Pull Request

---

## 👤 Author

**Soumil Malik**

* GitHub: [https://github.com/SoumilMalik24](https://github.com/SoumilMalik24)
* LinkedIn: [https://www.linkedin.com/in/soumil-malik](https://www.linkedin.com/in/soumil-malik)

---

## 📄 License

This project is licensed under the **MIT License**.
