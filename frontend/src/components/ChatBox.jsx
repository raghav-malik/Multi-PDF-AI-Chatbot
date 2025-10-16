import axios from "axios";
import { useState, useEffect, useRef } from "react";

export default function ChatBox() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!query.trim()) return;

    const userMsg = { user: query, bot: null };
    setMessages((prev) => [...prev, userMsg]);
    setQuery("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("query", userMsg.user);

      const res = await axios.post("https://multi-pdf-ai-chatbot-3.onrender.com/chat/", { query });
      const answer = res.data.answer || "No response from AI.";

      setMessages((prev) =>
        prev.map((m, i) => (i === prev.length - 1 ? { ...m, bot: answer } : m))
      );
    } catch (error) {
      console.error(error);
      alert("❌ Chat failed. Check your backend.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-2xl shadow-xl">
      <div className="h-[70vh] overflow-y-auto mb-4 space-y-4 px-2">
        {messages.map((m, i) => (
          <div key={i}>
            {/* User message bubble */}
            <div className="flex justify-end">
              <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-br-none max-w-[75%] text-sm shadow">
                {m.user}
              </div>
            </div>

            {/* Bot message bubble */}
            {m.bot ? (
              <div className="flex justify-start mt-2">
                <div className="bg-gray-700 text-gray-100 p-3 rounded-2xl rounded-bl-none max-w-[75%] text-sm shadow">
                  {m.bot}
                </div>
              </div>
            ) : (
              <div className="flex justify-start mt-2">
                <div className="bg-gray-700 text-gray-100 p-3 rounded-2xl rounded-bl-none max-w-[75%] text-sm shadow">
                  <TypingIndicator />
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input section */}
      <div className="flex items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-grow p-3 bg-gray-700 rounded-l-xl text-white text-sm focus:outline-none"
          placeholder="Ask something about the document..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className={`px-4 py-3 rounded-r-xl text-white font-medium ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
}

// Typing animation component
function TypingIndicator() {
  return (
    <div className="flex space-x-1">
      <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></span>
      <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
      <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
    </div>
  );
}
