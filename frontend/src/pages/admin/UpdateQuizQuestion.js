import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style/AdminForm.css"; 

const UpdateQuizQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState({
    type: "",
    subject: "",
    topic: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: ""
  });

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://localhost:3000/questions/${id}`);
        if (!response.ok) throw new Error("Failed to fetch question");
        const data = await response.json();
        setQuestion(data);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };
    fetchQuestion();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/questions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(question),
      });
      if (!response.ok) throw new Error("Failed to update question");
      navigate("/admin/questions");
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Update Question</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={question.type}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={question.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Topic:</label>
          <input
            type="text"
            name="topic"
            value={question.topic}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Question:</label>
          <textarea
            name="question"
            value={question.question}
            onChange={handleChange}
            required
            rows="3"
          />
        </div>

        <div className="options-grid">
          <div className="form-group">
            <label>Option 1:</label>
            <input
              type="text"
              name="option1"
              value={question.option1}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Option 2:</label>
            <input
              type="text"
              name="option2"
              value={question.option2}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Option 3:</label>
            <input
              type="text"
              name="option3"
              value={question.option3}
              onChange={handleChange}
              required={question.type === "MCQ"}
              
            />
          </div>

          <div className="form-group">
            <label>Option 4:</label>
            <input
              type="text"
              name="option4"
              value={question.option4}
              onChange={handleChange}
              required={question.type === "MCQ"}
            
            />
          </div>
        </div>

        <div className="form-group">
          <label>Correct Answer:</label>
          <input
            type="text"
            name="answer"
            value={question.answer}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Update Question
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/admin/questions")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateQuizQuestion;