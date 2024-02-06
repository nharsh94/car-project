import React from 'react';

const ListVehicleModels = function({ model }) {
    return (
        <div>
            <div className="category">
                <h2>Name</h2>
                <p>Product Name:{model.name}</p>
            </div>

            <div className="category">
                <h2>Manufacture</h2>
                <p>Manufacturer:{model.manufacturer}</p>
            </div>

            <div className="category">
                <h2>Picture</h2>
                <img src={model.imageUrl} alt="Product Image" />
            </div>
        </div>
    );
};

export default ListVehicleModels;
