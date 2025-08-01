import React, { useState, useEffect, useCallback  } from "react";
import { useParams, Link } from 'react-router-dom';
import "./../../../pagescss/QuizStarting.css";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid'; 

function App() {

  const { type, subject, topic, quizNo, quesNum, subjectName } = useParams();

  const quizNum = quizNo ? parseInt(quizNo) : null;

  const [quizQuestions, setQuizQuestion] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:3000/questions');
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        const shuffledQuestions = shuffleArray(data);
        setQuizQuestion(shuffledQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }


  let questions = [];

  if (subject === "atoz" && topic !== "atoz") {

    questions = quizQuestions.filter(question =>
      question.type === type &&
      question.topic === topic &&
      question.quiz === quizNum
    ).slice(0, quesNum)

  }
  else if (topic === "atoz" && subject !== "atoz") {
    questions = quizQuestions.filter(question =>
      question.type === type &&
      question.subject === subject 
    ).slice(0, quesNum)

  }
  else if (subject === "atoz" && topic === "atoz") {

    const mathQuestions = quizQuestions.filter(question =>
      question.type === type &&
      question.subject === "math" 
    ).slice(0, Math.round(quesNum / 4));

    const physicsQuestions = quizQuestions.filter(question =>
      question.type === type &&
      question.subject === "physics" 
    ).slice(0, Math.round(quesNum / 4));

    const chemistryQuestions = quizQuestions.filter(question =>
      question.type === type &&
      question.subject === "chemistry" 
    ).slice(0, Math.round(quesNum / 4));

    const biologyQuestions = quizQuestions.filter(question =>
      question.type === type &&
      question.subject === "biology" 
    //  question.quiz === quizNum
    ).slice(0, Math.round(quesNum / 4));

    questions = [
      ...mathQuestions,
      ...physicsQuestions,
      ...chemistryQuestions,
      ...biologyQuestions
    ];
  }
  else {

    questions = quizQuestions.filter(question =>
      question.type === type &&
      question.subject === subject &&
      question.topic === topic &&
      question.quiz === quizNum
    ).slice(0, quesNum)

  }


  const totalQuizTimeInSeconds = questions.length * 60 * 2; // 1000 seconds per question (approx. 16.67 minutes)
  const [quizStart, setQuizStart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(totalQuizTimeInSeconds);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions.length).fill(null)
  );
  const [markedQuestions, setMarkedQuestions] = useState(
    Array(questions.length).fill(false)
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const quizId = type+subject+topic+quizNo;
  const userId = "user_abc_123";
  const quizName = subjectName;

  const handleOptionChange = (event) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = event.target.value;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) =>
      Math.min(prev + 1, questions.length - 1)
    );
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleQuestionButtonClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const toggleMarkQuestion = () => {
    const updatedMarks = [...markedQuestions];
    updatedMarks[currentQuestionIndex] = !updatedMarks[currentQuestionIndex];
    setMarkedQuestions(updatedMarks);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((acc, answer, index) => {
      if (answer === questions[index].answer) {
        return acc + 1;
      }
      return acc;
    }, 0);
  };

  const handleSubmit = useCallback(async (isTimeUp = false) => {
  if (!isTimeUp && !window.confirm("Are you sure you want to submit your answers and finish the exam?")) {
    return;
  }

  const calculatedScore = calculateScore();
  setScore(calculatedScore);
  setIsSubmitted(true);

  const quizResults = {
    submissionId: uuidv4(),
    userId: userId,
    quizId: quizId,
    quizName: quizName,
    score: calculatedScore,
    totalQuestions: questions.length,
    answers: questions.map((question, index) => ({
      questionId: question.questionId || index + 1,
      questionText: question.question,
      userAnswer: selectedAnswers[index] || "Not answered",
      correctAnswer: question.answer,
      isCorrect: selectedAnswers[index] === question.answer,
    })),
    submittedAt: new Date().toISOString(),
    timeTaken: totalQuizTimeInSeconds - timeLeft,
  };

  try {
    const response = await axios.post('http://localhost:3000/quizsubmissions', quizResults);
    console.log('Quiz results saved:', response.data);
  } catch (error) {
    console.error('Error saving quiz results:', error.response?.data || error.message);
  }
}, [
  calculateScore, 
  userId, 
  quizId, 
  quizName, 
  questions, 
  selectedAnswers, 
  totalQuizTimeInSeconds, 
  timeLeft
]);

  const handleStartQuiz = () => {
    setQuizStart(true);
    setIsSubmitted(false);
    setTimeLeft(totalQuizTimeInSeconds);
  };

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit(true);
    }
  }, [timeLeft, isSubmitted, handleSubmit]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getCurrentOptions = () => {
    const question = questions[currentQuestionIndex];
    if (!question) return [];

    return [
      { value: question.option1, label: question.option1 },
      { value: question.option2, label: question.option2 },
      { value: question.option3, label: question.option3 },
      { value: question.option4, label: question.option4 },
    ].filter(option => option.value);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = selectedAnswers.filter((answer) => answer !== null).length;
  const unansweredCount = questions.length - answeredCount;
  const markedCount = markedQuestions.filter((mark) => mark).length;

  if (!currentQuestion) {
    return <div className="app">Loading questions...</div>;
  }


  return (
    <>
      {quizStart ? (

        <div className="app">
          <h1>Quiz App</h1>
          {!isSubmitted ? (

            <>
              <div className="timer-section">
                <h2>Time Left: {formatTime(timeLeft)}</h2>
              </div>
              <div className="question-buttons-section">
                <p>Total questions: {questions.length}</p>
                <div className="questions-markbar">
                  <p className="attend"> Attend: {answeredCount} </p>
                  <p className="unattend"> Unattend: {unansweredCount}</p>
                  <p className="mark"> Mark: {markedCount}</p>
                </div>

                {questions.some(item => item.subject === "math") && (
                  <>
                    <h3>Math:</h3>
                    {questions.map((item, index) => (
                      item.subject === "math" ? (
                        <button
                          key={index}
                          className={`question-button
            ${selectedAnswers[index] ? "selected" : ""}
            ${currentQuestionIndex === index ? "active" : ""}
            ${markedQuestions[index] ? "marked" : ""}`}
                          onClick={() => handleQuestionButtonClick(index)}
                        >
                          {index + 1}
                        </button>
                      ) : null
                    ))}
                  </>
                )}

                {questions.some(item => item.subject === "physics") && (
                  <>
                    <h3>Physics:</h3>
                    {questions.map((item, index) => (
                      item.subject === "physics" ? (
                        <button
                          key={index}
                          className={`question-button
        ${selectedAnswers[index] ? "selected" : ""}
        ${currentQuestionIndex === index ? "active" : ""}
        ${markedQuestions[index] ? "marked" : ""}`}
                          onClick={() => handleQuestionButtonClick(index)}
                        >
                          {index + 1}
                        </button>
                      ) : null
                    ))}
                  </>
                )}

                {questions.some(item => item.subject === "chemistry") && (
                  <>
                    <h3>Chemistry:</h3>
                    {questions.map((item, index) => (
                      item.subject === "chemistry" ? (
                        <button
                          key={index}
                          className={`question-button
        ${selectedAnswers[index] ? "selected" : ""}
        ${currentQuestionIndex === index ? "active" : ""}
        ${markedQuestions[index] ? "marked" : ""}`}
                          onClick={() => handleQuestionButtonClick(index)}
                        >
                          {index + 1}
                        </button>
                      ) : null
                    ))}
                  </>
                )}

                {questions.some(item => item.subject === "biology") && (
                  <>
                    <h3>Biology:</h3>
                    {questions.map((item, index) => (
                      item.subject === "biology" ? (
                        <button
                          key={index}
                          className={`question-button
        ${selectedAnswers[index] ? "selected" : ""}
        ${currentQuestionIndex === index ? "active" : ""}
        ${markedQuestions[index] ? "marked" : ""}`}
                          onClick={() => handleQuestionButtonClick(index)}
                        >
                          {index + 1}
                        </button>
                      ) : null
                    ))}
                  </>
                )}

              </div>

              <div className="question-section">
                <p>
                  {currentQuestionIndex + 1}: {currentQuestion.question}
                </p>
              </div>

              <div className="options-section">
                {getCurrentOptions().map((option, index) => (
                  <div key={index}>
                    <label>

                      <input
                        type="radio"
                        name="option"
                        // value={option.value}
                        value={"option" + (index + 1)}
                        checked={selectedAnswers[currentQuestionIndex] === "option" + (index + 1)}
                        onChange={handleOptionChange}
                      />
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>

              <div className="actions-section">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </button>
                <button
                  onClick={toggleMarkQuestion}
                  style={{ background: "orange", width: "100px" }}
                >
                  {markedQuestions[currentQuestionIndex] ? "Unmark" : "Mark"}
                </button>
                {currentQuestionIndex < questions.length - 1 ? (
                  <button onClick={handleNextQuestion}>Next</button>
                ) : (
                  <button
                    onClick={() => handleSubmit(false)}
                    style={{ backgroundColor: "green", float: "right" }}
                  >
                    Submit
                  </button>
                )}
              </div>
            </>
          ) : (

            <div className="results-section">
              <h2>Quiz Completed!</h2>
              <h3>
                Your Score: {score * 4} / {questions.length * 4}
                <span className="score-percentage">({Math.round((score * 100) / questions.length)}%)</span>
              </h3>

              <Link  to={`/quiz-details/${quizId}`} className="results-link">
                Show Questions and Answers
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginLeft: '8px' }}>
                  <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                </svg>
              </Link>
            </div>

          )}
        </div>

      ) : (
        <>

          <div className="quiz-start-container">
            <h2 className="quiz-start-header">Quiz Ready!</h2>
            <div className="quiz-info-container">
              <div className="quiz-info-item">
                <div className="quiz-info-label">Total Questions</div>
                <div className="quiz-info-value">{questions.length}</div>
              </div>
              <div className="quiz-info-item">
                <div className="quiz-info-label">Total Time</div>
                <div className="quiz-info-value">{formatTime(totalQuizTimeInSeconds)}</div>
              </div>
            </div>
            <h3>{subjectName}</h3>
            <button
              className="start-quiz-btn"
              onClick={() => handleStartQuiz(true)}
            >
              <span className="start-quiz-icon">▶</span>
              Start Quiz
            </button>
          </div>

        </>
      )
      }

    </>
  );
}

export default App;