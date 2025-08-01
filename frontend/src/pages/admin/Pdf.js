import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/Pdf.css";

const PdfShowPage = () => {
  const [pdfs, setPdfs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await fetch("http://localhost:3000/pdfs", {
          method: "GET",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch PDFs");
        }

        setPdfs(data);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };

    fetchPdfs();
  }, []);

  const handleDelete = async (pdfId) => {
    try {
      const response = await fetch(`http://localhost:3000/pdfs/${pdfId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete PDF");
      }

      // Remove the deleted PDF from the state
      setPdfs(pdfs.filter(pdf => pdf._id !== pdfId));
    } catch (error) {
      console.error("Error deleting PDF:", error);
    }
  };

  const handleUpdate = (pdfId) => {
    navigate(`/admin/update-pdf/${pdfId}`);
  };

  return (
    <div className="pdf-show-container">
     <div >
       <button className="upload-pdf-button" onClick={() => navigate("/admin/add-pdf")}>
        Upload New PDF ({pdfs.length})
      </button>
      
     </div>
     

      <div className="pdf-list">
        {pdfs.map((pdf) => (
          <div key={pdf._id} className="pdf-item">
            <div className="pdf-info">
              <h3>{pdf.type}</h3>
              <p>{pdf.subject}</p>
            </div>
            <div className="pdf-actions">
              <a
                href={`/pdfs/${pdf.pdfPath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pdf-button view-button"
              >
                View
              </a>
              <button 
                className="pdf-button update-button"
                onClick={() => handleUpdate(pdf._id)}
              >
                Update
              </button>
              <button 
                className="pdf-button delete-button"
                onClick={() => handleDelete(pdf._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PdfShowPage;