import React, { useContext, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Appointment from './pages/Appointment'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFoundPage from './pages/NotFoundPage'
import Navbar from './components/Navbar';
import { Context } from './main';
import  axios from 'axios';
import Footer from './pages/Footer';


function App() {
  const {isAuthenticated, setIsAuthenticated,  setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/user/patient/me', {
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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />

    </Router>

    
    </>
  )
}

export default App