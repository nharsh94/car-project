import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './CustomerForm';
import CustomersList from './CustomersList';
import ManufacturersList from './ManufacturersList';
import SalespeopleList from './SalespeopleList';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/salespeople" element={<SalespeopleList />} />
          <Route path="/customers" element={<CustomersList />} /> 
          <Route path="/customers/new" element={<CustomerForm />} />
          <Route path="/manufacturers" element={<ManufacturersList />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
