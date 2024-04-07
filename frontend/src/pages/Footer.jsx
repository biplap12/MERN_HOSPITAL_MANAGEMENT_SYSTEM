import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const hours = [
    {
      id: 1,
      day: "Sunday-Tuesday",
      time: "10:00 AM - 06:00 PM",
    },
    {
      id: 2,
      day: "Friday - Saturday",
      time: "10:00 AM - 04:00 PM",
    },
  ];

  return (
    <>
      <footer className={"container"}>
        <hr />
        <div className="content">
          <div>
            <img src="/logo1.png" alt="logo" className="logo-img"/>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <Link to={"/"}>Home</Link>
              <Link to={"/appointment"}>Appointment</Link>
              <Link to={"/about"}>About</Link>
            </ul>
          </div>
          <div>
            <h4>Hours</h4>
            <ul>
              {hours.map((element) => (
                <li key={element.id}>
                  <span>{element.day}</span>
                  <span>{element.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <div>
              <FaPhone />
              <span>9812345678</span>
            </div>
            <div>
              <MdEmail />
              <span>bnmedical@gmail.com</span>
            </div>
            <div>
              <FaLocationArrow />
              <span>Kathmandu Nepal</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
