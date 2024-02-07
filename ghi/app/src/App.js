import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './CustomerForm';

function App() {

  const [customers, setCustomers] = useState([]);
  const getCustomers = async () => {
    const url = 'http://localhost:8090/api/customers/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setCustomers(data);
    }
  }

  useEffect(() => {
    getCustomers();
  },
  [
  ]);

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/customer/new" element={<CustomerForm getCustomers={getCustomers}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
