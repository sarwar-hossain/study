import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './../../pagescss/PDFViewer.css';
import UserProfile from '../Database/UserProfile';

function PDFViewer() {
  const { pdfPath, type } = useParams();
  const [pdfError, setPdfError] = useState(false);
  const navigate = useNavigate();
  const {phone} = UserProfile();

  const decodedPath = decodeURIComponent(atob(pdfPath || ''));
  const decodedType = decodeURIComponent(atob(type || '')); 

  const pdfUrl = `${process.env.PUBLIC_URL}/pdfs/${decodedPath}`;

  useEffect(() => {
    if (decodedType.toLowerCase() === "note") {

      
      navigate(`/payment/${btoa(encodeURIComponent(decodedType))}`, { replace: true });
      return;
    }
    const verifyPdf = async () => {
      try {
        const response = await fetch(pdfUrl);
        if (!response.ok) {
          throw new Error('PDF not found');
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/pdf')) {
          throw new Error('Not a valid PDF file');
        }
      } catch (err) {
        console.error('PDF loading error:', err);
        setPdfError(true);
      }
    };

    verifyPdf();
  }, [decodedType, pdfUrl, navigate]);

  if (pdfError) {
    return (
      <div className="pdf-error">
        <h2>Error Loading Document</h2>
        <p>The requested document could not be loaded.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="pdf-container">
      <div className="pdf-viewer">
        <iframe
          title={`PDF Viewer - ${decodedType}`}
          src={`${pdfUrl}#toolbar=0&navpanes=0`}
          className="pdf-iframe"
          onError={() => setPdfError(true)}
        />
      </div>
    </div>
  );
}

export default PDFViewer;