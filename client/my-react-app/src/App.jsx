import "./index.css";

// import RoutesComponent from "./components/RoutesComponent";
import { useState, useEffect } from "react";
import Navbar from "./containers/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoAnalytics, IoPricetagOutline, IoCartOutline } from "react-icons/io5";
import "./index.css";
import { FiUser, FiUsers } from "react-icons/fi";
import { useSelector } from "react-redux";
import RequireAuth from "./components/requireAuth";
import Dashboard from "./pages/Users";
import LoginPage from "./pages/LoginPage";
import Analytics from "./pages/Analytics";
import Order from "./pages/Order";
import Product from "./pages/Product";
import Users from "./pages/Users";
import Profile from "./pages/Profile";

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
      icon: <RxDashboard size={32} />,
    },
    {
      name: "Analytics",
      link: "/analytics",
      icon: <IoAnalytics size={32} />,
    },
    {
      name: "Orders",
      link: "/orders",
      icon: <IoCartOutline size={32} />,
    },
    {
      name: "Users",
      link: "/users",
      icon: <FiUsers size={32} />,
    },
    {
      name: "Profile",
      link: "/profile",
      icon: <FiUser size={32} />,
    },
    {
      name: "Products",
      link: "/products",
      icon: <IoPricetagOutline size={32} />,
    },
  ];

  return (
    <div className="App">
      <Navbar navOptions={navOptions} visible={navVisible} show={showNavbar} />
      <Routes>
        <Route path="/login" element={<LoginPage navVisible={navVisible} />} />

        <Route element={<RequireAuth />}>
          <Route path="/" element={<Users navVisible={navVisible} />} />

          <Route
            path="/dashboard"
            element={<Dashboard navVisible={navVisible} />}
          />
          <Route path="/users" element={<Users navVisible={navVisible} />} />

          <Route
            path="/profile"
            element={<Profile navVisible={navVisible} />}
          />

          <Route
            path="/analytics"
            element={<Analytics navVisible={navVisible} />}
          />
          <Route path="/orders" element={<Order navVisible={navVisible} />} />
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
