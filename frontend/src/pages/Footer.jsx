import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="container">
        <hr />
        <div className="content">
            <div className="">
                <img src="/logo.png" alt="logo" className='logo-img' />
                </div>
                <div className="">
                <h3>Quick Links</h3>
                <ul>
                    <Link to="/">Home</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/appointment">Appointment</Link>
                    </ul>                    
                </div>
        </div>
    </footer>
  )
}

export default Footer