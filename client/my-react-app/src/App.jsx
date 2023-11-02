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
	const navOptions =[
		{name:"Dashboard",link:"/dashboard",icon:<RxDashboard className='nav-link-icon'/>},
		{name:"Analytics",link:"/analytics",icon:<IoAnalytics className='nav-link-icon'/>},
		{name:"Orders",link:"/orders",icon:<IoCartOutline className='nav-link-icon'/>},
		{name:"Users",link:"/users",icon:<FiUsers className='nav-link-icon'/>},
		{name:"Products",link:"/products",icon:<IoPricetagOutline className='nav-link-icon'/>}

	]

	return (
		<BrowserRouter >
			<div className="App">
				<Navbar navOptions={navOptions} visible={ navVisible } show={ showNavbar } />
				<Routes>
					<Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<div className={!navVisible ? "page" : "page page-with-navbar"}><LoginForm/></div>} />
					<Route path='/dashboard' element={
						<div className={!navVisible ? "page" : "page page-with-navbar"}>
							<Dashboard/>
						</div>
					} />
					<Route path='/analytics' element={
						<div className={!navVisible ? "page" : "page page-with-navbar"}>
							<h1>Analystics</h1>
						</div>
					}/>
					<Route path='/orders' element={
						<div className={!navVisible ? "page" : "page page-with-navbar"}>
							<h1>Orders</h1>
						</div>
					}/>
					<Route path='/users' element={
						<div className={!navVisible ? "page" : "page page-with-navbar"}>
							<h1>Users</h1>
						</div>
					}/>
					<Route path='/settings' element={
						<div className={!navVisible ? "page" : "page page-with-navbar"}>
							<h1>Settings</h1>
						</div>
					}/>
				</Routes>
			</div>
		</BrowserRouter>
  );
}

export default App;
