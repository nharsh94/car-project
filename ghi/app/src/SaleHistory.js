import React, { useEffect, useState } from 'react'

function SaleHistory() {
    const [sales, setSales] = useState([]);
    const getData = async () => {
        const salesUrl = "http://localhost:8090/api/sales/";
        const response = await fetch(salesUrl);

        if (response.ok) {
            const data = await response.json();
            setSales(data.sales);
        }
    };
    const [salespeople, setSalespeople] = useState([]);
    const salesPeopleData = async () => {
        const url = 'http://localhost:8090/api/salespeople/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople);
        }
    };

    const [salesperson, setSalesperson] = useState('');

    const handleSalesPersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
    };

useEffect(() => {
    getData();
    salesPeopleData();
}, []);
    
return (
        <div>
            <h1>Salesperson History</h1>
            <div className="mb-3">
                <select value={salesperson} onChange={handleSalesPersonChange} required name="salesperson" id="salesperson" className="form-select">
                    <option>Salesperson</option>
                    {salespeople.map((salesperson) => {
                        return (
                            <option key={salesperson.employee_id} value={salesperson.employee_id}>
                                {`${salesperson.first_name} ${salesperson.last_name}`}
                            </option>
                        );
                    })}
                </select>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Salesperson</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales
                    .filter((sale) => sale.salesperson.employee_id === salesperson)
                    .map((sale) => {
                    return (
                        <tr key={sale.id}>
                            <td>{`${sale.salesperson.first_name} ${sale.salesperson.last_name}`}</td>
                            <td>{`${sale.customer.first_name} ${sale.customer.last_name}`}</td>
                            <td>{sale.automobile.vin}</td>
                            <td>{sale.price}</td>
                        </tr>
                    );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default SaleHistory;