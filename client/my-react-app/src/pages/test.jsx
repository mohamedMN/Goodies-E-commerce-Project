import "./index.css";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
// import RoutesComponent from "./components/RoutesComponent";
import { useState, useEffect } from "react";
import Navbar from "./containers/Navbar";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoAnalytics, IoPricetagOutline, IoCartOutline } from "react-icons/io5";
import "./index.css";
import { FiUsers } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./actions/AuthAction";
import LatestOrders from "./containers/LatestOrders";
import OverallStats from "./containers/OverallStats";
import Stats from "./containers/Stats";

function App() {
  const [navVisible, showNavbar] = useState(false);
  const user = useSelector((state) => state.addUserReducer?.authData?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log("user " + JSON.stringify(user));
  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [user]);
  useEffect(() => {
    getUsers(dispatch);
  }, []);
  const testingInfo = useSelector((state) => JSON.stringify(state.getAllUsers));
  console.log("testingInfo " + testingInfo);
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
      <div className="w-full h-full p-20 absolute top-0 left-0 -z-50">
        <div className="h-1/6 w-full"></div>
        <div className="w-full h-5/6 flex items-center justify-center gap-4">
          <div className="w-4/6 h-full space-y-4 -mt-24">
            <OverallStats />
            <Stats />
          </div>
          <LatestOrders />
        </div>
      </div>
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
