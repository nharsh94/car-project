import React, { useState, useEffect } from 'react';

const CreateModelForm = () => {
    const [formData, setFormData] = useState({
        model_name: '',
        picture_url: '',
    });

    useEffect(() => {
        getModels();
    }, []);

    const getModels = async () => {
        const url = 'http://localhost:8100/api/models/';
        try {
            const res = await fetch(url);
            if (res.ok) {
                const { models } = await res.json();
                setVehicleModels(models);
            }
        } catch (e) {
            console.log("An error occurred", e);
        }
    }

    const [vehiclemodels, setVehicleModels] = useState([]);

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
                <button className="btn btn-lg btn-primary w-100" type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateModelForm;
