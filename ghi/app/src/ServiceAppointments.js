import React, { useState, useEffect } from 'react';

function ServiceAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [vipVins, setVipVins] = useState([]);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/service/appointments/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAppointments(data.appointments);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleFinish = async (appointmentId) => {
    const response = await fetch(`http://localhost:8080/api/service/appointments/${appointmentId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "status": "complete" }),
    });

    if (response.ok) {
      setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== appointmentId));
    }
  };

  const handleCancel = async (appointmentId) => {
    const response = await fetch(`http://localhost:8080/api/service/appointments/${appointmentId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "status": "canceled" }),
    });

    if (response.ok) {
      setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== appointmentId));
    }
  };

  useEffect(() => {
    const fetchVipVehicles = async () => {
      try {
        const response = await fetch('http://localhost:8100/api/automobiles/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVipVins(data.autos ? data.autos.map(auto => auto.vin) : []);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchVipVehicles();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Service Appointments</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date and Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.vin}</td>
              <td>{vipVins.includes(appointment.vin) ? (<span>Yes</span>) : (<span>No</span>)}</td>
              <td>{appointment.customer}</td>
              <td>{new Date(appointment.date_time).toLocaleString()}</td>
              <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
              <td>{appointment.reason}</td>
              <td>
                <button onClick={() => handleFinish(appointment.id)} style={{backgroundColor: 'green', color: 'white'}}>Finish</button>
                <button onClick={() => handleCancel(appointment.id)} style={{backgroundColor: 'red', color: 'white'}}>Cancel</button>
              </td>
            </tr>
           ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceAppointments;
