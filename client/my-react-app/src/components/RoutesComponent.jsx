import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import Ajouter from '../pages/Ajouter';
import Dashboard from '../pages/Dashboard';


export default function RoutesComponent() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ajouter" element={<Ajouter />} />
      </Routes>
    </Router>
  )
}
