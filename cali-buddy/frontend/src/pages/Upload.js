import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("video", file);

    try {
      const response = await axios.post(
        "http://localhost:5050/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in header
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle upload success (e.g., show a success message, etc.)
      console.log("Upload successful:", response.data);
      setMessage("File uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("File upload failed.");
    }
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <form onSubmit={handleUpload}>
        <div>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Upload;
