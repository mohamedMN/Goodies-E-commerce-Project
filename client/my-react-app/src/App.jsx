import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';
import "./index.css"
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

export default function App() {
return(
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </Router>
  );
}