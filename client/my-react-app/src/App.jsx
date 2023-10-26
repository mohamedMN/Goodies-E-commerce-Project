import React from 'react';
import "./index.css"
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import RoutesComponent from './components/RoutesComponent';
import { AuthProvider } from 'react-auth-kit'

export default function App() {
return(
        <RoutesComponent />
  );
}