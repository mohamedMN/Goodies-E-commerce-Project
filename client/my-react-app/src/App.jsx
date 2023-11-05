import "./index.css";

// import RoutesComponent from "./components/RoutesComponent";
import { useState, useEffect } from "react";
import Navbar from "./containers/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoAnalytics, IoPricetagOutline, IoCartOutline } from "react-icons/io5";
import "./index.css";
import { FiUsers } from "react-icons/fi";
import { useSelector } from "react-redux";
import RequireAuth from "./components/requireAuth";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import Analytics from "./pages/Analytics";
import Order from "./pages/Order";
import User from "./pages/User";
import Product from "./pages/Product";
import AllUSers from "./pages/AllUsers";

function App() {
  const [navVisible, showNavbar] = useState(false);
  const user = useSelector((state) => state.addUserReducer?.authData?.user);
  const navigate = useNavigate();

  // console.log("user " + JSON.stringify(user));
  useEffect(() => {
    if (!user) {
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
      name: "users",
      link: "/users",
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

  return (
    <div className="App">
      <Navbar navOptions={navOptions} visible={navVisible} show={showNavbar} />
      <Routes>
        <Route path="/login" element={<LoginPage navVisible={navVisible} />} />

        <Route element={<RequireAuth />}>
          <Route path="/" element={<AllUSers navVisible={navVisible} />} />

          <Route
            path="/dashboard"
            element={<Dashboard navVisible={navVisible} />}
          />
          <Route path="/users" element={<AllUSers navVisible={navVisible} />} />

          <Route
            path="/analytics"
            element={<Analytics navVisible={navVisible} />}
          />
          <Route path="/orders" element={<Order navVisible={navVisible} />} />
          <Route path="/users" element={<User navVisible={navVisible} />} />
          <Route
            path="/products"
            element={<Product navVisible={navVisible} />}
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
