import { useEffect, useState } from 'react';
import Navbar from '../containers/Navbar';
import { BiUser, BiLogOut } from 'react-icons/bi';
import { AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsChatDots } from 'react-icons/bs';
import axios from 'axios';



function Home() {
  const [userData, setUserData] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3125/users');
        const data = response.data;
        setUserData(data);
        console.log(userData);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);


  const navOptions = [
    { icon: <AiOutlineHome size={22} />, name: 'Dashboard' },
    { icon: <BiUser size={22} />, name: 'My Profile' },
    { icon: <AiOutlineShoppingCart size={22} />, name: 'Cart' },
    { icon: <BsChatDots size={22} />, name: 'Chat' },
    { icon: <BiLogOut size={22} />, name: 'Logout' }
  ];
  return (
    <Navbar navOptions={navOptions} />
  );
}

export default Home;