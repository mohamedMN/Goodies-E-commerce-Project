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
