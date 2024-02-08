import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CreateModelForm from './CreateModelForm';
import ListModels from './ListModels';
import ListAutomobiles from './ListAutomobiles';
import TechnicianForm from './AddTechnicianForm';
import ListTechnicians from './ListTechnicians'
import ServiceAppointmentForm from './ServiceAppointmentForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/models" index element={<ListModels />} />
          <Route path="/models/new" index element={<CreateModelForm/>} />
          <Route path="/automobiles" index element={<ListAutomobiles/>} />
          <Route path="/technicians" index element={<ListTechnicians/>} />
          <Route path="/technicians/new" index element={<TechnicianForm/>} />
          <Route path="/appointments/new" index element={<ServiceAppointmentForm/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
