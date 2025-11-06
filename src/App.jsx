import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import AboutMe from "./components/AboutMe.jsx";

const bio = "Hi, I’m Arin — this is my mini site built with Vite + React Router.";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home bio={bio} />} />
        <Route path="/about" element={<AboutMe bio={bio} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
