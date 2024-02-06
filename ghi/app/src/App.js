import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ListVehicle from './ListVehicle'
import CreateModelForm from './CreateModelForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/models" index element={<ListVehicle />} />
          <Route path="/models/new" index element={<CreateModelForm/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
