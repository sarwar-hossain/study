import React from 'react';

export const QuestionNavigation = ({ 
  questions, 
  hasSelectedOption, 
  currentQuestionIndex, 
  markedQuestions, 
  handleQuestionButtonClick 
}) => (
  <div className="qnav-container">
    {questions.some(item => item.subject === "math") && (
      <>
        <h3 className="qnav-subject-title">Math:</h3>
        <div className="qnav-buttons-grid">
          {questions.map((item, index) => (
            item.subject === "math" ? (
              <button
                key={index}
                className={`qnav-button
                  ${hasSelectedOption[index] ? "qnav-answered" : ""}
                  ${currentQuestionIndex === index ? "qnav-current" : ""}
                  ${markedQuestions[index] ? "qnav-marked" : ""}`}
                onClick={() => handleQuestionButtonClick(index)}
              >
                {index + 1}
              </button>
            ) : null
          ))}
        </div>
      </>
    )}

    {questions.some(item => item.subject === "physics") && (
      <>
        <h3 className="qnav-subject-title">Physics:</h3>
        <div className="qnav-buttons-grid">
          {questions.map((item, index) => (
            item.subject === "physics" ? (
              <button
                key={index}
                className={`qnav-button
                  ${hasSelectedOption[index] ? "qnav-answered" : ""}
                  ${currentQuestionIndex === index ? "qnav-current" : ""}
                  ${markedQuestions[index] ? "qnav-marked" : ""}`}
                onClick={() => handleQuestionButtonClick(index)}
              >
                {index + 1}
              </button>
            ) : null
          ))}
        </div>
      </>
    )}

    {questions.some(item => item.subject === "chemistry") && (
      <>
        <h3 className="qnav-subject-title">Chemistry:</h3>
        <div className="qnav-buttons-grid">
          {questions.map((item, index) => (
            item.subject === "chemistry" ? (
              <button
                key={index}
                className={`qnav-button
                  ${hasSelectedOption[index] ? "qnav-answered" : ""}
                  ${currentQuestionIndex === index ? "qnav-current" : ""}
                  ${markedQuestions[index] ? "qnav-marked" : ""}`}
                onClick={() => handleQuestionButtonClick(index)}
              >
                {index + 1}
              </button>
            ) : null
          ))}
        </div>
      </>
    )}

    {questions.some(item => item.subject === "biology") && (
      <>
        <h3 className="qnav-subject-title">Biology:</h3>
        <div className="qnav-buttons-grid">
          {questions.map((item, index) => (
            item.subject === "biology" ? (
              <button
                key={index}
                className={`qnav-button
                  ${hasSelectedOption[index] ? "qnav-answered" : ""}
                  ${currentQuestionIndex === index ? "qnav-current" : ""}
                  ${markedQuestions[index] ? "qnav-marked" : ""}`}
                onClick={() => handleQuestionButtonClick(index)}
              >
                {index + 1}
              </button>
            ) : null
          ))}
        </div>
      </>
    )}
  </div>
);