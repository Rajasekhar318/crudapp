import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './Components/RegistrationPage';
import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
