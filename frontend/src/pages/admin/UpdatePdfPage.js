import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style/AdminForm.css"; 

const UpdatePdfPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pdfData, setPdfData] = useState({
    book: "",
    name: "",
    type: "",
    subject: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch current PDF data
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch(`http://localhost:3000/pdfs/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch PDF");
        }

        setPdfData({
          book: data.book || "",
          name: data.name || "",
          type: data.type || "",
          subject: data.subject || ""
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPdf();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPdfData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:3000/pdfs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pdfData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update PDF");
      }

      navigate("/admin/pdf", { state: { success: "PDF updated successfully!" } });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="loading-state">Loading PDF data...</div>;
  }

  if (error) {
    return <div className="error-state">Error: {error}</div>;
  }

  return (
    <div className="admin-form-container">
      <h2>Update PDF Metadata</h2>
      
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label>Book:</label>
          <input
            type="text"
            name="book"
            value={pdfData.book}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={pdfData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={pdfData.type}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={pdfData.subject}
            onChange={handleChange}
            required
          />
        </div>

        {error && <div className="form-error">{error}</div>}

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/admin/pdfs")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update PDF"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePdfPage;