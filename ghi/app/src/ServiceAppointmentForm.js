import React, { useState, useEffect } from 'react';

function ServiceAppointmentForm() {
  const [formData, setFormData] = useState({
    customer: '',
    vin: '',
    reason: '',
    employee_id: '',
    date_time: '',
  });

  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/service/technicians/')
      .then(response => response.json())
      .then(data => setTechnicians(data.technicians));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = 'http://localhost:8080/api/service/appointments/';

    const fetchConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        date_time: new Date().toISOString(),
      }),
    };

    const response = await fetch(url, fetchConfig);

    if (response.ok) {
      setFormData({
        customer: '',
        vin: '',
        reason: '',
        employee_id: '',
        date_time: '',
      });
      alert('Appointment added successfully!');
    }
  };

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  return (
    <>
      <div></div>
      <div className='row'>
        <div className='offset-3 col-6'>
          <div className='shadow p-4 mt-4'>
            <h1>Create a Service Appointment</h1>
            <form onSubmit={handleSubmit}>
              <div className='form-floating mb-3'>
                <label htmlFor="customer">Customer</label>
                <input type="text" value={formData.customer} onChange={handleFormChange} className='form-control' name="customer"  />
              </div>
              <div className='form-floating mb-3'>
                <label htmlFor='automobile_vin'>Automobile VIN</label>
                <input type="text" value={formData.vin} onChange={handleFormChange} className='form-control' name="vin"/>
              </div>
              <div className='form-floating mb-3'>
                <label htmlFor="reason">Reason</label>
                <input type="text" value={formData.reason} onChange={handleFormChange} className='form-control' name="reason"/>
              </div>
              <div className='form-floating mb-3'>
                <label htmlFor='technician'></label>
                <select value={formData.employee_id} onChange={handleFormChange} className='form-control' name="employee_id">
                  <option value="">Select a technician</option>
                  {technicians && technicians.map(technician => (
                    <option key={technician.employee_id} value={technician.employee_id}>
                      {technician.first_name} {technician.last_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-floating mb-3'>
                <label htmlFor='datetime'></label>
                <input type="datetime-local" value={formData.date_time} onChange={handleFormChange} name="date_time" required />
              </div>
              <button className="btn btn-lg btn-primary w-20" type="submit">Create</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default ServiceAppointmentForm;
