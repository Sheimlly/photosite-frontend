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
        <li><Link to="/admin/offers">Oferty</Link></li>
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
    if (window.innerWidth >= 992) {
      if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
        let currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
          setNavbarTop(0);
        } else {
          setNavbarTop(-150);
        }
        setPrevScrollpos(currentScrollPos);
      }
    }
  });


  const removeClass = () => {
    document.getElementById("hidding-navbar").className = "navbar";
  }
  const addEventListener = (el) => {
    var links = el.querySelectorAll('li');

    links.forEach(link => {
      link.addEventListener('click', removeClass);
    })
  }

  const removeEventListener = (el) => {
    const links = el.querySelectorAll('li');

    links.forEach(link => {
      link.removeEventListener('click', removeClass);
    })

  }

  const showItems = () => {
    var nav = document.getElementById("hidding-navbar");
    if (nav.className === "navbar") {
      nav.className += " responsive";
      addEventListener(nav);
    } else {
      nav.className = "navbar";
      removeEventListener(nav);
    }
  }

  useEffect( () => {
    setNavbarTop(0);
  }, [])

  return (
    <>
      <nav className="navbar" id="hidding-navbar" style={{top: navbarTop}}>
        <div className="container">
          <div className="row navbar-body justify-content-between">
            <div className="col-6 col-lg-3 col-xl-5 logo">
              Fotograf ja, czy jakoś tak
            </div>
            <ul className="col-lg-9 col-xl-7 px-0 d-lg-flex justify-content-lg-end">
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
            <button className="icon col-6 d-lg-none" onClick={showItems}>
              <i className="icon-right" />
            </button>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  )
};

export default Navbar;
