import React from 'react';

const ListModelsItems = function({ model, showHeadings }) {
    return (
        <div className="category">
            {showHeadings && (
                <div>
                    <h2>Name</h2>
                    <h2>Manufacture</h2>
                    <h2>Picture</h2>
                </div>
            )}
            <div>
                <p>{model.name}</p>
                <p>{model.manufacturer.name}</p>
                <img src={model.picture_url} alt="Product Image" />
            </div>
        </div>
    );
};

export default ListModelsItems;
