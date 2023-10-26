import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RequireAuth }  from 'react-auth-kit';
import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';


export default function RoutesComponent() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>} />        
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </Router>
    )
}
