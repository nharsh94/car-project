import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className='nav-item'>
              <NavLink className="nav-link" to="/models">Models</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/models/new">Create a Model</NavLink>
            <li className='nav-item'>
              <NavLink className="nav-link" to="/automobiles">Automobiles</NavLink>
            <li className='nav-item'>
              <NavLink className="nav-link" to="technicians">Technicians</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" to="technicians/new">Add a Technician</NavLink>
              <li className='nav item'>
              <NavLink className="nav-link" to="appointments/new">Create a Service Appointment</NavLink>
              <li className='nav item'>
                <NavLink className="nav-link" to="appointments">Service Appointments</NavLink>
              </li>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/customers">
                Customers
                </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/customers/new">
                Create Customer
                </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/manufacturers">
                Manufacturers
                </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/manufacturers/new">
                Create Manufacturer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/salespeople">
                Salespeople
                </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/automobiles/new">
                Create Automobile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/sales">
                Sales
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/sales/history">
                Sales History
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/sales/new">
                Create Sale
              </NavLink>
            </li>
            </li>
            </li>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </header>
  );
}

export default Nav;
