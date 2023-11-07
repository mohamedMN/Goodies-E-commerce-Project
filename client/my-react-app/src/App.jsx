import React from 'react';
import "./index.css"
import LoginPage from './pages/LoginPage';
import LoginForm from './containers/LoginForm'
import Dashboard from './pages/Dashboard';
import RoutesComponent from './components/RoutesComponent';
import  {useState} from 'react';
import Navbar from "./containers/Navbar";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import {RxDashboard} from "react-icons/rx"
import {IoAnalytics,IoPricetagOutline,IoCartOutline} from "react-icons/io5"
import "./index.css";
import {FiUsers} from 'react-icons/fi'
import { AuthProvider } from 'react-auth-kit'

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
      icon: <RxDashboard  size={32} />,
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
          <Route path="/" element={<Dashboard navVisible={navVisible} />} />

          <Route
            path="/dashboard"
            element={<Dashboard navVisible={navVisible} />}
          />
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
