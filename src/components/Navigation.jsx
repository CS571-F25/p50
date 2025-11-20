import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navStyle = {
    background: 'linear-gradient(135deg, rgba(26, 26, 36, 0.95), rgba(17, 17, 19, 0.95))',
    backdropFilter: 'blur(12px)',
    borderBottom: '2px solid var(--neon-purple)',
    boxShadow: '0 4px 24px rgba(127, 90, 240, 0.3)',
    padding: '0.5rem 0',
  };

  const brandStyle = {
    color: 'var(--text-primary)',
    fontSize: '1.5rem',
    fontWeight: '700',
    textShadow: '0 0 20px rgba(127, 90, 240, 0.8)',
    letterSpacing: '-0.02em',
    transition: 'all 0.3s ease',
  };

  const linkStyle = (active) => ({
    color: active ? 'var(--neon-purple)' : 'var(--text-secondary)',
    fontWeight: active ? '600' : '500',
    textShadow: active ? '0 0 12px rgba(127, 90, 240, 0.8)' : 'none',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    marginLeft: '0.5rem',
  });

  return (
    <Navbar expand="lg" style={navStyle} variant="dark" sticky="top" className="mb-0">
      <Container>
        <Navbar.Brand 
          as={Link} 
          to="/" 
          style={brandStyle}
          className="d-flex align-items-center"
        >
          <span style={{ fontSize: '1.8rem', marginRight: '0.5rem' }}>🎬</span>
          CineVibe
        </Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          style={{ borderColor: 'var(--neon-purple)' }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              style={linkStyle(isActive('/'))}
              className="nav-link-custom"
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/browse" 
              style={linkStyle(isActive('/browse'))}
              className="nav-link-custom"
            >
              Browse
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/about" 
              style={linkStyle(isActive('/about'))}
              className="nav-link-custom"
            >
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

