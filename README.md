# 🧠 AI Document Search Chatbot

An **AI-powered multi-PDF search assistant** that lets you upload one or more PDFs and ask natural language questions about their contents.  
This project uses a **Retrieval-Augmented Generation (RAG)** pipeline — combining **LangChain**, **OpenAI GPT**, and **FAISS** for intelligent document understanding.

---

## 🚀 Features

✅ Upload multiple PDF documents  
✅ Ask contextual questions from any PDF  
✅ GPT-powered, human-like responses  
✅ Memory-enabled multi-turn conversations  
✅ Real-time chat interface (React + Tailwind)  
✅ Semantic search using FAISS vector database  
✅ Full-stack FastAPI + React integration  

---

## 🧩 Tech Stack

### 🖥 Frontend
- React.js  
- Tailwind CSS  
- Axios  
- Vite  

### ⚙️ Backend
- FastAPI (Python)
- Uvicorn
- LangChain
- FAISS (Facebook AI Similarity Search)
- PyPDF2
- OpenAI API  

### 🧠 AI / ML Concepts
- **Embeddings:** Transform text into high-dimensional numerical vectors for semantic similarity.
- **RAG (Retrieval-Augmented Generation):** Retrieve document chunks and pass them as context to the GPT model.
- **Vector Database:** FAISS stores embeddings and enables fast nearest-neighbor search.
- **Conversational Memory:** LangChain’s `ConversationBufferMemory` maintains previous chat context.

---

## 🏗️ Project Architecture

```
📂 backend/
│── main.py                  # FastAPI entry point (PDF upload & chat routes)
│── utils/
│   ├── pdf_loader.py        # Extracts text from PDFs using PyPDF2
│   ├── vector_store.py      # Builds FAISS vector store with OpenAI embeddings
│   └── chat_engine.py       # Creates conversational retrieval chain (LLM + retriever + memory)

📂 frontend/
│── src/
│   ├── App.jsx              # Main app integrating upload & chat components
│   ├── components/
│   │   ├── FileUpload.jsx   # Handles multiple PDF uploads
│   │   └── ChatBox.jsx      # Chat interface for Q&A
│   └── main.jsx             # React entry point
│── tailwind.config.js       # Tailwind setup
│── postcss.config.js        # PostCSS configuration
```

---

## ⚡ How It Works

1. **Upload PDFs:**  
   User uploads one or more PDFs through the React frontend.

2. **Text Extraction:**  
   The backend extracts text using **PyPDF2** and concatenates it into a single text corpus.

3. **Text Chunking:**  
   Large texts are split into smaller overlapping chunks using **LangChain’s RecursiveCharacterTextSplitter**.

4. **Embedding Generation:**  
   Each chunk is converted into an **OpenAI embedding vector**.

5. **Vector Store Creation:**  
   The embeddings are stored in a **FAISS database** for semantic search.

6. **Question Answering (RAG):**  
   - When a user asks a question, the system retrieves the most relevant text chunks.  
   - GPT-3.5-turbo then uses those chunks as context to generate a detailed answer.

7. **Memory Integration:**  
   **LangChain’s ConversationBufferMemory** maintains the chat history for multi-turn contextual queries.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/ai-document-search-chatbot.git
cd ai-document-search-chatbot
```

### 2️⃣ Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate     # On Windows
# or source venv/bin/activate  # On Mac/Linux
pip install -r requirements.txt
```

Create a `.env` file:
```
OPENAI_API_KEY=your_openai_api_key
```

Run FastAPI server:
```bash
uvicorn main:app --reload
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Visit:
```
http://localhost:5173/
```

---

## 🧾 Example .env
```
OPENAI_API_KEY=your_openai_api_key
```

---

## 🧩 Future Enhancements

- 🔹 Persistent FAISS database (retain embeddings across restarts)  
- 🔹 OCR support for scanned PDFs (using Tesseract or Unstructured)  
- 🔹 User authentication and saved sessions  
- 🔹 Cloud deployment (Vercel + Render)  
- 🔹 Multi-user conversation handling  

---

## 🧠 Resume-Ready Highlights

- Built a **full-stack AI-powered document search chatbot** using **LangChain, FastAPI, and OpenAI GPT**.  
- Implemented **Retrieval-Augmented Generation (RAG)** with **FAISS** for semantic context retrieval.  
- Enabled **multi-PDF understanding and contextual Q&A** using embeddings and memory.  
- Designed an intuitive **React + Tailwind** frontend for real-time chat interaction.  

