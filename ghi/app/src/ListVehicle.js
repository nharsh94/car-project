import React, {useEffect, useState} from "react";
import ListVehicleModels from "./ListVehicleModels";

const ListVehicle = function(props) {
    const [models, setModels] = useState([]);

    const getModels = async function() {
        const url = 'http://localhost:8100/api/models/'
        try {
            const response = await fetch(url)
            const data = await response.json();
            console.log(data);
        } catch (e) {
            console.error('An error occured while fetching models:', e);
        }

    }

    useEffect(() => {
        getModels();
    }, [])

    return(
        <>
            <h1>Models</h1>
            <ul>
                {models.map(model => <ListVehicleModels model={model} />)}
            </ul>
        </>
    )
}

export default ListVehicle;
