import React from 'react';
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

const ICON_SIZE = 20;
const BIG_ICON = 30
const MID_ICON = 25

function Navbar({navOptions,visible, show}) {

	return (
		<>
			<div className="mobile-nav">
				<button
					className="mobile-nav-btn"
					onClick={() => show(!visible)}
				>
					<FaBars size={MID_ICON}  />
				</button>
			</div>
			<nav className={!visible ? 'navbar' : ''}>
				<button
					type="button"
					className="nav-btn"
					onClick={() => show(!visible)}
				>
					{ !visible
						? <FaAngleRight size={BIG_ICON} /> : <FaAngleLeft size={BIG_ICON} />}
				</button>
				<div>
					<NavLink
						className="logo"
						to="/"
					>
							<img
							height={80} width={80}
              src={logo}
								alt="logo"
							/>
					</NavLink>
					<div className="links nav-top">
					{navOptions.map((option,index)=>{
						return(
							<NavLink key={index} className="nav-link" to={`${option.link}`}>
							{option.icon}
							<span><p>{option.name}</p></span>
							</NavLink>
						)
					})}
					</div>
				</div>

				<div className="links">
					<NavLink to="/settings" className="nav-link">
						<FaCog size={ICON_SIZE} />
						<span>Settings</span> 
					</NavLink>
					<NavLink to="/Sign-out" className="nav-link">
						<FaSignOutAlt size={ICON_SIZE} />
						<span>Logout</span> 
					</NavLink>
				</div>
			</nav>
		</>
  );
}

export default Navbar;
