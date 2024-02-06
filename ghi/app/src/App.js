import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/models">
            <Route path="/" index element={<ListVehicle />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
