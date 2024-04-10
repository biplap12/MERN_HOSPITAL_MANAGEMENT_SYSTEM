

import React, { useState } from 'react'
import { useContext } from 'react';
import { Context } from '../main';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const Login = () => {
  const {isAuthenticated, setIsAuthenticated} = useContext(Context);
const [formdata, setFormdata] = useState({
    email: '',
    password: ''});

const {email, password} = formdata;

const handleChange = (e) => {
    setFormdata({...formdata, [e.target.id]: e.target.value});
}


const navigate = useNavigate();

const handleLogin = async (e) => {
e.preventDefault();
try {
  const response = await axios.post('http://localhost:4000/api/v1/user/login',{ ...formdata, role: 'Admin' },{
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  toast.success(response.data.message);
  setIsAuthenticated(true);
  navigate('/');
  
} catch (error) {
  toast.error(error.response.data.message);
  setIsAuthenticated(false);
  
}

}

if(isAuthenticated) {
   return <Navigate to="/" /> 
}
  return (
   <div className="container form-component">
      <img src="/logo1.png" alt="logo" className='logo' width="30%" />
      <h1 className="form-title">WELCOME TO BN MEDICAL</h1>
      <p>
        Only Admins are allowed to login
      </p>
    <form onSubmit={handleLogin}>
        <input type="email"  id="email" placeholder='Email' value={email} onChange={handleChange}  />
        <input type="password"  id="password" placeholder='Password' value={password} onChange={handleChange}  />
      <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>

        </div>
    </form>


   </div>
  )
}

export default Login