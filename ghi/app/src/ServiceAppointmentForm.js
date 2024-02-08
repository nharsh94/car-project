import React, { useState } from 'react';

const ServiceAppointmentForm = () => {
    const [formData, setFormData] = useState({
        vin: '',
        customerName: '',
        Date: '',
        Time: '',
        technician: '',
        reason: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8080/api/service/appointments/';
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        try {
            const res = await fetch(url, fetchOptions);
            if (res.ok) {
                // Optionally, you can reset the form data after submission
                setFormData({
                    vin: '',
                    customerName: '',
                    Date: '',
                    Time: '',
                    technician: '',
                    reason: ''
                });
                console.log('Service appointment created successfully');
            } else {
                console.error('Failed to create service appointment');
            }
        } catch (error) {
            console.error('Error creating service appointment:', error);
        }
    }

    const handleFormChange = ({ target }) => {
        const { value, name } = target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    return (
        <div>
            <h1>Create a Service Appointment</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="vin" className="form-label">VIN:</label>
                    <input value={formData.vin} onChange={handleFormChange} type="text" className="form-control" name="vin" />
                </div>
                <div className="mb-3">
                    <label htmlFor="customer" className="form-label">Customer:</label>
                    <input value={formData.customerName} onChange={handleFormChange} type="text" className="form-control" name="customer" />
                </div>
                <div className="mb-3">
                    <label htmlFor="Date" className="form-label">Date:</label>
                    <input value={formData.Date} onChange={handleFormChange} type="date" className="form-control" name="Date" />
                </div>
                <div className="mb-3">
                    <label htmlFor="Time" className="form-label">Time:</label>
                    <input value={formData.Time} onChange={handleFormChange} type="time" className="form-control" name="Time" />
                </div>
                <div className="mb-3">
                    <label htmlFor="technician" className="form-label">Assigned Technician:</label>
                    <input value={formData.technician} onChange={handleFormChange} type="text" className="form-control" name="technician" />
                </div>
                <div className="mb-3">
                    <label htmlFor="reason" className="form-label">Reason for Service:</label>
                    <input value={formData.reason} onChange={handleFormChange} type="text" className="form-control" name="reason" />
                </div>
                <button className="btn btn-lg btn-primary" type="submit">Create</button>
            </form>
        </div>
    );
}

export default ServiceAppointmentForm;
