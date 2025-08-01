import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './../../../pagescss/SubjectTopics.css';
import Number from './../../topics/QuizNumber';
import useProfileData from "../../home/Profile"; // Import shared logic
import QuizSubmission from '../../Database/QuizSubmission';

function QuizNumber(props) {
    const { type, subject, topic, subjectName } = useParams();
    const [allSubmissions, setAllSubmissions] = useState([]);
    const [filterAllSubmissions, setFilterAllSubmissions] = useState([]);
    const { phone } = useProfileData();
    const { allQuizSubmissions, filterAllQuizSubmissions } = QuizSubmission();

    let nameOfSubject;
    let quizLimit;

    if (subject !== "atoz" && topic !== "atoz") { quizLimit = 6 } else if (subject !== "atoz" && topic === "atoz") { quizLimit = 20 } else { quizLimit = 30 }

    if (subject === "atoz") {
        nameOfSubject = "";
    }
    else {
        nameOfSubject = subject.charAt(0).toUpperCase() + subject.slice(1);
    }

      useEffect(() => {
        if (phone && allSubmissions.length > 0) {
          const filtered = allSubmissions.filter(data => data.userId === phone);
          setFilterAllSubmissions(filtered);
        } else {
          setFilterAllSubmissions([]);
        }
      }, [allSubmissions, phone]);


    useEffect(() => {
        const fetchAllSubmissions = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/quizsubmissions`);
                console.log("Raw response.data from /quizsubmissions:", response.data);
                if (Array.isArray(response.data)) {
                    setAllSubmissions(response.data);
                } else {
                    console.error("Expected an array from /quizsubmissions, but received:", typeof response.data, response.data);
                    setAllSubmissions([]);
                }
            } catch (err) {
                console.error("Error fetching all submissions:", err.response?.data || err.message);
            }
        };
        fetchAllSubmissions();
    }, []);


    return (
        <div className="subject-topics-page">
            <header className="subject-header" style={{ backgroundColor: subject.color }}>
                <div className="header-content">
                    <div className="subject-icon">{subject.icon}</div>
                    <div>
                        <h1> {nameOfSubject} {subjectName} quiz</h1>
                    </div>
                </div>
            </header>


            <div className="topics-container">
                {Number.map((quizNum) => {
                    const quizId = type + subject + topic + quizNum.quizNo;
                    const userSubmission = filterAllQuizSubmissions.find(
                        submission => submission.quizId === quizId
                    );
                    const isUserQuiz = !!userSubmission;
                    const score = isUserQuiz ? userSubmission.score : null;
                    const totalQuestions = isUserQuiz ? userSubmission.totalQuestions : null;

                    return (
                        <>
                            {isUserQuiz ? (
                                <Link
                                    to={`/quiz-details/${quizId}`}
                                    className="link"
                                    key={quizNum.id}
                                >
                                    <div className="topic-card">
                                        <p>Quiz complete</p>
                                        <div className="topic-header">
                                            <h2>{quizNum.quizNo}: {subjectName}</h2>
                                        </div>
                                        <p>Score: {score * 4}/{totalQuestions * 4} ({Math.round(score * 100 / totalQuestions)}%)</p>

                                    </div>
                                </Link>
                            ) : (
                                <Link
                                    to={`/number-of-questions/${type}/${subject}/${topic}/${quizNum.quizNo}/${subjectName}`}
                                    className="link"
                                    key={quizNum.id}
                                >
                                    <div className="topic-card">
                                        <div className="topic-header">
                                            <h2>{quizNum.quizNo}: {subjectName}</h2>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </>
                    );
                }).slice(0, quizLimit)}
            </div>


        </div>


    );
}

export default QuizNumber;