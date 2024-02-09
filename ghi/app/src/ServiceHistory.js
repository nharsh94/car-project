import React, { useState, useEffect } from 'react';

function ServiceHistory() {
  const [vin, setVin] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [vipVins, setVipVins] = useState([]);


  const fetchAppointments = async (vin) => {
    try {
      const response = await fetch(`http://localhost:8080/api/service/appointments/?vin=${vin}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAppointments(data.appointments);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchAppointments(event.target.elements[0].value);
  };

  const handleDelete = async (appointmentId) => {
    const response = await fetch(`http://localhost:8080/api/service/appointments/${appointmentId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
    }
  };

  const handleComplete = async (appointmentId) => {
    const response = await fetch(`http://localhost:8080/api/service/appointments/${appointmentId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "status": "complete" }),
    });

    if (response.ok) {
      const updatedAppointment = await response.json();
      setAppointments(appointments.map(appointment =>
        appointment.id === appointmentId ? updatedAppointment : appointment
      ));
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
      const updatedAppointment = await response.json();
      setAppointments(appointments.map(appointment =>
        appointment.id === appointmentId ? updatedAppointment : appointment
      ));
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
      <form onSubmit={handleSubmit}>
        <label>
          VIN:
          <input type="text" value={vin} onChange={e => setVin(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <h1>Service History</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Is VIP?</th>
            <th>Customer</th>
            <th>Date and Time</th>
            <th>Technician</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.date_time}>
                <td>{appointment.vin}</td>
                <td>{vipVins.includes(appointment.vin) ? (<span>Yes</span>) : (<span>No</span>)}</td>
                <td>{appointment.customer}</td>
                <td>{new Date(appointment.date_time).toLocaleString()}</td>
                <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.status}</td>




              <td>
                <button onClick={() => handleComplete(appointment.id)}>Complete</button>
                <button onClick={() => handleCancel(appointment.id)}>Cancel</button>
                <button onClick={() => handleDelete(appointment.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceHistory;
