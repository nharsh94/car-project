import React, { useState, useEffect } from 'react';

function ListAutomobiles() {
  const [automobiles, setAutomobiles] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {
    const fetchAutomobiles = async () => {
      const response = await fetch('http://localhost:8100/api/automobiles/');
      const data = await response.json();
      setAutomobiles(data.autos);
    };

    const fetchManufacturers = async () => {
      const response = await fetch('http://localhost:8100/api/manufacturers/');
      const data = await response.json();
      setManufacturers(data.manufacturers);
    };

    fetchAutomobiles();
    fetchManufacturers();
  }, []);

  const getManufacturerName = (auto) => {
    const manufacturerId = auto.model.manufacturer.id;
    const manufacturer = manufacturers.find(m => m.id === manufacturerId);
    return manufacturer ? manufacturer.name : '';
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Automobiles List</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>VIN</th>
                <th>Color</th>
                <th>Year</th>
                <th>Model</th>
                <th>Manufacturer</th>
                <th>Sold</th>
              </tr>
            </thead>
            <tbody>
              {automobiles && automobiles.map(auto => (
                <tr key={auto.vin}>
                  <td>{auto.vin}</td>
                  <td>{auto.color}</td>
                  <td>{auto.year}</td>
                  <td>{auto.model.name}</td>
                  <td>{getManufacturerName(auto)}</td>
                  <td>{auto.sold ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListAutomobiles;
