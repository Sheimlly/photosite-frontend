// Components
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { getToken } from './constants/token'

// Pages
import Navbar from "./pages/navbar";
import Frontpage from "./pages/frontpage";
import Portfolio from "./pages/portfolio";
import Offer from "./pages/offer";
import AboutMe from "./pages/about-me";
import Contact from "./pages/contact";
import NoPage from "./pages/404";
import Footer from "./pages/footer";

// Admin
import Admin from "./pages/admin/admin";
import Panel from "./pages/admin/panel";
import Messages from "./pages/admin/messages";
import MessageDetails from "./pages/admin/message_details";
import AdminCategories from "./pages/admin/categories";
import AdminOffers from "./pages/admin/offers";
import AdminOfferDetails from "./pages/admin/offer_details";


// Styles
import './styles/global.scss'
import './styles/footer.scss'
import './fontello/css/fontello.css'


export default function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Frontpage />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="oferta" element={<Offer />} />
          <Route path="o-mnie" element={<AboutMe />} />
          <Route path="kontakt" element={<Contact />} />
          <Route path="admin">
            <Route index element={ token ? <Navigate to="/admin/panel" /> : <Admin />} />
            <Route path="panel" element={ token ? <Panel /> : <Navigate to="/admin" /> } />
            <Route path="messages" element={ token ? <Messages /> : <Navigate to="/admin" /> } />
            <Route path="messages/:message_id" element={ token ? <MessageDetails /> : <Navigate to="/admin" /> } />
            <Route path="categories" element={ token ? <AdminCategories /> : <Navigate to="/admin" /> } />
            <Route path="offers" element={ token ? <AdminOffers /> : <Navigate to="/admin" /> } />
            <Route path="offers/:offer_id" element={ token ? <AdminOfferDetails /> : <Navigate to="/admin" /> } />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);