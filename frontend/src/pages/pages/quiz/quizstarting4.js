import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import useProfileData from "../../home/Profile"; // Import shared logic
import Questions from "../../Database/Questions";

import { v4 as uuidv4 } from 'uuid';

const ThreeDotMenu = ({
  questions,
  selectedAnswers,
  markedQuestions,
  currentQuestionIndex,
  handleQuestionButtonClick,
  handleSubmit,
  formatTime,
  timeLeft,
  answeredCount,
  unansweredCount,
  markedCount
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Group questions by subject
  const groupedQuestions = questions.reduce((acc, question, index) => {
    if (!acc[question.subject]) {
      acc[question.subject] = [];
    }
    acc[question.subject].push({ ...question, originalIndex: index });
    return acc;
  }, {});

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-4 right-4 z-50 md:hidden">
      {/* Menu button */}
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full shadow-lg text-white focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Menu content */}
      {isMenuOpen && (
        <div className="absolute top-16 right-0 w-72 bg-white rounded-lg shadow-xl p-4 max-h-[80vh] overflow-y-auto">
          <div className="mb-4">
            <h3 className="font-bold text-gray-800 mb-2">Time Left: {formatTime(timeLeft)}</h3>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-green-600">Answered: {answeredCount}</span>
              <span className="text-gray-600">Unanswered: {unansweredCount}</span>
              <span className="text-yellow-600">Marked: {markedCount}</span>
            </div>

            <h3 className="font-bold text-gray-800 mb-2">Question Navigation</h3>
            {Object.entries(groupedQuestions).map(([subject, subjectQuestions]) => (
              <div key={subject} className="mb-3">
                <h4 className="font-semibold text-gray-700 capitalize mb-1">{subject}</h4>
                <div className="grid grid-cols-5 gap-2">
                  {subjectQuestions.map(({ originalIndex }) => (
                    <button
                      key={originalIndex}
                      onClick={() => {
                        handleQuestionButtonClick(originalIndex);
                        setIsMenuOpen(false);
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                        ${selectedAnswers[originalIndex] ? "bg-green-100 text-green-800" : ""}
                        ${currentQuestionIndex === originalIndex ? "ring-2 ring-blue-500" : ""}
                        ${markedQuestions[originalIndex] ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}
                      `}
                    >
                      {originalIndex + 1}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-xs text-gray-600 mb-2 px-1">
            <span className="flex items-center">
              <span className="w-3 h-3 bg-green-100 rounded-full mr-1"></span>
              Answered
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 bg-yellow-100 rounded-full mr-1"></span>
              Marked
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 bg-gray-100 rounded-full mr-1"></span>
              Unanswered
            </span>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleSubmit(false);
              }}
              className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white font-medium"
            >
              Submit
            </button>
            <Link
              to="/"
              className="flex-1 text-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-800 font-medium"
            >
              Exit
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  const { type, subject, topic, quizNo, quesNum, subjectName } = useParams();
  const quizNum = quizNo ? parseInt(quizNo) : null;
  const { phone } = useProfileData();
  const { randomQuestions } = Questions();

  let questions = [];

  if (subject === "atoz" && topic !== "atoz") {
    questions = randomQuestions.filter(question =>
      question.type === type &&
      question.topic === topic &&
      question.quiz === quizNum
    ).slice(0, quesNum)
  }
  else if (topic === "atoz" && subject !== "atoz") {
    questions = randomQuestions.filter(question =>
      question.type === type &&
      question.subject === subject
    ).slice(0, quesNum)
  }
  else if (subject === "atoz" && topic === "atoz") {
    const mathQuestions = randomQuestions.filter(question =>
      question.type === type &&
      question.subject === "math"
    ).slice(0, Math.round(quesNum / 4));

    const physicsQuestions = randomQuestions.filter(question =>
      question.type === type &&
      question.subject === "physics"
    ).slice(0, Math.round(quesNum / 4));

    const chemistryQuestions = randomQuestions.filter(question =>
      question.type === type &&
      question.subject === "chemistry"
    ).slice(0, Math.round(quesNum / 4));

    const biologyQuestions = randomQuestions.filter(question =>
      question.type === type &&
      question.subject === "biology"
    ).slice(0, Math.round(quesNum / 4));

    questions = [
      ...mathQuestions,
      ...physicsQuestions,
      ...chemistryQuestions,
      ...biologyQuestions
    ];
  }
  else {
    questions = randomQuestions.filter(question =>
      question.type === type &&
      question.subject === subject &&
      question.topic === topic &&
      question.quiz === quizNum
    ).slice(0, quesNum)
  }

  const totalQuizTimeInSeconds = questions.length * 60 * 2;
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

  const quizId = type + subject + topic + quizNo;
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
      userId: phone,
      quizId: quizId,
      quizName: quizName,
      score: calculatedScore,
      totalQuestions: questions.length,
      answers: questions.map((question, index) => ({
        questionId: question._id || index + 1,
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
    return <div className="flex items-center justify-center h-screen">Loading questions...</div>;
  }

  // Group questions by subject for desktop view
  const groupedQuestions = questions.reduce((acc, question, index) => {
    if (!acc[question.subject]) {
      acc[question.subject] = [];
    }
    acc[question.subject].push(index);
    return acc;
  }, {});

  return (

    <div className="min-h-screen bg-gray-50">
      {quizStart ? (
        <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-6">
          {/* Left Side - Question Navigation */}

          <div className="hidden md:block md:w-1/4 bg-white rounded-lg shadow-md p-4 overflow-y-auto">


            <div className="flex justify-between text-xs text-gray-600 mb-4 px-1">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-green-100 rounded-full mr-1"></span>
                Answered
              </span>
              <span className="flex items-center">
                <span className="w-3 h-3 bg-yellow-100 rounded-full mr-1"></span>
                Marked
              </span>

            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Questions:</span>
                <span className="font-medium">{questions.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Answered:</span>
                <span className="font-medium text-green-600">{answeredCount}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Marked:</span>
                <span className="font-medium text-yellow-600">{markedCount}</span>
              </div>
            </div>



            <div className="mb-4">
              <h3 className="font-semibold mb-2">Question Navigation</h3>
              {Object.entries(groupedQuestions).map(([subject, questionIndices]) => (
                <div key={subject} className="mb-3">
                  <h4 className="font-semibold text-gray-700 capitalize mb-1">{subject}</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {questionIndices.map(index => (
                      <button
                        key={index}
                        onClick={() => handleQuestionButtonClick(index)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                          ${selectedAnswers[index] ? "bg-green-100 text-green-800" : ""}
                          ${currentQuestionIndex === index ? "ring-2 ring-blue-500" : ""}
                          ${markedQuestions[index] ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}
                        `}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>


          </div>

          {/* Right Side - Question, Options, Timer and Controls */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold">Time Left: {formatTime(timeLeft)}</h2>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 ">
              {!isSubmitted ? (
                <>
                  <div className="mb-6">
                    <p className="text-lg font-medium">
                      <span className="font-bold">{currentQuestionIndex + 1}.</span> {currentQuestion.question}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {getCurrentOptions().map((option, index) => (
                      <label key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <input
                          type="radio"
                          name="option"
                          value={"option" + (index + 1)}
                          checked={selectedAnswers[currentQuestionIndex] === "option" + (index + 1)}
                          onChange={handleOptionChange}
                          className="h-5 w-5 text-blue-600"
                        />
                        <span className="text-gray-800">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-green-600 mb-4">Quiz Completed!</h2>
                  <h3 className="text-xl mb-6">
                    Your Score: <span className="font-bold">{score * 4} / {questions.length * 4}</span>
                    <span className="text-gray-600 ml-2">({Math.round((score * 100) / questions.length)}%)</span>
                  </h3>

                  <Link
                    to={`/quiz-details/${quizId}`}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Show Questions and Answers
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>

            {!isSubmitted && (
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between">
                  <button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className={`px-4 py-2 rounded-md ${currentQuestionIndex === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={toggleMarkQuestion}
                    className={`px-4 py-2 rounded-md ${markedQuestions[currentQuestionIndex] ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}
                  >
                    {markedQuestions[currentQuestionIndex] ? "Unmark" : "Mark"}
                  </button>
                  {currentQuestionIndex < questions.length - 1 ? (
                    <button
                      onClick={handleNextQuestion}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSubmit(false)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile 3-dot navigation (top-right) */}
          <ThreeDotMenu
            questions={questions}
            selectedAnswers={selectedAnswers}
            markedQuestions={markedQuestions}
            currentQuestionIndex={currentQuestionIndex}
            handleQuestionButtonClick={handleQuestionButtonClick}
            handleSubmit={handleSubmit}
            formatTime={formatTime}
            timeLeft={timeLeft}
            answeredCount={answeredCount}
            unansweredCount={unansweredCount}
            markedCount={markedCount}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Quiz Ready!</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-sm text-blue-600 mb-1">Total Questions</div>
                <div className="text-2xl font-bold text-blue-800">{questions.length}</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-sm text-blue-600 mb-1">Total Time</div>
                <div className="text-2xl font-bold text-blue-800">{formatTime(totalQuizTimeInSeconds)}</div>
              </div>
            </div>
            <h3 className="text-center text-lg font-medium text-gray-700 mb-8">{subjectName}</h3>
            <button
              onClick={handleStartQuiz}
              className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Start Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;