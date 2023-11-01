import "./index.css";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
// import RoutesComponent from "./components/RoutesComponent";
import { useState, useEffect } from "react";
import Navbar from "./containers/Navbar";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoAnalytics, IoPricetagOutline, IoCartOutline } from "react-icons/io5";
import "./index.css";
import { FiUsers } from "react-icons/fi";
import { useSelector } from "react-redux";

function App() {
  const [navVisible, showNavbar] = useState(false);
  const user = useSelector((state) => state.addUserReducer?.authData?.user);
  const navigate = useNavigate();

  console.log("user " + JSON.stringify(user));
  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [user]);
  const navOptions = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <RxDashboard className="nav-link-icon" />,
    },
    {
      name: "Analytics",
      link: "/analytics",
      icon: <IoAnalytics className="nav-link-icon" />,
    },
    {
      name: "Orders",
      link: "/orders",
      icon: <IoCartOutline className="nav-link-icon" />,
    },
    {
      name: "Users",
      link: "/users",
      icon: <FiUsers className="nav-link-icon" />,
    },
    {
      name: "Products",
      link: "/products",
      icon: <IoPricetagOutline className="nav-link-icon" />,
    },
  ];
  const loginCompo = (
    <div className={navVisible ? "page page-with-navbar" : "page"}>
      <LoginPage />
    </div>
  );
  const dashCompo = (
    <div className={!navVisible ? "page" : "page page-with-navbar"}>
      <Dashboard />
    </div>
  );
  const analyticsCompo = (
    <div className={!navVisible ? "page" : "page page-with-navbar"}>
      <h1>Analystics</h1>
    </div>
  );
  const orderCompo = (
    <div className={!navVisible ? "page" : "page page-with-navbar"}>
      <h1>Orders</h1>
    </div>
  );
  const usersCompo = (
    <div className={!navVisible ? "page" : "page page-with-navbar"}>
      <h1>Users</h1>
    </div>
  );
  const productCompo = (
    <div className={!navVisible ? "page" : "page page-with-navbar"}>
      <h1>Product</h1>
    </div>
  );
  return (
    <div className="App">
      <Navbar navOptions={navOptions} visible={navVisible} show={showNavbar} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : loginCompo}
        />
        <Route
          path="/dashboard"
          element={user ? dashCompo : <Navigate to="/login" />}
        />
        <Route
          path="/analytics"
          element={user ? analyticsCompo : <Navigate to={"/login"} />}
        />
        <Route
          path="/orders"
          element={user ? orderCompo : <Navigate to={"/login"} />}
        />
        <Route
          path="/users"
          element={user ? usersCompo : <Navigate to={"/login"} />}
        />
        <Route
          path="/products"
          element={user ? productCompo : <Navigate to={"/login"} />}
        />
        <Route
          path="/settings"
          element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <h1>Settings</h1>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
