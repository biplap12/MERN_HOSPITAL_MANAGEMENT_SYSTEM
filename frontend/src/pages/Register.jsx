import React, { useState } from 'react'
import { useContext } from 'react';
import { Context } from '../main';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const Register= () => {
  const {isAuthenticated, setIsAuthenticated} = useContext(Context);
const [formdata, setFormdata] = useState({
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    phone: '',
    dob : '',
    gender : '',
  });

const {
    firstName,
    lastName,
    password,
    email,
    phone,
    dob,
    gender
  } = formdata;



const handleChange = (e) => {
    setFormdata({...formdata, [e.target.id]: e.target.value});
}


const navigate = useNavigate();

const handleRegister = async (e) => {
e.preventDefault();
try {
  const response = await axios.post('http://localhost:4000/api/v1/user/patient/register',{...formdata, role:"Patient"},{
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
   <div className="container form-component register-form">
    <h2> Sign Up</h2>
    <p>
      Please Sign Up to continue
    </p>
    <form onSubmit={handleRegister}>
      <div>
        <input type="text"  id="firstName" placeholder='First Name' value={firstName} onChange={handleChange} required />
        <input type="text"  id="lastName" placeholder='Last Name' value={lastName} onChange={handleChange} required />
        </div>
        <div>
        <input type="email"  id="email" placeholder='Email' value={email} onChange={handleChange} required />
        <input type="number"  id="phone" placeholder='Phone' value={phone} onChange={handleChange} required />
        </div>
        <div>
        <select value={gender} onChange={handleChange} id='gender' required>
          <option value="">Select Gender </option>
          <option value="Male">Male</option>
          <option value="Female" >Female</option>
          <option value="Other">Other</option>
        </select>
        <input type="date"  id="dob" placeholder='Date of Birth' value={dob} onChange={handleChange} required />
        </div>   
        <div>
        <input type="password"  id="password" placeholder='Password' value={password} onChange={handleChange} required />
        <input type="text" value="Patient" readOnly />
        </div>
      <div style={{gap:"10px", justifyContent:"flex-end", flexDirection:"row"}}>
        <p  style={{marginBottom:"0"}}>Already Registerd?</p>
        <Link to="/register" style={{textDecoration:"none",alignItems:"center"}} >Login Now</Link>
      </div>
      <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Register</button>

        </div>
    </form>


   </div>
  )
}

export default Register