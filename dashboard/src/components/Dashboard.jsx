import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { AiFillCloseCircle } from 'react-icons/ai';
import { GoCheckCircleFill } from 'react-icons/go';
import { toast } from 'react-toastify';



const Dashboard = () => {
  const { isAuthenticated ,user} = useContext(Context);

  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchAppointmentsAndDoctors = async () => {
      try {
        const appointmentsResponse = await axios.get('http://localhost:4000/api/v1/appointment/getall', {
          withCredentials: true
        });
        const doctorsResponse = await axios.get('http://localhost:4000/api/v1/user/doctors', {
          withCredentials: true
        });
        setAppointments(appointmentsResponse.data.appointments);
        setDoctors(doctorsResponse.data.doctors);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setAppointments([]);
        setDoctors([]);
      }
    };

    fetchAppointmentsAndDoctors();
  }, []);

  const handleStatusChange = async (appointmentId, status) => {
  try {
    const { data } = await axios.put(
      `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
      { status },
      {
        withCredentials: true,
      }
    );
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment._id === appointmentId ? { ...appointment, status } : appointment
      )
    );
    toast.success(data.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};



  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }
  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/doctor.png" alt="DocImg" />
            <div className="content">
              <div>
                <p>
                  <strong>Hello</strong>,
                  {user && `${user.firstName} ${user.lastName}`}
                </p>
              </div>
              <p>
                Welcome to your dashboard, here you can view your appointments and other details.
              </p>
              <h3>

              </h3>
              
            </div>
          </div>
          <div className="secondBox">
            <p>
              <strong>Appointments</strong>
            </p>
            <h3>
              {
                appointments.length
              }
            </h3>
            </div>
            <div className="thirdBox">
            <p>
              <strong>
                Registered Doctors
                </strong>
            </p>
            <h3>
              {
                doctors.length
              }
            </h3>
            </div>

        </div>
        <div className="banner">
          <h5>
            <strong>Appointments</strong>
          </h5>
          <table>
            <thead>
              <tr>
                <th>
                  <strong>Patient</strong>
                </th>
                <th>
                  <strong>Date</strong>
                </th>
                <th>
                  <strong>Doctor</strong>
                </th>
                <th>
                  <strong>Department</strong>
                </th>
                <th>
                  <strong>Status</strong>
                </th>
                <th>
                  <strong>Visited</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {
              appointments && appointments.length > 0 ?
              ( appointments.map((appointment, index) => (
                  <tr key={index}>
                    <td>
                      {appointment.firstName} {appointment.lastName}
                    </td>
                    <td>
                      {
                        appointment.appointment_Date
                      }
                    </td>
                    <td>
                      {appointment.doctor.lastName}
                    </td>
                    <td>
                      {appointment.department}
                    </td>
                    <td>
                      {/* {appointment.status} */}
                    <select className={appointment.status === 'Pending' ? 'value-pending' : 
                    appointment.status === 'Rejected' ? 'value-rejected' : 'value-accepted'}
                     value={appointment.status} onChange={(e) => handleStatusChange(appointment._id,
                      e.target.value)}>
                      <option value="Pending" className='value-pending'>Pending</option>
                      <option value="Accepted" className='value-accepted'>Accepted</option> 
                      <option value="Rejected" className='value-rejected'>Rejected</option>
                    </select>
                    </td>
                    <td>
                      {appointment.hasvisited === true ? <GoCheckCircleFill className='green'/> : <AiFillCloseCircle className='red'/>}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    No appointments found!
                  </td>
                </tr>
              )
              }
            </tbody>
          </table>
        </div>
      </section>
     
    </>
  )
}

export default Dashboard

