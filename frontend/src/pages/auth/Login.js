import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../pagescss/Login.css"; // Import the CSS file

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include", // Include cookies in the request
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to login");
      }
   
    //  alert("Login successful!");
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Error logging in:", error);
      setError(error.message || "Failed to login. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>Phone:</label>
        <input
          type="phone"
          name="phone"
          value={credentials.phone}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;