import React, { useState, useEffect } from 'react';

function SaleForm() {
    const [autos, setAutos] = useState([]);
    const getAutoData = async () => {
        const autosUrl = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(autosUrl);

        if (response.ok) {
            const data = await response.json();
            setAutos(data.autos);
        }
    };
    const [salespeople, setSalespeople] = useState([]);
    const salesPeopleData = async () => {
        const salesPeopleUrl = 'http://localhost:8100/api/salespeople/';
        const response = await fetch(salesPeopleUrl);

        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople);
        }
    };
    const [customers, setCustomers] = useState([]);
    const customersData = async () => {
        const customersUrl = 'http://localhost:8090/api/customers';
        const response = await fetch(customersUrl);

        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
        }
    };

    const [customer, setCustomer] = useState('');
    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const [salesperson, setSalesperson] = useState('');
    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
    };

    const [automobile, setAutomobile] = useState('');
    const handleAutomobileChange = (event) => {
        const value = event.target.value;
        setAutomobile(value);
    };

    const [price, setPrice] = useState('');
    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

    const data = {};
    data.automobile = automobile;
    data.salesperson = salesperson;
    data.customer = customer;
    data.price = price;

    const postUrl = 'http://localhost:8090/api/sales/';
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": 'application/json',
        },
    };

    const response = await fetch(postUrl, fetchConfig);
    if (response.ok) {
        const newSale = await response.json();

        setAutomobile('');
        setSalesperson('');
        setCustomers('');
        setPrice('');

        const autoUrl = `http://localhost:8100/api/automobiles/${automobile}`;
        const autoSold = { sold: true };
        const fetchAutoConfig = {
            method: "put",
            body: JSON.stringify(autoSold),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        await fetch(autoUrl, fetchAutoConfig)
        getAutoData();
    }
};

useEffect(() => {
    getAutoData();
    salesPeopleData();
    customersData();
}, []);

return (
    <div className="container">
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a Salesperson</h1>
                    <form onSubmit={handleSubmit} id="create-model">
                        <div className="mb-3">
                            <select value={automobile} onChange={handleAutomobileChange} required name="salesperson" id="salesperson" className="form-select">
                                <option>Choose a Salesperson:</option>
                                {salespeople.map((salesperson) => {
                                    return (
                                        <option key={salesperson.employee_id} value={salesperson.employee_id}>
                                            {`${salesperson.first_name} ${salesperson.last_name}`}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select value={customer} onChange={handleCustomerChange} required name="customer" id="customer" className="form-select">
                                <option>Choose a customer:</option>
                                {customers.map((customer) => {
                                    return (
                                        <option key={customer.id} value={customer.id}>
                                            {`${customer.first_name} ${customer.last_name}`}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={price} onChange={handlePriceChange} placeholder="Price" required type="text" id="price" name="price" className="form-control" />
                            <label htmlFor="price">Price:</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
);
}

export default SaleForm;