import React, { useEffect, useState } from "react";
import ListAutomobilesItems from "./ListAutomobilesItems";

const ListAutomobiles = function () {
  const [automobiles, setAutomobiles] = useState([]);

  useEffect(() => {
    const getAutomobiles = async () => {
      const url = "http://localhost:8100/api/automobiles/";
      try {
        const response = await fetch(url);
        const data = await response.json();
        setAutomobiles(data.autos); // Change data.automobiles to data.autos
      } catch (error) {
        console.error("An error occurred while fetching automobiles:", error);
      }
    };
    getAutomobiles();
  }, []);

  return (
    <>
      <h1>Automobiles</h1>
      {automobiles.map((automobile) => (
        <div key={automobile.id}>
          <ListAutomobilesItems automobile={automobile} />
          <hr /> {/* Add a horizontal line between each automobile */}
        </div>
      ))}
    </>
  );
};

export default ListAutomobiles;
