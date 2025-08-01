import React from 'react';

export const QuestionNavigation = ({ 
  questions, 
  hasSelectedOption, 
  currentQuestionIndex, 
  markedQuestions, 
  handleQuestionButtonClick 
}) => (
  <div className="question-buttons-section">
    {questions.some(item => item.subject === "math") && (
      <>
        <h3>Math:</h3>
        {questions.map((item, index) => (
          item.subject === "math" ? (
            <button
              key={index}
              className={`question-button
                ${hasSelectedOption[index] ? "selected" : ""}
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
                ${hasSelectedOption[index] ? "selected" : ""}
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
                ${hasSelectedOption[index] ? "selected" : ""}
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
                ${hasSelectedOption[index] ? "selected" : ""}
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
);