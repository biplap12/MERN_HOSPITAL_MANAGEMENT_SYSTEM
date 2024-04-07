
import React, { useState } from 'react'
import { useContext } from 'react';
import { Context } from '../main';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const AddNewAdmin= () => {
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

const handleAddNewAdmin = async (e) => {
e.preventDefault();
try {
  const response = await axios.post('http://localhost:4000/api/v1/user/admin/addnew',{ ...formdata, role: "Admin"},
  {
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

if(!isAuthenticated) {
   return <Navigate to="/login" /> 
}
  return (
    <section className="page">
   <div className="container form-component add-admin-form">
    <img src="/logo1.png" alt="logo"className='logo' width="35%" />
    <br />
    <h1 className='form-title'>
      Add New Admin
    </h1>

    <form onSubmit={handleAddNewAdmin}>
      <div>
        <input type="text"  id="firstName" placeholder='First Name' value={firstName} onChange={handleChange}  />
        <input type="text"  id="lastName" placeholder='Last Name' value={lastName} onChange={handleChange}  />
        </div>
        <div>
        <input type="email"  id="email" placeholder='Email' value={email} onChange={handleChange}  />
        <input type="number"  id="phone" placeholder='Phone' value={phone} onChange={handleChange}  />
        </div>
        <div>
        <select value={gender} onChange={handleChange} id='gender' >
          <option value="">Select Gender </option>
          <option value="Male">Male</option>
          <option value="Female" >Female</option>
          <option value="Other">Other</option>
        </select>
        <input type="date" id="dob" placeholder='Date of Birth' value={dob} onChange={handleChange} 
        max={new Date().toLocaleDateString('en-CA')} />
        </div>   
        <div>
        <input type="password"  id="password" placeholder='Password' value={password} onChange={handleChange}  />
        <input type="text" value="Admin" readOnly />
        </div>
     
      <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">
              Add Admin
            </button>

        </div>
    </form>


   </div>
    </section>
  )
}

export default AddNewAdmin