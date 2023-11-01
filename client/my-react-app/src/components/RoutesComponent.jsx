import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Ajouter from "../pages/Ajouter";
import Dashboard from "../pages/Dashboard";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function RoutesComponent() {
  // return { ...state, authData: action.data, loading: false, error: false };
  //state.authReducer.authData{ data : {message , token , user}}
  const navigate = useNavigate();
  const user = useSelector((state) => state.addUserReducer?.authData?.user);
  console.log("user " + JSON.stringify(user));
  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [user]);
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
      />
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/" />}
      />
      <Route
        path="/ajouter"
        element={user ? <Ajouter /> : <Navigate to="/" />}
      />
    </Routes>
  );
}
