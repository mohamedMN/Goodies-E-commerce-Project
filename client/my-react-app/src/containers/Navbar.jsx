import logo from "./../assets/GoodiesLogo.svg"
import {
	FaAngleRight,
	FaAngleLeft,
	FaCog,
	FaSignOutAlt,
	FaBars
} from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import "./../styles/Navbar.css";

const ICON_SIZE = 26;
const BIG_ICON = 30
const MID_ICON = 25

function Navbar(Props) {
	const { navOptions, visible, show } = Props
	return (
		<>
			<div className="mobile-nav">
				<button
					className="mobile-nav-btn"
					onClick={() => show(!visible)}
				>
					<FaBars size={MID_ICON} />
				</button>
			</div>
			<nav className={!visible ? 'navbar' : ''}>
				<button
					type="button"
					className="nav-btn"
					onClick={() => show(!visible)}
				>
					{!visible
						? <FaAngleRight size={BIG_ICON} /> : <FaAngleLeft size={BIG_ICON} />}
				</button>
				<div className="logo-container">
					<NavLink
						className="logo"
						to="/"
					>
						<img
							className="logo"
							src={logo}
							alt="logo"
						/>
					</NavLink>
				</div>
					<div className="links nav-top">
						{navOptions.map((option, index) => {
							return (
								<NavLink className="nav-link" key={index}  to={`${option.link}`}>
									{option.icon}
								</NavLink>
							)
						})}
					</div>

				<div className="links">
					<NavLink to="/settings" className="nav-link">
						<FaCog size={ICON_SIZE} />
					</NavLink>
					<NavLink to="/Sign-out" className="nav-link">
						<FaSignOutAlt size={ICON_SIZE} />
					</NavLink>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
