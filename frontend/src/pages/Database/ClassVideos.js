import { useEffect, useState } from "react";

const ClassVideos = () => {
    const [allClassVideo, setAllClassVideo] = useState([]);

    useEffect(() => {
        const fetchPdfs = async () => {
            try {
                const response = await fetch("http://localhost:3000/classvideo", {
                    method: "GET",
                });
                if (!response.ok) throw new Error('Network response was not ok');

                const data = await response.json();
                 setAllClassVideo(data)
            } catch (error) {
                console.error("Error fetching PDFs:", error);
            } finally {
            }
        };

        fetchPdfs();
    }, []);


    return { allClassVideo };
};

export default ClassVideos;