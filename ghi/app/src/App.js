import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './CustomerForm';
import CustomersList from './CustomersList';

function App(props) {


  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
        <Route index element={<MainPage />} />
          <Route path="customers">
            <Route index element={<CustomersList />} />
          <Route path="new" element={<CustomerForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
