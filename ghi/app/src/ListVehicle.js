import React, { useEffect, useState } from "react";
import ListVehicleModels from "./ListVehicleModels";

const ListVehicle = function () {
    const [models, setModels] = useState([]);

    useEffect(() => {
        const getModels = async () => {
            const url = 'http://localhost:8100/api/models/';
            try {
                const response = await fetch(url);
                const modelsdata = await response.json();
                setModels(modelsdata);
            } catch (error) {
                console.error('An error occurred while fetching models:', error);
            }
        };
        getModels();
    }, []);

    return (
        <>
            <h1>Models</h1>
            <ul>
                {Array.isArray(models) && models.map(model => (
                    <li key={model.id}>
                        <ListVehicleModels model={model} />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ListVehicle;
