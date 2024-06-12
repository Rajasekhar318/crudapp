import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css'; 

// RegistrationPage component for handling new user registrations
const RegistrationPage = () => {
  // Hook to navigate programmatically
  const navigate = useNavigate();
  // State to store user input for registration
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: ''
  });

  // Function to handle changes in the input fields and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

   // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Retrieve existing users from localStorage or initialize to an empty array
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    // Check if the username already exists among existing users
    if (existingUsers.some(existingUser => existingUser.username === user.username)) {
      alert('Username already exists. Please choose a different username.');
    } else {
      // Add the new user to the array of existing users
      existingUsers.push(user);
      // Save the updated array of users to localStorage
      localStorage.setItem('users', JSON.stringify(existingUsers));
      alert('Registration successful!');
      // Navigate to the login page after successful registration
      navigate('/login');
    }
  };

  // Render the registration form
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <div className="input-field">
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </div>
        <div className="input-field">
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="button">Register</button>
      <a href="/login" className="link">Already have an account? Log in</a>
      </form>
    </div>
  );
};

export default RegistrationPage;
