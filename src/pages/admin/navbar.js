import { Outlet, Link } from "react-router-dom";
import '../../styles/navbar.scss'

const AdminNavbar = () => {
  return (
    <>
      <nav className="navbar" id="hidding-navbar">
        <div className="container">
          <div className="row">
            <ul>
                <li>
                    <Link to="/">Strona główna</Link>
                </li>
                <li>
                    <Link to="/portfolio">Portfolio</Link>
                </li>
                <li>
                    <Link to="/oferta">Oferta</Link>
                </li>
                <li>
                    <Link to="/o-mnie">O mnie</Link>
                </li>
                <li>
                    <Link to="/kontakt">Kontakt</Link>
                </li>
                <li>
                    <Link to="/admin-panel">Admin panel</Link>
                </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  )
};

export default AdminNavbar;
