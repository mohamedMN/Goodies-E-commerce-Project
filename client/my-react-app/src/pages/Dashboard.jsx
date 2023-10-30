import React from 'react'
import Navbar from '../containers/Navbar';
import { BiUser,BiLogOut } from 'react-icons/bi';
import { AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai';
import {BsChatDots} from "react-icons/bs"


 function Dashboard() {

  const navOptions = [
    { icon: <AiOutlineHome size={22}/>, name: 'Dashboard' },
    { icon: <BiUser size={22}/>, name: 'My Profile' },
    { icon: <AiOutlineShoppingCart size={22}/>, name: 'Cart' },
    { icon: <BsChatDots size={22}/> ,name: "Chat"},
    { icon: <BiLogOut size={22}/> ,name: "Logout"}
  ]
  

  return (
    <div className='dashboard'>
    <Navbar navOptions={navOptions} />
    <div>

    </div>
    </div>
  )
}

export default Dashboard