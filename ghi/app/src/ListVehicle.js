import React, { useEffect, useState } from "react";
import ListVehicleModels from "./ListVehicleModels";

const ListVehicle = function () {
    const [models, setModels] = useState([]);

    const getModels = async function () {
        const url = 'http://localhost:8100/api/models/'
        try {
            const response = await fetch(url)
            const modelsdata = await response.json();
            setModels(modelsdata);
        } catch (error) {
            console.error('An error occurred while fetching models:', error);
        }
    }

    useEffect(() => {
        getModels();
    }, [])

    return (
        <>
            <h1>Models</h1>

                {Array.isArray(models) && models.map(model => (
                    <ListVehicleModels key={model.id} model={model} />
                ))}

        </>
    )
}

export default ListVehicle;
