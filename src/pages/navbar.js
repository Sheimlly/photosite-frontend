import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import '../styles/navbar.scss'




const Navbar = () => {
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
          <div className="row">
            <div className="col-6">
              Fotograf ja, czy jakoś tak
            </div>
            <ul className="col-6">
              <li>
                <Link to="/">Home</Link>
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
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  )
};

export default Navbar;
