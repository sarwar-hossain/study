import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/AdminForm.css"; 

const AddQuizQuestions = () => {
    const [formData, setFormData] = useState({
        type: "", 
        subject: "", 
        topic: "", 
        quiz: "", 
        question: "", 
        option1: "", 
        option2: "", 
        option3: "", 
        option4: "", 
        answer: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/questions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Question added successfully!");
                setFormData({ 
                    type: "", 
                    subject: "", 
                    topic: "", 
                    quiz: "", 
                    question: "", 
                    option1: "", 
                    option2: "", 
                    option3: "", 
                    option4: "", 
                    answer: "" 
                });
                navigate("/admin/questions");
            } else {
                alert("Failed to add question.");
            }
        } catch (error) {
            console.error("Error adding question:", error);
        }
    };

    return (
        <div className="admin-form-container">
            <h2>Add New Quiz Question</h2>

            <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-group">
                    <label>Type:</label>
                    <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Subject:</label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Topic:</label>
                    <input
                        type="text"
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Quiz Number:</label>
                    <input
                        type="number"
                        name="quiz"
                        value={formData.quiz}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Question:</label>
                    <textarea
                        name="question"
                        value={formData.question}
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
                            value={formData.option1}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Option 2:</label>
                        <input
                            type="text"
                            name="option2"
                            value={formData.option2}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Option 3:</label>
                        <input
                            type="text"
                            name="option3"
                            value={formData.option3}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Option 4:</label>
                        <input
                            type="text"
                            name="option4"
                            value={formData.option4}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Correct Answer:</label>
                    <select
                        name="answer"
                        value={formData.answer}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select correct answer</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                        <option value="4">Option 4</option>
                    </select>
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-btn">Add Question</button>
                    <button 
                        type="button" 
                        className="view-btn"
                        onClick={() => navigate("/admin/questions")}
                    >
                        View Questions
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddQuizQuestions;