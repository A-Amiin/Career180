import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainNav from "./MainNav";
import './style.css'
import Home from "../../pages/HomePage";
import About from "../../pages/AboutPage";
import Contact from "../../pages/ContactPage";
import PostDetail from "../../features/PostDetail/PostDetail";

function Header() {
  return (
    <Router>
      <MainNav />
      <div className="mainContainer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/id/:id" element={<PostDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Header;
