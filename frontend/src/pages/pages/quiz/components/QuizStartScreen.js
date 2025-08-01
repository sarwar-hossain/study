import React from 'react';
import { formatTime } from '../utils/quizUtils';

export const QuizStartScreen = ({ questions, totalQuizTimeInSeconds, subjectName, handleStartQuiz }) => (
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
      onClick={handleStartQuiz}
    >
      <span className="start-quiz-icon">▶</span>
      Start Quiz
    </button>
  </div>
);