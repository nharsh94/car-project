import React from "react";

const ListAutomobilesItems = function ({ automobile }) {
  return (
    <div>
      <p>VIN: {automobile.vin}</p>
      <p>Color: {automobile.color}</p>
      <p>Year: {automobile.year}</p>
      <p>Model: {automobile.model.name}</p>
      <p>Manufacturer: {automobile.model.manufacturer.name}</p>
      <p>Sold {automobile.sold}</p>
    </div>
  );
};

export default ListAutomobilesItems;
