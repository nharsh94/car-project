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
      setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
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
      setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
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
            <th>Reason</th>
            <th>Status</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Technician</th>
            <th>Date and Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.date_time}>
              <td>{appointment.reason}</td>
              <td>{appointment.status}</td>
              <td>{appointment.customer}</td>
              <td>
                {appointment.vin}
                {vipVins.includes(appointment.vin) && <span style={{color: 'red'}}> VIP</span>}
              </td>
              <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
              <td>{new Date(appointment.date_time).toLocaleString()}</td>
              <td>
                <button onClick={() => handleFinish(appointment.id)}>Finish</button>
                <button onClick={() => handleCancel(appointment.id)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceAppointments;
