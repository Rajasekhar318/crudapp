import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; 

// LoginPage component handles user login functionality
const LoginPage = () => {
  // State hook for managing user credentials
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  // Hook for navigation
  const navigate = useNavigate();

  // Event handler for input changes, updates the credentials state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Retrieve stored users from localStorage or set to an empty array if none
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    // Check if the user exists in the stored users array
    const userExists = storedUsers.find(user => user.username === credentials.username && user.password === credentials.password);
    
    if (userExists) {
      // Alert the user of successful login and set isLoggedIn flag in localStorage
      alert('Login successful!');
      localStorage.setItem('isLoggedIn', 'true');
      // Navigate to the home page
      navigate('/home');
    } else {
      // Alert the user if the username or password is invalid
      alert('Invalid username or password');
    }
  };

  // Render the login form
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <div className="input-field">
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="button">Login</button>
        <a href="/" className="link">Register</a>
      </form>
    </div>
  );
};

export default LoginPage;
