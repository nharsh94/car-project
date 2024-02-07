import { NavLink, Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
            <li className="nav-item dropdown">
              <a href="/" className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-base-toggle="dropdown" aria-expanded="false">
                Sales Center
                </a>
                <ul className="dropdown-menu" aria-labelledby='navbarDarkDropdownMenuLink'>
                  <li><Link className="dropdown-item" to="/customers/new">Create a customer</Link></li>
                  </ul>
                  </li>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
