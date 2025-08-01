import { useEffect, useState } from "react";

const PdfFiles = () => {
    const [bookPdfs, setBookPdfs] = useState([]);

    useEffect(() => {
        const fetchPdfs = async () => {
            try {
                const response = await fetch("http://localhost:3000/bookpdfs", {
                    method: "GET",
                });
                if (!response.ok) throw new Error('Network response was not ok');

                const data = await response.json();
                 setBookPdfs(data)
            } catch (error) {
                console.error("Error fetching PDFs:", error);
            } finally {
            }
        };

        fetchPdfs();
    }, []);


    return { bookPdfs };
};

export default PdfFiles;