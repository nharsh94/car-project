import React, { useState, useEffect } from 'react';

function ServiceHistory() {
  const [vin, setVin] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [vipVins, setVipVins] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/service/appointments`);
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
    filterAppointments();
  };

  const filterAppointments = () => {
    const filtered = appointments.filter(appointment => appointment.vin.toLowerCase() === vin.toLowerCase());
    setFilteredAppointments(filtered);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

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
          Search by VIN:
          <input type="text" value={vin} onChange={e => setVin(e.target.value)} />
        </label>
        <button type="submit">Search</button>
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
          {vin && filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment, index) => (
              <tr key={`${appointment.date_time}_${index}`}>
                <td>{appointment.vin}</td>
                <td>{vipVins.includes(appointment.vin) ? 'Yes' : 'No'}</td>
                <td>{appointment.customer}</td>
                <td>{new Date(appointment.date_time).toLocaleString()}</td>
                <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.status === 'finished' ? 'Finished' : appointment.status === 'canceled' ? 'Canceled' : 'Pending'}</td>
              </tr>
            ))
          ) : (
            appointments.map((appointment, index) => (
              <tr key={`${appointment.date_time}_${index}`}>
                <td>{appointment.vin}</td>
                <td>{vipVins.includes(appointment.vin) ? 'Yes' : 'No'}</td>
                <td>{appointment.customer}</td>
                <td>{new Date(appointment.date_time).toLocaleString()}</td>
                <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.status === 'finished' ? 'Finished' : appointment.status === 'canceled' ? 'Canceled' : 'Pending'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceHistory;
