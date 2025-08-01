import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../pagescss/Signup.css"; // Import the CSS file

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password and confirm password
    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      alert("User registered successfully!");
      navigate("/login"); // Redirect to login page after successful signup
    } catch (error) {
      console.error("Error registering user:", error);
      setError("Failed to register user. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
        />

        <label>Phone:</label>
        <input
          type="phone"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />

        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={handleChange}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="submit-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;