import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Context } from '../main'
import { GiHamburgerMenu } from 'react-icons/gi'


const Navbar = () => {
    const [show, setShow] = useState(false);
    const {isAuthenticated, setIsAuthenticated} = useContext(Context);
    const navigate = useNavigate();

    const gotoLogin = () => {
        navigate('/login');
    }

    const handleLogout = async() => {
            await axios.get('http://localhost:4000/api/v1/user/patient/logout', {
                withCredentials: true
            }).then((res) => {
                toast.success(res.data.message);
                setIsAuthenticated(false);                
            }).catch((error) => {
                toast.error(error.response.data.message);
            });    
    }
  return (
    <nav className="container">
        <div className="logo">
            <Link to="/">
                <img src="/logo1.png" alt="logo" width="30%" />
            </Link>
        </div>
        <div className={!show ? "navLinks showmenu" : "navLinks"}>
            <div className="links">
                <Link  to="/">Home</Link>
                <Link to="/appointment">Appointment</Link>
                <Link to="/about">About Us</Link>
            </div>
            {isAuthenticated ? (<button className="logoutBtn btn" onClick={handleLogout}>Logout</button> ): (<button className="logoutBtn btn" onClick={gotoLogin}>Login</button>)            }
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
    </nav>
  )
}

export default Navbar