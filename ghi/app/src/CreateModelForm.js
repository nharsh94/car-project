import React, { useEffect, useState } from 'react';
function ModelForm() {
  const [manufacturers, setManufacturers] = useState([])
  const [manufacturer_id, setManufacturer] = useState('')
  const [picture_url, setPictureUrl] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted]= useState(false)
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  }
  const handlePictureChange = (e) => {
    const value = e.target.value;
    setPictureUrl(value)
  }
  const handleManufacturerChange = (e) => {
    const value = e.target.value;
    setManufacturer(value);
  }
  const fetchData = async () => {
    const manufacturerURL = 'http://localhost:8100/api/manufacturers/';
    const manufacturerResponse = await fetch(manufacturerURL)
    if (manufacturerResponse.ok) {
      const data = await manufacturerResponse.json()
      setManufacturers(data.manufacturers)
    }
  }
  useEffect(() => {
    fetchData();
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      picture_url,
      manufacturer_id,
    }
    console.log(data)
    const modelURL = 'http://localhost:8100/api/models/'
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }
    const modelResponse = await fetch(modelURL, fetchConfig)
    if (modelResponse.ok) {
      const model = await modelResponse.json()
      console.log(model)
      setName("")
      setPictureUrl("")
      setManufacturer("")
      setSubmitted(true)
    }
  }
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a vehicle model</h1>
          <form onSubmit={handleSubmit} id="create-model-form">
            <div className="form-floating mb-3">
              <input onChange={handleNameChange} value={name} placeholder="Model Name" required type="text" name="name" id="name" className="form-control" />
              <label htmlFor="name">Model name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handlePictureChange} value={picture_url} placeholder="Picture URL" required type="text" name="picture_url" id="picture_url" className="form-control" />
              <label htmlFor="picture_url">Picture URL</label>
            </div>
            <div className="mb-3">
              <select onChange={handleManufacturerChange} value={manufacturer_id} required name="manufacturer" id="manufacturer" className="form-select">
                <option value="">Choose a Manufacturer</option>
                {manufacturers.map(manufacturer => {
                  return (
                    <option key={manufacturer.href} value={manufacturer.id}>
                      {manufacturer.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default ModelForm;
