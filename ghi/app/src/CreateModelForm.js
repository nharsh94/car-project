import React, { useState, useEffect } from 'react';

const CreateModelForm = () => {
    const [formData, setFormData] = useState({
        model_name: '',
        picture_url: '',
        manufacturer: ''
    });

    useEffect(() => {
        getManufacturers();
    }, []);

    const getManufacturers = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';
        try {
            const res = await fetch(url);
            if (res.ok) {
                const { manufacturers } = await res.json();
                setManufacturers(manufacturers);
            }
        } catch (e) {
            console.log("An error occurred", e);
        }
    }

    const [manufacturers, setManufacturers] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8100/api/models/';
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
                setFormData({
                    model_name: '',
                    picture_url: '',
                    manufacturer: ''
                });
            }
        } catch (e) {
            console.log("Error", e);
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
          <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a vehicle model</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="model_name" className="form-label">Model name:</label>
                    <input value={formData.model_name} onChange={handleFormChange} type="text" className="form-control" name="model_name" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="picture_url" className="form-label">Picture URL:</label>
                    <input value={formData.picture_url} onChange={handleFormChange} type="text" className="form-control" name="picture_url" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="manufacturer" className="form-label">Manufacturer:</label>
                    <select value={formData.manufacturer} onChange={handleFormChange} className="form-select" name="manufacturer">
                      <option value="">Choose a manufacturer</option>
                      {manufacturers.map(manufacturer => (
                        <option value={manufacturer.name} key={manufacturer.id}>{manufacturer.name}</option>
                      ))}
                    </select>
                  </div>
                  <button className="btn btn-lg btn-primary w-20" type="submit">Create</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
}
export default CreateModelForm;
