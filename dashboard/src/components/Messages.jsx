
import React, {useState, useContext, useEffect} from 'react'
import {Context} from '../main'
import {Navigate} from 'react-router-dom'
import axios from 'axios'

const Messages = () => {
  const [messages, setMessages] = useState([])
  const {isAuthenticated, setIsAuthenticated} = useContext(Context);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const {data} = await axios.get('http://localhost:4000/api/v1/message/getall', 
          {
            withCredentials: true
          
        });
        setMessages(data.messages);

        
      } catch (error) {
        console.log(error);
        console.log("Error fetching messages");
        
      }
    }
    fetchMessages();

  }, [])
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }
  return <section className='page messages'>
    <h1>Messages</h1>
    <div className='banner'>
      {
        messages&& messages.length > 0 ? (messages.map((message, index) => {
          return <div key={index} className='card'>
            <div className="details">
            <p>Name: <span>{message.firstName} {message.lastName}</span></p> 
            <p>Email: <span>{message.email}</span></p>
            <p>Phone: <span>{message.phone}</span></p>
            <p>Message: <span>{message.message}</span></p>
            
          </div>
          </div>
        })) : <p>No messages</p>

      }
        </div>
  </section>
}





export default Messages