import { useEffect, useState } from "react";
import axios from 'axios';

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [randomQuestions, setRandomQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestionData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/questions`);
                console.log("Raw response.data from /quizsubmissions:", response.data);
                if (Array.isArray(response.data)) {
                    setQuestions(response.data);
                    const shuffledQuestions = shuffleArray(response.data);
                    setRandomQuestions(shuffledQuestions);
                } else {
                    console.error("Expected an array from /quizsubmissions, but received:", typeof response.data, response.data);
                    setQuestions([]);
                    setRandomQuestions([]);
                }
            } catch (err) {
                console.error("Error fetching all submissions:", err.response?.data || err.message);
            }
        };
        fetchQuestionData();
    }, []);


    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }


    return { questions, randomQuestions };
};

export default Questions;