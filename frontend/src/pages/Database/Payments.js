import { useEffect, useState } from "react";
import axios from 'axios';
import UserProfile from "./UserProfile";

const QuizSubmission = () => {
    const [allPayment, setAllPayment] = useState([]);
    const [filterByPhoneAllPayment, setFilterByPhoneAllPayment] = useState([]);
    const { phone } = UserProfile();

    useEffect(() => {
        const fetchAllSubmissions = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/payments`);
                console.log("Raw response.data from /quizsubmissions:", response.data);
                if (Array.isArray(response.data)) {
                    setAllPayment(response.data);
                } else {
                    console.error("Expected an array from /quizsubmissions, but received:", typeof response.data, response.data);
                    setAllPayment([]);
                }
            } catch (err) {
                console.error("Error fetching all submissions:", err.response?.data || err.message);
            }
        };
        fetchAllSubmissions();
    }, []);

    useEffect(() => {
        if (phone && allPayment.length > 0) {
            const filtered = allPayment.filter(data => data.phone === phone);
            setFilterByPhoneAllPayment(filtered);
        } else {
            setFilterByPhoneAllPayment([]);
        }
    }, [allPayment, phone]);



    return { allPayment, filterByPhoneAllPayment };
};

export default QuizSubmission;