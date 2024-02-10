import React, { useEffect, useState } from "react";

function ListTechnicians() {
    const [technicians, setTechnicians] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/service/technicians/');
                if (response.ok) {
                    const data = await response.json();
                    setTechnicians(data.technicians);
                } else {
                    console.error("Failed to fetch technicians data.");
                }
            } catch (error) {
                console.error("Error fetching technicians data:", error);
            }
        };
        getData();
    }, []);

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                {technicians && technicians.length > 0 && technicians.map((technician) => (
                    <tr key={technician.id}>
                        <td>{technician.employee_id}</td>
                        <td>{technician.first_name}</td>
                        <td>{technician.last_name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ListTechnicians;
