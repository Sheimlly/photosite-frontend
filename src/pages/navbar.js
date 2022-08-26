import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { removeAuthToken } from '../constants/token'
import '../styles/navbar.scss'

const AdminNavbar = () => {
  const handleLogout = () => {
    removeAuthToken();
    window.location.reload(false);
  }

  return (
    <li className="dropdown">
      <button className="dropbtn">Admin</button>
      <ul className="dropdown-content">
        <li><Link to="/admin/panel">Admin panel</Link></li>
        <li><Link to="/admin/categories">Kategorie</Link></li>
        <li><span onClick={handleLogout}>Wyloguj się</span></li>
      </ul>
    </li>
  )
}

const Navbar = () => {
  const token = localStorage.getItem("token");

  const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);
  const [navbarTop, setNavbarTop] = useState(0);


  window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
      let currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        setNavbarTop(0);
      } else {
        setNavbarTop(-150);
      }
      setPrevScrollpos(currentScrollPos);
    }
  });

  useEffect( () => {
    setNavbarTop(0);
  }, [])

  return (
    <>
      <nav className="navbar" id="hidding-navbar" style={{top: navbarTop}}>
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-5">
              Fotograf ja, czy jakoś tak
            </div>
            <ul className="col-7 px-0 d-flex justify-content-end">
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
                { token ? <AdminNavbar /> : null}
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  )
};

export default Navbar;
