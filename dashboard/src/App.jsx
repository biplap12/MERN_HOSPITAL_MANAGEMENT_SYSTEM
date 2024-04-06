import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import AddNewDoctor from './components/AddNewDoctor'
import AddNewAdmin from './components/AddNewAdmin'
import Messages from './components/Messages'
import Doctors from './components/Doctors'
import NotFoundPage from './components/NotFoundPage'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Context } from './main';
import './App.css'

const App = () => {

  const {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser
  } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/user/admin/me', {
          withCredentials: true
        });
        if(response.data.success) {
          setIsAuthenticated(true);
          setUser(response.data.user);
        }     
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    }
    fetchUser();
  }
  , [isAuthenticated]);

  return (
    <>
    <Router>
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor/addnew" element={<AddNewDoctor />} />
        <Route path="/admin/addnew" element={<AddNewAdmin />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        />
       
    </Router>
    
    </>
  )
}

export default App