import {
  FaAngleRight,
  FaAngleLeft,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "./../styles/Navbar.css";
import { axiosPrivateUser } from "../services/api";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/AuthAction";
import { useEffect, useState } from "react";

const ICON_SIZE = 26;
const BIG_ICON = 30;
const MID_ICON = 25;

// update state on toggle

function Navbar(Props) {
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("darktheme");
    } else {
      setTheme("mytheme");
    }
  };
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "mytheme"
  );
  // set theme state in localstorage on mount & also update localstorage on state change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme") ;
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);
  const { navOptions, visible, show } = Props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    axiosPrivateUser
      .post(`/logout`)
      .then(() => {
        console.log("logout succes ");
        navigate("/login");
        dispatch(logout());
      })
      .catch((err) => {
        console.log(err);
        dispatch(logout());

        navigate("/login");
      });
  };
  return (
    <>
      <div className="bg-primary w-full h-10 flex sm:flex md:hidden items-center">
        <button
          className="text-secondary z-50 bg-transparent outline-none my-2.5"
          onClick={() => show(!visible)}
        >
          <FaBars size={MID_ICON} />
        </button>
      </div>
      <nav
        className={
          !visible
            ? "navbarbar absolute top-0 left-0 flex items-center flex-col bg-primary justify-between min-h-full p-4 pt-2 w-full sm:w-full md:w-16 lg:w-16 z-40"
            : "absolute top-0 left-0 flex items-center flex-col bg-primary justify-between min-h-full p-4  w-full sm:w-full md:w-16 lg:w-16 z-40"
        }
      >
        <button
          type="button"
          className="hidden sm:hidden md:flex xl:flex absolute top-5 md:left-6  lg:left-6 w-10 h-16 justify-center items-center outline-none border-0 cursor-pointer bg-primary text-secondary text-xl rounded-r-lg nav-btn"
          onClick={() => show(!visible)}
        >
          {!visible ? (
            <FaAngleRight size={BIG_ICON} />
          ) : (
            <FaAngleLeft size={BIG_ICON} />
          )}
        </button>
        <div className="">
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              onChange={handleToggle}
              checked={theme === "mytheme" ? false : true}
              className="theme-controller"
              value="synthwave"
            />

            {/* sun icon */}
            <svg
              className="swap-on fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              color="#232527"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-off fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>

        <div className="flex flex-col items-center">
          {navOptions.map((option, index) => {
            return (
              <NavLink
                className="flex items-center p-3 rounded-lg hover:bg-secondary hover:text-primary w-full justify-between text-secondary nav-link md:tooltip md:tooltip-right"
                color="#232521"
                data-tip={option.name}
                key={index}
                to={`${option.link}`}
              >
                <span className="font-roboto block md:hidden">
                  {option.name}
                </span>
                {option.icon}
              </NavLink>
            );
          })}
        </div>

        <div className="links">
          <NavLink
            to="/settings"
            data-tip="Settings"
            className="flex items-center p-3 rounded-lg hover:bg-secondary hover:text-primary text-secondary nav-link md:tooltip md:tooltip-right"
          >
            <FaCog size={ICON_SIZE} />
          </NavLink>
          <button onClick={handleSignOut}>
            <NavLink
              data-tip="Logout"
              className="flex items-center p-3 rounded-lg hover:bg-secondary hover:text-primary text-secondary nav-link md:tooltip md:tooltip-right"
            >
              <FaSignOutAlt size={ICON_SIZE} />
            </NavLink>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
