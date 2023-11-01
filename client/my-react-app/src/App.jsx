// import React from "react";
import "./index.css";
// import LoginPage from "./pages/LoginPage";
// import Dashboard from "./pages/Dashboard";
import RoutesComponent from "./components/RoutesComponent";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <RoutesComponent />
    </BrowserRouter>
  );
}
