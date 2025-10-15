from langchain_openai import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain

def create_chat_chain(vector_db, memory):
    """
    Create a conversational retrieval chain with memory.
    """
    llm = ChatOpenAI(model="gpt-3.5-turbo")

    retriever = vector_db.as_retriever(search_kwargs={"k": 3})

    chat_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=retriever,
        memory=memory,  # 🧠 Pass the memory object from main.py
        chain_type="stuff",
        verbose=True
    )

    return chat_chain
