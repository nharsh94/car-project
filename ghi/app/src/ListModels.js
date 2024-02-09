import { useEffect, useState } from 'react';

function ListModels() {
  const [Models, setModels] = useState([]);

  const getData = async () => {
    const response = await fetch('http://localhost:8100/api/models/');

    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {Models.map(model => (
            <tr key={model.id}>
              <td>{model.name}</td>
              <td>{model.manufacturer.name}</td>
              <td>
                <img src={model.picture_url} alt={model.name} style={{width: "50px", height: "50px"}} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListModels;
