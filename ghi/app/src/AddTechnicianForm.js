import React, { useState } from 'react';

const TechnicianForm = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        employee_id: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();


        const url = 'http://localhost:8080/api/service/technicians/';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Technician created successfully!');
                setFormData({
                    first_name: '',
                    last_name: '',
                    employee_id: ''
                });
            } else {
                console.error('Failed to create technician.');
            }
        } catch (error) {
            console.error('Error creating technician:', error);
        }
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div>
          <div className='row'>
            <div className='offset-3 col-6'>
              <div className='shadow p-4 mt-4'>
                <h2>Add a Technician</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">First name:</label>
                    <input value={formData.first_name} onChange={handleFormChange} type="text" className="form-control" name="first_name" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">Last name:</label>
                    <input value={formData.last_name} onChange={handleFormChange} type="text" className="form-control" name="last_name" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="employee_id" className="form-label">Employee Id:</label>
                    <input value={formData.employee_id} onChange={handleFormChange} type="text" className="form-control" name="employee_id" />
                  </div>
                  <button className="btn btn-lg btn-primary w-20" type="submit">Create</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
}
export default TechnicianForm;
