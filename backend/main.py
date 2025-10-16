from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from utils.pdf_loader import extract_text_from_pdf
from utils.vector_store import build_vector_store
from utils.chat_engine import create_chat_chain
from langchain.memory import ConversationBufferMemory
from dotenv import load_dotenv
from io import BytesIO

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🧩 Global memory and vector store (shared across uploads)
combined_text = ""
vector_db = None
chat_memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
chat_chain = None

@app.get("/")
def root():
    return {"message": "✅ Multi-PDF AI Chatbot Backend is running successfully!"}

@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/upload-pdfs/")
async def upload_pdfs(files: list[UploadFile]):
    """
    Handles one or more PDF uploads.
    Each new upload adds to the global vector database and conversation memory.
    """
    global combined_text, vector_db, chat_chain, chat_memory

    new_text = ""
    for file in files:
        content = await file.read()
        pdf_text = extract_text_from_pdf(BytesIO(content))
        new_text += pdf_text + "\n"

    # Append new text to combined text memory
    combined_text += new_text

    # Rebuild the full vector store with *all* text seen so far
    vector_db = build_vector_store(combined_text)

    # Recreate chat chain but keep the *existing memory* (conversation context)
    chat_chain = create_chat_chain(vector_db, chat_memory)

    return {"message": f"{len(files)} new PDF(s) processed and added to chat memory!"}


@app.post("/chat/")
async def chat(query: str = Form(...)):
    global chat_chain

    if not query.strip():
        return {"answer": ""}

    if chat_chain is None:
        return {"answer": "⚠️ Please upload at least one PDF before chatting."}

    response = chat_chain({"question": query})
    return {"answer": response["answer"]}
