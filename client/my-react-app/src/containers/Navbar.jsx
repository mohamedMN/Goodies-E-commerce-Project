import logo from "./../assets/GoodiesLogo.svg";
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

const ICON_SIZE = 26;
const BIG_ICON = 30;
const MID_ICON = 25;

function Navbar(Props) {
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
      <div className="mobile-nav">
        <button className="mobile-nav-btn" onClick={() => show(!visible)}>
          <FaBars size={MID_ICON} />
        </button>
      </div>
      <nav className={!visible ? "navbarbar" : ""}>
        <button
          type="button"
          className="nav-btn"
          onClick={() => show(!visible)}
        >
          {!visible ? (
            <FaAngleRight size={BIG_ICON} />
          ) : (
            <FaAngleLeft size={BIG_ICON} />
          )}
        </button>
        <div className="logo-container">
          <NavLink className="logo" to="/">
            <img width={100} height={100} src={logo} alt="logo" />
          </NavLink>
        </div>
        <div className="links nav-top">
          {navOptions.map((option, index) => {
            return (
              <NavLink
                className="nav-link tooltip tooltip-right"
                color="#232527"
                data-tip={option.name}
                key={index}
                to={`${option.link}`}
              >
                {option.icon}
              </NavLink>
            );
          })}
        </div>

        <div className="links">
          <NavLink to="/settings" className="nav-link">
            <FaCog size={ICON_SIZE} />
          </NavLink>
          <button onClick={handleSignOut}>
            <NavLink className="nav-link">
              <FaSignOutAlt size={ICON_SIZE} />
            </NavLink>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
