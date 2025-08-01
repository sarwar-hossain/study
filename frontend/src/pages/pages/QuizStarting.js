import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./../../pagescss/QuizStarting.css";
import Questions from "../Database/Questions";
import UserProfile from "../Database/UserProfile";
import { formatTime, getCurrentOptions } from "./quiz/utils/quizUtils";
import { filterQuestions } from "./quiz/utils/questionFilter";
import { QuizResults } from "./quiz/components/QuizResults";
import { QuizStartScreen } from "./quiz/components/QuizStartScreen";
import { QuestionNavigation } from "./quiz/components/QuestionNavigation";
import { useQuizHandlers } from "./quiz/hooks/useQuizHandlers";
import { FaBars, FaTimes } from "react-icons/fa";

function QuizStarting() {
  const { type, subject, topic, quizNo, quesNum, subjectName } = useParams();
  const quizNum = quizNo ? parseInt(quizNo) : null;
  const { randomQuestions } = Questions();
  const { phone } = UserProfile();

  let TotallQuestionNumber = 15;

  if (quesNum >= 100) {
    TotallQuestionNumber = 90;
  } else if (quesNum <= 10) {
    TotallQuestionNumber = 10;
  } else {
    TotallQuestionNumber = quesNum;
  }

  const questions = filterQuestions(randomQuestions, type, subject, topic, quizNum, TotallQuestionNumber);
  const totalQuizTimeInSeconds = questions.length * 60 * 2 * 5;
  const [quizStart, setQuizStart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(totalQuizTimeInSeconds);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const quizId = `${type}${subject}${topic}${quizNo}`;
  const quizName = subjectName;

  const {
    selectedAnswers,
    markedQuestions,
    hasSelectedOption,
    currentQuestionIndex,
    isSubmitted,
    score,
    handleOptionChange,
    handleNextQuestion,
    handlePreviousQuestion,
    handleQuestionButtonClick,
    toggleMarkQuestion,
    handleSubmit,
    handleStartQuiz,
  } = useQuizHandlers(
    questions,
    phone,
    quizId,
    quizName,
    totalQuizTimeInSeconds,
    timeLeft
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startQuiz = () => {
    handleStartQuiz();
    setQuizStart(true);
    setTimeLeft(totalQuizTimeInSeconds);
  };

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted && quizStart) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isSubmitted && quizStart) {
      handleSubmit(true);
    }
  }, [timeLeft, isSubmitted, quizStart, handleSubmit]);

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = hasSelectedOption.filter((selected) => selected).length;
  const unansweredCount = questions.length - answeredCount;
  const markedCount = markedQuestions.filter((mark) => mark).length;

  if (!currentQuestion) {
    return <div className="app">Loading questions...</div>;
  }

  return (
    <>
      {quizStart ? (
        <div className="quiz-container">
          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              className="mobile-menu-button"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              {showSidebar ? <FaTimes /> : <FaBars />}
            </button>
          )}

          {/* Sidebar */}
          <div className={`quiz-sidebar ${showSidebar ? 'show' : ''}`}>
            <div className="sidebar-content">
              <div className="sidebar-header">
                <h2>{quizName}</h2>
              </div>

              <div className="question-stats">
                <div className="stat-item">
                  <span className="stat-label">Total:</span>
                  <span className="stat-value">{questions.length}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label answered">Answered:</span>
                  <span className="stat-value">{answeredCount}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label unanswered">Unanswered:</span>
                  <span className="stat-value">{unansweredCount}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label marked">Marked:</span>
                  <span className="stat-value">{markedCount}</span>
                </div>
              </div>

              <div className="question-navigation">
                <QuestionNavigation
                  questions={questions}
                  hasSelectedOption={hasSelectedOption}
                  currentQuestionIndex={currentQuestionIndex}
                  markedQuestions={markedQuestions}
                  handleQuestionButtonClick={(index) => {
                    handleQuestionButtonClick(index);
                    if (isMobile) setShowSidebar(false);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="quiz-main-content">
            <div className="main-content-inner">
              <div className="quiz-header">
                {!isMobile && (<h1>{quizName} Quiz</h1>)}
                {isMobile && (
                  <div className="timer-mobile">
                    <span>Time Left: </span>
                    <span className="time-value">{formatTime(timeLeft)}</span>
                  </div>
                )}

                {!isMobile && (
                  <div className="timer">
                    <span>Time Left: </span>
                    <span className="time-value">{formatTime(timeLeft)}</span>
                  </div>
                )}

              </div>

              {!isSubmitted ? (
                <>

                  <div className="question-container">
                    <div className="question-section">
                      <p className="question-number">Question {currentQuestionIndex + 1} of {questions.length}</p>
                    
                      {currentQuestion.question === "n" ? (
                      <image src="/questionphoto/1.png" alt="Description of image" />
                    ) : (
                      <p className="question-text">{currentQuestion.question}</p>
                    )}

                    </div>

                    <div className="options-section">
                      {getCurrentOptions(currentQuestion).map((option, index) => (
                        <div key={index} className="option-item">
                          <label className="option-label">
                            <input
                              type="radio"
                              name="option"
                              value={`option${index + 1}`}
                              checked={selectedAnswers[currentQuestionIndex] === `option${index + 1}`}
                              onChange={handleOptionChange}
                              className="option-input"
                            />
                            <span className="option-text">{option.label}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="navigation-buttons">
                    <button
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                      className="nav-button prev-button"
                    >
                      Previous
                    </button>
                    <button
                      onClick={toggleMarkQuestion}
                      className={`nav-button mark-button ${markedQuestions[currentQuestionIndex] ? 'marked' : ''}`}
                    >
                      {markedQuestions[currentQuestionIndex] ? "Unmark" : "Mark"}
                    </button>
                    {currentQuestionIndex < questions.length - 1 ? (
                      <button
                        onClick={handleNextQuestion}
                        className="nav-button next-button"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSubmit(false)}
                        className="nav-button submit-button"
                      >
                        Submit
                      </button>
                    )}
                  </div>

                </>
              ) : (
                <QuizResults
                  score={score}
                  questions={questions}
                  quizId={quizId}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <QuizStartScreen
          questions={questions}
          totalQuizTimeInSeconds={totalQuizTimeInSeconds}
          subjectName={subjectName}
          handleStartQuiz={startQuiz}
        />
      )}
    </>
  );
}

export default QuizStarting;