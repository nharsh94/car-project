import { useState, useEffect } from 'react'; 

function CustomersList() {
    const [customers, setCustomers] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/customers/');

        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return(
        <table className="table table-striped">
            <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Phone Number</th>
            </tr>
            </thead>
            <tbody>
                {customers.map((customer) => {
                    return (
                        <tr key={customer.id}>
                            <td>{ customer.first_name }</td>
                            <td>{ customer.last_name }</td>
                            <td>{ customer.address }</td>
                            <td>{ customer.phone_number }</td>
                        </tr>
                    )
                })}
            </tbody>
            </table>
    )
}

export default CustomersList;