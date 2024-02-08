import React, { useState, useEffect } from 'react';

function SaleForm() {
    const [autos, setAutos] = useState('');
    const [auto, setAuto] = useState('');
    const [salespeople, setSalespeople] = useState('');
    const [salesperson, setSalesperson] = useState('');
    const [customers, setCustomers] = useState('');
    const [customer, setCustomer] = useState('');
    const [price, setPrice] = useState('');

    const fetchAuto = async () => {
        const Url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(Url);
        if (response.ok) {
            const data = await response.json();
            setAutos(data.autos);
        }
    };

    const fetchSalespeople = async () => {
        const Url = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(Url);
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.customers);
        }
    };

    const fetchCustomer = async () => {
        const Url = 'http://localhost:8090/api/customers/';
        const response = await fetch(Url);
        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
        }
    };

    useEffect(() => {
        fetchAuto();
        fetchSalespeople();
        fetchCustomer();
    }, []);

    const handleAutoChange = event => {
        const value = event.target.value;
        setAuto(value);
    }
    const handleSalespersonChange = event => {
        const value = event.target.value;
        setSalesperson(value);
    }
    const handleCustomerChange = event => {
        const value = event.target.value;
        setCustomer(value);
    }
    const handlePriceChange = event => {
        const value = event.target.value;
        setPrice(value);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            automobile: auto,
            salesperson: salesperson,
            customer: customer,
            price: price,
        };

        const salesUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(salesUrl, fetchConfig);
        if (response.ok) {
            const autoUrl = `http://localhost:8100/api/automobiles/`;
            const fetchSoldConfig = {
                method: 'put',
                body: JSON.stringify({ sold: true }),
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            await fetch(autoUrl, fetchSoldConfig);
            setAuto('');
            setSalesperson('');
            setCustomer('');
            setPrice('');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new sale</h1>
                        <form onSubmit={handleSubmit} id="create-sale-form">
                            <div className="form-floating mb-3">
                                <select value={auto} required onChange={handleAutoChange} name="auto" id="auto" className="form-select">
                                    <option value="">
                                        Choose a VIN
                                    </option>
                                    {autos
                                    // .filter((auto) => auto.sold === false)
                                    .map((auto) => {
                                        return (
                                            <option key={auto.id} value={auto.vin}>
                                                {auto.vin}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <select value={salesperson} required onChange={handleSalespersonChange} name="salesperson" id="salesperson" className="form-select">
                                    <option value="">Choose a sales person</option>
                                    {salespeople.map((salesperson) => {
                                        return (
                                            <option key={salesperson.employee_id} value={salesperson.employee_id}>
                                                {salesperson.first_name} {salesperson.last_name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <select value={customer} required onChange={handleCustomerChange} name="customer" id="customer" className="form-select">
                                    <option value="">Choose a customer</option>
                                    {customers.map((customer) => {
                                        return (
                                            <option key={customer.id} value={customer.id}>
                                                {customer.first_name} {customer.last_name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={price} onChange={handlePriceChange} placeholder="price" required type="text" name="price" id="price" className="form-control" />
                                <label htmlFor="name">Price</label>
                            </div>
                            <div>
                                <button className="btn btn-primary">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default SaleForm;