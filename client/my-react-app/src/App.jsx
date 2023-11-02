import "./index.css";

// import RoutesComponent from "./components/RoutesComponent";
import { useState, useEffect } from "react";
import Navbar from "./containers/Navbar";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoAnalytics, IoPricetagOutline, IoCartOutline } from "react-icons/io5";
import "./index.css";
import { FiUsers } from "react-icons/fi";
import { useSelector } from "react-redux";
import RequireAuth from "./components/requireAuth";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";



function App() {
  const [navVisible, showNavbar] = useState(false);
  const user = useSelector((state) => state.addUserReducer?.authData?.user);
  const navigate = useNavigate();

  // console.log("user " + JSON.stringify(user));
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
        <Route
          path="/login"
          element={loginCompo}
        />

        <Route element={<RequireAuth />} >
          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route
            path="/dashboard"
            element={dashCompo}
          />
          <Route
            path="/analytics"
            element={analyticsCompo}
          />
          <Route
            path="/orders"
            element={orderCompo}
          />
          <Route
            path="/users"
            element={usersCompo}
          />
          <Route
            path="/products"
            element={productCompo}
          />
          <Route
            path="/settings"
            element={
              <div className={!navVisible ? "page" : "page page-with-navbar"}>
                <h1>Settings</h1>
              </div>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}


export default App;
