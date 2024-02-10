import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AutomobileForm() {
	const navigate = useNavigate();
	const [color, setColor] = useState("");
	const [year, setYear] = useState("");
	const [vin, setVin] = useState("");
	const [models, setModels] = useState([]);
	const [model, setModel] = useState("");

	const fetchModels = async () => {
		const modelUrl = "http://localhost:8100/api/models/";
		const response = await fetch(modelUrl);
		if (response.ok) {
			const data = await response.json();
			setModels(data.models);
		}
	};
	useEffect(() => {
		fetchModels();
	}, []);
	const handleColorChange = (e) => {
		const value = e.target.value;
		setColor(value);
	};
	const handleYearChange = (e) => {
		const value = e.target.value;
		setYear(value);
	};
	const handleVinChange = (e) => {
		const value = e.target.value;
		setVin(value);
	};
	const handleModelChange = (e) => {
		const value = e.target.value;
		setModel(value);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = {
			color: color,
			year: year,
			vin: vin,
			model_id: model,
		};

		const automobileUrl = "http://localhost:8100/api/automobiles/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(automobileUrl, fetchConfig);
		if (response.ok) {
			setColor("");
			setYear("");
			setVin("");
			setModel("");

			navigate("/automobiles");
		}
	};
	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Add an Automobile</h1>
					<form onSubmit={handleSubmit} id="create-automobile-form">
						<div className="form-floating mb-3">
							<input
								value={color}
								onChange={handleColorChange}
								placeholder="Color"
								required
								type="text"
								name="color"
								id="color"
								className="form-control"
							/>
							<label htmlFor="color">Color</label>
						</div>
						<div className="form-floating mb-3">
							<input
								value={year}
								onChange={handleYearChange}
								placeholder="year"
								required
								type="text"
								name="year"
								id="year"
								className="form-control"
							/>
							<label htmlFor="color">Year</label>
						</div>
						<div className="form-floating mb-3">
							<input
								value={vin}
								onChange={handleVinChange}
								placeholder="vin"
								required
								type="text"
								name="vin"
								id="vin"
								className="form-control"
							/>
							<label htmlFor="vin">VIN</label>
						</div>
						<div className="mb-3">
							<select
								value={model}
								onChange={handleModelChange}
								required
								name="model"
								id="model"
								className="form-select"
							>
								<option value=""> Choose a Model</option>
								{models.map((model) => {
									return (
										<option key={model.id} value={model.id}>
											{model.name}
										</option>
									);
								})}
							</select>
						</div>
						<button className="btn btn-success">
							Create Automobile
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default AutomobileForm;