import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './CustomerForm';
import CustomersList from './CustomersList';
import ManufacturersList from './ManufacturersList';
import ManufacturerForm from './ManufacturerForm';
import SalespeopleList from './SalespeopleList';
import AutomobileForm from './AutomobileForm';
import SalesList from './SalesList';
import SaleHistory from './SaleHistory';
import SaleForm from './SaleForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/salespeople" element={<SalespeopleList />} />
          <Route path="/customers" element={<CustomersList />} /> 
          <Route path="/customers/new" element={<CustomerForm />} />
          <Route path="/manufacturers" element={<ManufacturersList />} />
          <Route path="/manufacturers/new" element={<ManufacturerForm />} />
          <Route path="/automobiles/new" element={<AutomobileForm />} />
          <Route path="/sales" element={<SalesList />} />
          <Route path="/sales/history/" element={<SaleHistory />} />
          <Route path="/sales/new/" element={<SaleForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
