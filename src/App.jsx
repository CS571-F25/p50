import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import Navigation from "./components/Navigation.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx";
import Browse from "./components/Browse.jsx";
import AboutMe from "./components/AboutMe.jsx";

export default function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navigation />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/about" element={<AboutMe />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </ErrorBoundary>
  );
}
