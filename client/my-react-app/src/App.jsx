import "./index.css";

// import RoutesComponent from "./components/RoutesComponent";
import { useState } from "react";
import Navbar from "./containers/Navbar";
import { Route, Routes } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoAnalytics, IoPricetagOutline, IoCartOutline } from "react-icons/io5";
import "./index.css";
import { FiUser, FiUsers } from "react-icons/fi";
import RequireAuth from "./components/requireAuth";
import LoginPage from "./pages/LoginPage";
import Product from "./pages/Product";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import RequestForgetPassword from "./pages/ForgetPassword";
// import PasswordResetPage from "./pages/NewPassword";
import { OrderCompo } from "./pages/OrderCompo";
import NewPassword from "./pages/NewPassword";
import Order from "./components/Order";

function App() {
  const [navVisible, showNavbar] = useState(false);

  // console.log("user " + JSON.stringify(user));

  const navOptions = [
    {
      name: "Users",
      link: "/Users",
      icon: <RxDashboard size={32} />, // dashboard component
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
        <Route
          path="/RequestForgetPassword"
          element={<RequestForgetPassword navVisible={navVisible} />}
        />
        <Route
          path="/NewPassword"
          element={<NewPassword navVisible={navVisible} />}
        />
        <Route path="/login" element={<LoginPage navVisible={navVisible} />} />

        <Route
          path="/analytics"
          element={<OrderCompo navVisible={navVisible} />}
        />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Users navVisible={navVisible} />} />

          <Route path="/Users" element={<Users navVisible={navVisible} />} />
          {/* <Route path="/users" element={<Users navVisible={navVisible} />} /> */}

          <Route
            path="/profile"
            element={<Profile navVisible={navVisible} />}
          />

          <Route path="/orders" element={<Order navVisible={navVisible} />} />
          <Route
            path="/products"
            element={<Product navVisible={navVisible} />}
          />
          <Route
            path="/logout"
            element={<LoginPage navVisible={navVisible} />}
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
