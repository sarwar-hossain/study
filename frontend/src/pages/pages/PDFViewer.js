import { useParams, Link } from 'react-router-dom';
import './../../pagescss/PDFViewer.css';
import Payments from '../Database/Payments';

function PDFViewer() {
  const { pdfPath, type } = useParams();
  const { filterByPhoneAllPayment } = Payments();

  const decodedPath = decodeURIComponent(atob(pdfPath || ''));
  const decodedType = decodeURIComponent(atob(type || ''));

  const pdfUrl = `${process.env.PUBLIC_URL}/pdfs/${decodedPath}`;

  const UserPayment = filterByPhoneAllPayment.find(
    submission => submission.buyed === decodedType
  );

  const isPayment = !!UserPayment;
  let payed = false;

  let name = "", price = 99;
  name = decodedType[0].toUpperCase() + decodedType.slice(1).toLowerCase();

  if (decodedType === "formula") {
    price = 199;
    payed = true;
  } else if (decodedType === "note") {
    price = 699;
    payed = true;
  } else if (decodedType === "book1") {
    price = 399;
    payed = true;
  } else if (decodedType === "book2") {
    price = 299;
    payed = true;
  }else if (decodedType === "book3") {
    price = 199;
    payed = true;
  }


  return (
    <>
      {isPayment || !payed ? (
        <>
          <div className="pdf-container">
            <div className="pdf-viewer">
              <iframe
                title={`PDF Viewer`}
                src={`${pdfUrl}#toolbar=0&navpanes=0`}
                className="pdf-iframe"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="payment-container">

          <div className="payment-section">
            <div className="note-details">
              <h2 className="note-title">{name}</h2>
              <div className="detail-row">
                <span className="detail-label">About:</span>
                <span className="detail-value">This is  out best {decodedType}</span>
              </div>
              <div className="price-section">
                <span className="price-label">Price:</span>
                <span className="price-value">₹{price}</span>
              </div>
            </div>
            <Link
              to={`/payment/${btoa(encodeURIComponent(decodedPath))}/${btoa(encodeURIComponent(price))}/${btoa(encodeURIComponent(decodedType))}`}
              className="payment-button"
            >
              Purchase Now
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default PDFViewer;