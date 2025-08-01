import { useEffect, useState } from "react";

const PdfFiles = () => {
  const [allPdfs, setAllPdfs] = useState([]);

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await fetch("http://localhost:3000/pdfs", {
          method: "GET",
        });
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        setAllPdfs(data);

      } catch (error) {
        console.error("Error fetching PDFs:", error);
      } finally {
      }
    };

    fetchPdfs();
  }, []);


  return { allPdfs };
};

export default PdfFiles;