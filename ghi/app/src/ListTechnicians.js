import React, { useEffect, useState } from "react";
import ListTechniciansItems from "./ListTechniciansItems";

const ListTechnicians = function () {
    const [technicians, setTechnicians] = useState([]);

    useEffect(() => {
        const getTechnicians = async () => {
            const url = 'http://localhost:8080/api/service/technicians/';
            try {
                const response = await fetch(url);
                const data = await response.json();
                setTechnicians(data.technicians);
            } catch (error) {
                console.error('An error occurred while fetching technicians:', error);
            }
        };
        getTechnicians();
    }, []);


    return (
        <>
            <h1>Technicians</h1>
            <ul>
                {Array.isArray(technicians) && technicians.map(technician => (
                    <li key={technician.id}>
                        <ListTechniciansItems employee_id={technician.employee_id} />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ListTechnicians;
