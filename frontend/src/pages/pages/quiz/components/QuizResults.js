import React from 'react';
import { Link } from 'react-router-dom';

export const QuizResults = ({ score, questions, quizId }) => (
  <div className="results-section">
    <h2>Quiz Completed!</h2>
    <h3>
      Your Score: {score * 4} / {questions.length * 4}
      <span className="score-percentage">({Math.round((score * 100) / questions.length)}%)</span>
    </h3>

    <Link to={`/quiz-details/${quizId}`} className="results-link">
      Show Questions and Answers
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginLeft: '8px' }}>
        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
      </svg>
    </Link>
  </div>
);