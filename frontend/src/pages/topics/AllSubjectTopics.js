import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FaCalculator } from 'react-icons/fa';
import PropTypes from 'prop-types';
import PdfFiles from "../Database/PdfFiles";

function AllSubjectTopics({ subject, type, book }) {
  const { allPdfs } = PdfFiles();
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    const filteredPdfs = allPdfs.filter(pdf =>
      pdf.subject === subject &&
      pdf.type === type &&
      pdf.book === book
    );
    setPdfs(filteredPdfs);
  }, [allPdfs, subject, type, book]);


  return (
    <div className="subject-topics-page">
      <header className="subject-header formula-header">
        <div className="header-content">
          <div className="subject-icon" aria-hidden="true">
            <FaCalculator />
          </div>
          <div>
            <h1>{subject} topics </h1>
          </div>
        </div>
      </header>

      <div className="topics-container">
        {pdfs.map((pdf) => (
          <Link
            key={pdf._id}
            to={`/pdf-viewer/${btoa(encodeURIComponent(pdf.pdfPath))}/${btoa(encodeURIComponent(type))}`} // ✅ Base64 encode
            className="link"
          >
            <div className="topic-card">
              <div className="topic-header">
                <h2>{pdf.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

AllSubjectTopics.propTypes = {
  subject: PropTypes.string.isRequired
};

export default AllSubjectTopics;