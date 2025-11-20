import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation.jsx";
import Home from "./components/Home.jsx";
import Browse from "./components/Browse.jsx";
import AboutMe from "./components/AboutMe.jsx";

export default function App() {
  return (
    <HashRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/about" element={<AboutMe />} />
      </Routes>
    </HashRouter>
  );
}
