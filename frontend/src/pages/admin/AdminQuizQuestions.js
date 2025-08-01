import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style/AdminQuizQuestions.css";

const AdminQuizQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:3000/questions");
        if (!response.ok) throw new Error("Failed to fetch questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      console.error("Invalid item ID");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/questions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      setQuestions(questions.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleUpdateClick = (id) => {
    navigate(`/admin/update-quiz-question/${id}`);
  };

  if (isLoading) {
    return <div className="loading-state">Loading questions...</div>;
  }

  return (
    <div className="admin-quiz-container">
      
      <button 
        className="add-quiz-btn" 
        onClick={() => navigate("/admin/add-questions")}
      >
        Add New Question
      </button>
      
      {questions.length === 0 ? (
        <div className="empty-state">No questions found. Add your first question!</div>
      ) : (
        <table className="quiz-table">
          <thead>
            <tr>
              <th>Question({questions.length})</th>
              <th>Details</th>
              <th>Answer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.slice().reverse().map((item) => (
              <tr key={item._id}>
                <td className="question-cell" data-label="Question">
                  {item.question}
                </td>
                <td className="meta-cell" data-label="Details">
                  {item.type}, {item.subject}, {item.topic}
                </td>
                <td className="answer-cell" data-label="Answer">
                  {item.answer}
                </td>
                <td className="action-cell">
                  <div className="action-buttons">
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="update-btn"
                      onClick={() => handleUpdateClick(item._id)}
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminQuizQuestions;