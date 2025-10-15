import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chat_messages");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [pdfUploaded, setPdfUploaded] = useState(
    localStorage.getItem("pdf_uploaded") === "true"
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("pdf_uploaded", pdfUploaded);
  }, [pdfUploaded]);

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) formData.append("files", files[i]);

    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/upload-pdfs/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPdfUploaded(true);
      const successMsg = {
        sender: "bot",
        text: `✅ ${files.length} new PDF(s) added! You can now ask about all uploaded documents.`,
      };
      setMessages((prev) => [...prev, successMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Failed to upload PDFs. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!pdfUploaded) {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: input },
        { sender: "bot", text: "⚠️ Please upload at least one PDF before chatting." },
      ]);
      setInput("");
      return;
    }

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("query", input);

      const res = await axios.post("http://127.0.0.1:8000/chat/", formData);
      const answer = res.data.answer || "No response from AI.";

      setMessages((prev) => [...prev, { sender: "bot", text: answer }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Error fetching response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setPdfUploaded(false);
    localStorage.clear();
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <span className="mr-2">📄</span> AI Multi-PDF Chatbot
      </h1>

      <div className="flex gap-3 mb-4">
        <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold">
          Upload PDF
          <input
            type="file"
            accept="application/pdf"
            multiple
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
        <button
          onClick={handleClearChat}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
        >
          🗑️ Clear Chat
        </button>
      </div>

      

      <div
        id="chat-box"
        className="w-full max-w-2xl h-[70vh] bg-gray-800 rounded-lg p-4 overflow-y-auto shadow-lg mb-4"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`my-2 flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-xl max-w-[75%] ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-100"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-gray-400 italic mt-2">Bot is thinking...</div>
        )}
      </div>

      <div className="w-full max-w-2xl flex">
        <input
          type="text"
          className="flex-1 p-3 rounded-l-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
          placeholder="Ask something about the documents..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-r-lg font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
}
