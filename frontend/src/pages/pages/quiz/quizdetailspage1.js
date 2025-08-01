 // src/components/QuizDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './../../../pagescss/QuizDetailsPage.css'

// Helper to format time (can be moved to a utility file if used elsewhere)
const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

function QuizDetailsPage({ onBackToMain }) {
  const [allSubmissions, setAllSubmissions] = useState([]);
  const [submissionData, setSubmissionData] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { quizId } = useParams();

  useEffect(() => {
    if (quizId && allSubmissions.length > 0) {
      const filtered = allSubmissions.filter(data => data.quizId === quizId);
      setSubmissionData(filtered);
    } else {
      setSubmissionData([]);
    }
  }, [allSubmissions, quizId]);

  useEffect(() => {
    const fetchAllSubmissions = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/quizsubmissions`);
        if (Array.isArray(response.data)) {
          setAllSubmissions(response.data);
        } else {
          console.error("Expected an array from /quizsubmissions, but received:", typeof response.data, response.data);
          setAllSubmissions([]);
        }
      } catch (err) {
        console.error("Error fetching all submissions:", err.response?.data || err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllSubmissions();
  }, []);


  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/questions`);
        console.log("Raw response.data from /quizsubmissions:", response.data);
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("Expected an array from /quizsubmissions, but received:", typeof response.data, response.data);
          setData([]);
        }
      } catch (err) {
        console.error("Error fetching all submissions:", err.response?.data || err.message);
      }
    };
    fetchQuestionData();
  }, []);


  if (isLoading) {
    return <div className="all-submissions-container">Loading all quiz </div>;
  }


  return (
    <div className="all-submissions-container">
      <h2>All Quiz Questions and Answer</h2>

      {submissionData.length === 0 ? (
        <p>No quiz submissions found in the database.</p>
      ) : (
        <ul className="all-submissions-list">
          {submissionData.map((submission) => (

            <li key={submission.submissionId || submission._id} className="submission-full-item"> {/* Changed class name */}

              <p><strong>Quiz:</strong> {submission.quizName}</p>
              <p><strong>Score:</strong> {submission.score * 4}/{submission.totalQuestions * 4} ( {Math.round(submission.score * 100 / submission.totalQuestions)}% )</p>
              <p><strong>Submitted At:</strong> {new Date(submission.submittedAt).toLocaleString()}</p>
              <p><strong>Time Taken:</strong> {formatTime(submission.timeTaken)}</p>

              <h4 className="answers-heading">Questions and Answer:</h4>

              <ul className="answers-list">

                {submission.answers.map((answer, ansIndex) => {
                

                  const questionId = answer.questionId;
                  const correctAns = answer.correctAnswer;
                  const userAns = answer.userAnswer;
                  let correctAnswer = "Not correct ans";
                  let userAnswer = "No answered";

                  const questionData = data.find(
                    submission => submission._id === questionId
                  );
                  const isData =!! questionData;
                
                  if(correctAns === "option1"){
                    correctAnswer = isData ? questionData.option1 : null;
                  } else if(correctAns === "option2"){
                    correctAnswer = isData ? questionData.option2 : null;
                  } else if(correctAns === "option3"){
                    correctAnswer = isData ? questionData.option3 : null;
                  } else if(correctAns === "option4"){
                    correctAnswer = isData ? questionData.option4 : null;
                  } 


                    if(userAns === "option1"){
                    userAnswer = isData ? questionData.option1 : null;
                  } else if(userAns === "option2"){
                    userAnswer = isData ? questionData.option2 : null;
                  } else if(userAns === "option3"){
                    userAnswer = isData ? questionData.option3 : null;
                  } else if(userAns === "option4"){
                    userAnswer = isData ? questionData.option4 : null;
                  } 


                  return (
                    <>       
                      <li key={ansIndex} className={`answer-item ${answer.isCorrect ? "correct" : "incorrect"}`}>
                        <p><strong>Q{ansIndex + 1}:</strong> {answer.questionText}</p>
                        <p>Your Answer: <strong>{userAnswer}</strong></p>
                        <p>Correct Answer: <strong>{correctAnswer}</strong></p>
                        <p className="status-text">{answer.isCorrect ? "Status: Correct" : "Status: Incorrect"}</p>
                      </li>
                    </>
                  )
                })}
              </ul>
            </li>


          ))}
        </ul>
      )}
    </div>
  );
}

export default QuizDetailsPage;