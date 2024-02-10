import { useEffect, useState } from 'react';

function ListModels() {
  const [models, setModels] = useState([]);

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
          {models.map(models => (
            <tr key={models.id}>
              <td>{models.name}</td>
              <td>{models.manufacturer.name}</td>
              <td>
                <img src={models.picture_url}  style={{width: 100, height: 100}} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListModels;
