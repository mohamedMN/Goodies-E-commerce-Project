import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import Ajouter from '../pages/Ajouter';
import Dashboard from '../pages/Dashboard';
import { useSelector } from 'react-redux';


export default function RoutesComponent() {
  // return { ...state, authData: action.data, loading: false, error: false };
  //state.authReducer.authData{ data : {message , token , user}}
  const user = useSelector((state) => state.authReducer.authData)
  console.log("user " + user)
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to='/login' />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to='/' />} />
        <Route path="/ajouter" element={user ? <Ajouter /> : <Navigate to='/' />} />
      </Routes>
    </Router>
  )
}
