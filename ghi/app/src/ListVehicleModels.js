import React from 'react';

const ListVehicleModels = function({ models }) {

    return(
        <div className="">
            <img src={model.picture_url} />
            <div className="">
                <h6 className="">{hat.fabric} - {hat.style}</h6>
                <div>Color: {hat.color}</div>
                <div>Location: {hat.location.id}</div>
            </div>
        </div>
    )
}

export default ListVehicleModels;
