import React, { useEffect, useState } from "react";
import ListModelsItems from "./ListModelsItems";

const ListModels = function () {
    const [models, setModels] = useState([]);

    useEffect(() => {
        const getModels = async () => {
            const url = 'http://localhost:8100/api/models/';
            try {
                const response = await fetch(url);
                const data = await response.json();
                setModels(data.models);
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
                        <ListModelsItems model={model} />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ListModels;
