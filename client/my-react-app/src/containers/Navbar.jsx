import React from 'react';
import {IoStorefrontOutline} from "react-icons/io5"

export default function Navbar({ navOptions }) {
  return (
    <div className="navbar-Main">
      <ul className='navbar-List'>
        <li >
        <div className="nav-Header">
<IoStorefrontOutline size={24}/>
<h3 className='nav-Header-Label'>Admins Pannel</h3>
        </div>
        </li>
        {navOptions.map((Option, index) => {
          return (
            <li className='nav-Op-Container' key={index}>
            <div className="nav-Op">
              {Option.icon}
              <label className="nav-Op-Label">{Option.name}</label>
            </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
