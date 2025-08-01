import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./../../../pagescss/QuizStarting.css";
import Questions from "../../Database/Questions";
import UserProfile from "../../Database/UserProfile";
import { formatTime, getCurrentOptions } from "./utils/quizUtils";
import { filterQuestions } from "./utils/questionFilter";
import { QuizResults } from "./components/QuizResults";
import { QuizStartScreen } from "./components/QuizStartScreen";
import { QuestionNavigation } from "./components/QuestionNavigation";
import { useQuizHandlers } from "./hooks/useQuizHandlers";

function QuizQuestions() {
  const { type, subject, topic, quizNo, quesNum, subjectName } = useParams();
  const quizNum = quizNo ? parseInt(quizNo) : null;
  const { randomQuestions } = Questions();
  const { phone } = UserProfile();
  
  const questions = filterQuestions(randomQuestions, type, subject, topic, quizNum, quesNum);
  const totalQuizTimeInSeconds = questions.length * 60 * 2;
  const [quizStart, setQuizStart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(totalQuizTimeInSeconds);

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
    timeLeft // Pass timeLeft to the hook
  );

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
                  <p className="attend"> Answered: {answeredCount} </p>
                  <p className="unattend"> Unanswered: {unansweredCount}</p>
                  <p className="mark"> Mark: {markedCount}</p>
                </div>

                <QuestionNavigation 
                  questions={questions}
                  hasSelectedOption={hasSelectedOption}
                  currentQuestionIndex={currentQuestionIndex}
                  markedQuestions={markedQuestions}
                  handleQuestionButtonClick={handleQuestionButtonClick}
                />
              </div>

              <div className="question-section">
                <p>
                  {currentQuestionIndex + 1}: {currentQuestion.question}
                </p>
              </div>

              <div className="options-section">
                {getCurrentOptions(currentQuestion).map((option, index) => (
                  <div key={index}>
                    <label>
                      <input
                        type="radio"
                        name="option"
                        value={`option${index + 1}`}
                        checked={selectedAnswers[currentQuestionIndex] === `option${index + 1}`}
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
            <QuizResults 
              score={score} 
              questions={questions} 
              quizId={quizId} 
            />
          )}
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

export default QuizQuestions;