import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const MessageForm = () => {
  let data = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  };

  const [formData, setFormData] = useState(data);

  const { firstName, lastName, email, phone, message } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMessage = async(e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/v1/message/send', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        toast.success(res.data.message);
        setFormData(data);
      });
      
      
    } catch (error) {
      toast.error(error.response.data.message);
      
    }

  };

  return (
    <>
    <div className="container message-form form-component ">
      <h2>Send Us A Message</h2>
      <form onSubmit={handleMessage}>
        <div>
          <input type="text" name="firstName" placeholder='First Name' value={firstName} onChange={handleChange} />
          <input type="text" name="lastName" placeholder='Last Name' value={lastName} onChange={handleChange} />
          </div>  
        <div>
          <input type="email" name="email" placeholder='Email' value={email} onChange={handleChange} />
          <input type="number" name="phone" placeholder='Phone' value={phone} onChange={handleChange} />
        </div>
          <textarea name="message" placeholder='Message' rows={7} value={message} onChange={handleChange} />
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Send Message</button>

        </div>
      </form>
    </div>
    </>
  );
};

export default MessageForm;
