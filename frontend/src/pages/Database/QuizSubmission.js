import  { useEffect, useState } from "react";
import axios from 'axios';
import UserProfile from "./UserProfile";

const QuizSubmission = () => {
    const [allQuizSubmissions, setAllQuizSubmissions] = useState([]);
    const [filterByPhoneAllQuizSubmissions, setFilterByPhoneAllQuizSubmissions] = useState([]);
    const { phone } = UserProfile();

    useEffect(() => {
        const fetchAllSubmissions = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/quizsubmissions`);
                console.log("Raw response.data from /quizsubmissions:", response.data);
                if (Array.isArray(response.data)) {
                    setAllQuizSubmissions(response.data);
                } else {
                    console.error("Expected an array from /quizsubmissions, but received:", typeof response.data, response.data);
                    setAllQuizSubmissions([]);
                }
            } catch (err) {
                console.error("Error fetching all submissions:", err.response?.data || err.message);
            }
        };
        fetchAllSubmissions();
    }, []);

       useEffect(() => {
            if (phone && allQuizSubmissions.length > 0) {
              const filtered = allQuizSubmissions.filter(data => data.userId === phone);
              setFilterByPhoneAllQuizSubmissions(filtered);
            } else {
              setFilterByPhoneAllQuizSubmissions([]);
            }
          }, [allQuizSubmissions, phone]);
    
    

    return { allQuizSubmissions, filterByPhoneAllQuizSubmissions };
};

export default QuizSubmission;