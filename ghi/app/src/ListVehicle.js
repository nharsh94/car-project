import React, {useEffect, useState} from "react";

const ListVehicle = function(props) {
    const [models, setModels] = useState([]);

    const getModels = async function() {
        const url = 'http://localhost:8100/api/models/'
        try {
            const response = await fetch(url)
            const data = await response.json();
            setModels(modelsData);
        } catch (e) {
            console.error('An error occured while fetching models:', error);
        }

    }

    useEffect(() => {
        getModels();
    }, [])

    return(
        <>
            <h1>Models</h1>
            <div>

            </div>
        </>
    )
}

export default ListVehicle;
