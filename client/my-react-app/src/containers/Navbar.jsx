<<<<<<< Updated upstream
import React, { useState } from 'react';
import {IoStorefrontOutline} from "react-icons/io5"

export default function Navbar({ navOptions }) {
    const [Screen,setScreen]= useState('0')

  return (
    <div className="navbar-Main">
      <ul className='navbar-List'>
        <li >
        <div className="nav-Header">
<IoStorefrontOutline size={24}/>
<h3 className='nav-Header-Label'>Admins Pannel</h3>
        </div>
        </li>
        <li className='navops-List'>
        {navOptions.map((Option, index) => {
          return (
            <button  className={(Screen===index) ? 'nav-Op-Container:active':"nav-Op-Container"} key={index}>
            <div className="nav-Op">
              {Option.icon}
              <label className="nav-Op-Label">{Option.name}</label>
            </div>
            </button>
          );
        })}
        </li>
      </ul>
    </div>
  );
}
=======
import React from 'react';
import logo from "./../assets/GoodiesLogo.svg"
import {RxDashboard} from "react-icons/rx"
import {IoAnalytics} from "react-icons/io5"
import {
	FaAngleRight,
	FaAngleLeft, 
	FaShoppingCart, 
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
						? <FaAngleRight  className='nav-btn'  size={BIG_ICON} /> : <FaAngleLeft className='nav-btn' size={BIG_ICON} />}
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
>>>>>>> Stashed changes
