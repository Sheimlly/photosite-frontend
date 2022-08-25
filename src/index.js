// Components
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Navbar from "./pages/navbar";
import Frontpage from "./pages/frontpage";
import Portfolio from "./pages/portfolio";
import Offer from "./pages/offer";
import AboutMe from "./pages/about-me";
import Contact from "./pages/contact";
import Admin from "./pages/admin";
import NoPage from "./pages/404";
import Footer from "./pages/footer";

// Styles
import './styles/global.scss'
import './styles/footer.scss'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Frontpage />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="oferta" element={<Offer />} />
          <Route path="o-mnie" element={<AboutMe />} />
          <Route path="kontakt" element={<Contact />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);