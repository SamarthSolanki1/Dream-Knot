import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

import "../styles/signin.css"

const Signin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    role: "User",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setSuccess("");
      return;
    }

    try {
      const response = await api.post("/register", {
        name: formData.name,
        email: formData.email,
        mobileNumber: formData.mobile,
        password: formData.password,
        login: formData.email,
        role: formData.role,
        headers: { Authorization: '' }
      });

      setSuccess("Account created successfully!");
      setError("");
      
      setTimeout(() => {
        const card = document.querySelector('.signin-card');
        card.classList.add('flip-out-left');
        
        setTimeout(() => {
          navigate("/login");
        }, 500);
      }, 1000);

    } catch (err) {
      setError(err.response?.data?.message || "An error occurred!");
      setSuccess("");
    }
  };

  const handleBackToLogin = () => {
    const card = document.querySelector('.signin-card');
    card.classList.add('flip-out-left');
    
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="card-illustration">
          <div className="illustration-content">
            <div className="character-emoji">👰</div>
            <h3>Join Our Community</h3>
            <p>Create your account to start planning your perfect wedding</p>
          </div>
        </div>
        
        <div className="form-side">
          <div className="wedding-header">
            <div className="rings-animation">
              <div className="ring"></div>
              <div className="ring"></div>
            </div>
            <h2>Sign Up</h2>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="tel"
                name="mobile"
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <select 
                name="role" 
                value={formData.role} 
                onChange={handleChange} 
                className="form-input"
                required
              >
                <option value="User">User</option>
                <option value="Employee">Employee</option>
              </select>
            </div>

            <button type="submit" className="auth-button">
              Sign Up
            </button>

            <button type="button" className="flip-button" onClick={handleBackToLogin}>
              Back to Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
