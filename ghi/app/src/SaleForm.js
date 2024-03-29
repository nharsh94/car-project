import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

function SaleForm() {
    const [autos, setAutos] = useState([]);
    const [automobile, setAutomobile] = useState('');
    const [salespeople, setSalespeople] = useState([]);
    const [salesperson, setSalesperson] = useState('');
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate()

    const fetchAutos = async () => {
        const url = 'http://localhost:8100/api/automobiles/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            let autos_list = []
            let automobiles = data.autos;
            for (let auto of automobiles) {
                if (auto.sold === false) {
                    autos_list.push(auto);
                }
            }
            setAutos(autos_list);
        }
    }

    const fetchSalespeople = async () => {
        const url = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(url);
        
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople);
        }
    }
    const fetchCustomers = async () => {
        const url = 'http://localhost:8090/api/customers/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
        }
    }

    useEffect(() => {
        fetchAutos();
        fetchSalespeople();
        fetchCustomers();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.automobile = automobile;
        data.salesperson = salesperson;
        data.customer = customer;
        data.price = price;

    const url = 'http://localhost:8090/api/sales/';

    const fetchConfig = {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
        };
    
        const response = await fetch(url, fetchConfig);

        if (response.ok) {
            setAutomobile('');
            setSalesperson('');
            setCustomer('');
            setPrice('');
            navigate('/sales/');
        }
    }
    const handleAutomobileChange = (event) => {
        const value = event.target.value;
        setAutomobile(value);
    }

    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
    }

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }
    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    }
    return (
        <div className="offset col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a new sale</h1>
                <form onSubmit={handleSubmit} id="create-sale-form">
                    <div className="mb-3">
                        <select value={automobile} onChange={handleAutomobileChange} required name="automobile" id="automobile" className="form-select">
                            <option value="">Choose a VIN</option>
                            {autos.map(automobile => {
                                return (
                                    <option key={automobile.vin} value={automobile.id}>
                                        {automobile.vin}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                            <select value={salesperson} onChange={handleSalespersonChange} required name="salesperson" id="salesperson" className="form-select">
                                <option value="">Choose a Salesperson</option>
                                {salespeople.map(salesperson => {
                                    return (
                                        <option key={salesperson.employee_id} value={salesperson.employee_id}>
                                            {salesperson.first_name}
                                        </option>
                                    )
                                })}
                                </select> 
                    </div>
                    <div>
                        <select value={customer} onChange={handleCustomerChange} required name="customer" id="customer" className="form-select">
                            <option value="">Choose a Customer</option>
                            {customers.map(customer => {
                                return (
                                    <option key={customer.id} value={customer.id}>
                                        {customer.first_name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={price} onChange={handlePriceChange} placeholder="price" required type="text" name="price" id="price" className="form-control" />
                        <label htmlFor="price">Price</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    );
    }

export default SaleForm;
