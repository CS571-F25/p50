import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  const footerStyle = {
    background: 'linear-gradient(135deg, rgba(17, 17, 19, 0.95), rgba(26, 26, 36, 0.95))',
    backdropFilter: 'blur(12px)',
    borderTop: '2px solid rgba(127, 90, 240, 0.3)',
    padding: '3rem 0 2rem',
    marginTop: '4rem',
  };

  const linkStyle = {
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  };

  return (
    <footer style={footerStyle} role="contentinfo">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h3 style={{ 
              color: 'var(--neon-purple)', 
              fontSize: '1.5rem',
              marginBottom: '1rem',
              fontWeight: '700'
            }}>
              🎬 CineVibe
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Discover films through mood, not genre. Express your vibe and find your perfect cinematic match.
            </p>
          </Col>
          <Col md={4} className="mb-4">
            <h4 style={{ 
              color: 'var(--text-primary)', 
              fontSize: '1.1rem',
              marginBottom: '1rem',
              fontWeight: '600'
            }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#/" style={linkStyle} onMouseEnter={(e) => e.target.style.color = 'var(--neon-purple)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                  Home
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#/browse" style={linkStyle} onMouseEnter={(e) => e.target.style.color = 'var(--neon-purple)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                  Browse
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="#/about" style={linkStyle} onMouseEnter={(e) => e.target.style.color = 'var(--neon-purple)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                  About
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4} className="mb-4">
            <h4 style={{ 
              color: 'var(--text-primary)', 
              fontSize: '1.1rem',
              marginBottom: '1rem',
              fontWeight: '600'
            }}>
              Features
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Mood-Based Discovery
              </li>
              <li style={{ marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Real-Time Recommendations
              </li>
              <li style={{ marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                65+ Curated Films
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <hr style={{ 
              borderColor: 'rgba(127, 90, 240, 0.3)',
              margin: '2rem 0 1rem'
            }} />
            <p style={{ 
              color: 'var(--text-muted)', 
              fontSize: '0.85rem',
              textAlign: 'center',
              margin: 0
            }}>
              © 2025 CineVibe. Built with React & React Bootstrap.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

