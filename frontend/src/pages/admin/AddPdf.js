import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/AdminForm.css"; 

const AddPdf = () => {
  const [formData, setFormData] = useState({
    book: "",
    name: "",
    type: "",
    subject: "",
    pdfFile: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, pdfFile: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("book", formData.book);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("pdfFile", formData.pdfFile);

      const response = await fetch("http://localhost:3000/pdfs", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("PDF uploaded successfully!");
        setFormData({ book: "", name: "", type: "", subject: "", pdfFile: null });
        navigate("/admin/pdf");
      } else {
        alert("Failed to upload PDF.");
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Upload New PDF</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label>Book name (if required):</label>
          <input
            type="text"
            name="book"
            value={formData.book}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Topic name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Upload PDF:</label>
          <input
            type="file"
            name="pdfFile"
            accept="application/pdf"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Upload PDF</button>
          <button 
            type="button" 
            className="view-btn"
            onClick={() => navigate("/admin/pdf")}
          >
            View PDFs
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPdf;