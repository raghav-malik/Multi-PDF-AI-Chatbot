import axios from "axios";
import { useState } from "react";

export default function FileUpload() {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://127.0.0.1:8000/upload-pdf/", formData);
      alert("✅ PDF processed successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to upload PDF. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 text-center">
      <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
        {loading ? "Processing..." : "Upload PDF"}
        <input
          type="file"
          accept="application/pdf"
          onChange={handleUpload}
          className="hidden"
        />
      </label>
    </div>
  );
}
