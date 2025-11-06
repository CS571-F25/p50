import "./App.css";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home.jsx";
import AboutMe from "./components/AboutMe.jsx";

export default function App() {
  return (
    <HashRouter>
      <div className="container py-3">
        <nav className="d-flex gap-3 mb-3">
          <Link to="/">CineVibe</Link>
          <Link to="/about">About</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutMe />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
