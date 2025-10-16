import axios from "axios";
import { useState } from "react";

export default function FileUpload() {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    setLoading(true);
    try {
      await axios.post(
        "https://multi-pdf-ai-chatbot-3.onrender.com/upload-pdfs/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("✅ PDF(s) processed successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to upload PDFs. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 text-center">
      <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
        {loading ? "Processing..." : "Upload PDF(s)"}
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleUpload}
          className="hidden"
        />
      </label>
    </div>
  );
}
