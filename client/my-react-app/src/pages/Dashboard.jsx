import React from 'react'
<<<<<<< Updated upstream
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
=======
import UserComponent from '../components/userComponent'
import "../styles/DashboardPage.css"

const Dashboard = () => {
  const testingInfo = [
  {username:'sm1',email:'ww1@gmail.com',role:'Admin',lastName:'awili'},
  {username:'sm1',email:'ww1@gmail.com',role:'Admin',lastName:'awili'},
  {username:'sm1',email:'ww1@gmail.com',role:'Admin',lastName:'awili'},
  {username:'sm1',email:'ww1@gmail.com',role:'Admin',lastName:'awili'},
]

  return (
    <div className='dashboard'>
    {testingInfo.map((user,index)=>{
      return(
        <UserComponent managersInfo={user} key={index} />
        )
    })}
>>>>>>> Stashed changes
    </div>
  )
}
 
export default Dashboard