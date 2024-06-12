import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css'; 

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (existingUsers.some(existingUser => existingUser.username === user.username)) {
      alert('Username already exists. Please choose a different username.');
    } else {
      existingUsers.push(user);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      alert('Registration successful!');
      navigate('/login');
    }
  };

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
