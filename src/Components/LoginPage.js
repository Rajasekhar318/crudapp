import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; 

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = storedUsers.find(user => user.username === credentials.username && user.password === credentials.password);
    
    if (userExists) {
      alert('Login successful!');
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/home');
    } else {
      alert('Invalid username or password');
    }
  };

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
