import { Container, Card, Row, Col } from 'react-bootstrap';

export default function AboutMe() {
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 70% 30%, rgba(255, 180, 0, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
    zIndex: 0,
    opacity: 0.4,
  };

  const containerStyle = {
    position: 'relative',
    zIndex: 1,
    padding: '2rem',
    minHeight: 'calc(100vh - 60px)',
  };

  const headerStyle = {
    color: 'var(--text-primary)',
    fontWeight: '700',
    fontSize: '2.5rem',
    textShadow: '0 0 20px rgba(255, 180, 0, 0.8)',
    marginBottom: '2rem',
    letterSpacing: '-0.02em',
  };

  const cardStyle = {
    background: 'rgba(35, 35, 41, 0.7)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '2px solid rgba(127, 90, 240, 0.3)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    borderRadius: '16px',
    marginBottom: '2rem',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
  };

  const cardHeaderStyle = {
    color: 'var(--neon-purple)',
    fontWeight: '700',
    fontSize: '1.5rem',
    textShadow: '0 0 12px rgba(127, 90, 240, 0.6)',
    marginBottom: '1rem',
  };

  const cardTextStyle = {
    color: 'var(--text-secondary)',
    fontSize: '1rem',
    lineHeight: '1.7',
  };

  const featureIconStyle = {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    filter: 'drop-shadow(0 0 10px rgba(127, 90, 240, 0.6))',
  };

  const featureCardStyle = {
    ...cardStyle,
    textAlign: 'center',
    padding: '2rem',
    height: '100%',
  };

  return (
    <>
      <div style={overlayStyle}></div>
      <Container style={containerStyle} className="cinematic-container">
        <h1 style={headerStyle} className="neon-header">
          About CineVibe
        </h1>
        
        <Row>
          <Col lg={10}>
            <Card style={cardStyle} className="glass-panel">
              <Card.Body className="p-4">
                <Card.Title style={cardHeaderStyle}>✨ What is CineVibe?</Card.Title>
                <Card.Text style={cardTextStyle}>
                  CineVibe is an experimental movie recommendation platform that replaces 
                  traditional search filters with a creative, mood-driven interface. Instead 
                  of selecting from static genres or lists, users express the emotional tone 
                  of the film they want to experience. Our innovative approach transforms 
                  movie discovery into an immersive, visually-driven journey.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card style={cardStyle} className="glass-panel">
              <Card.Body className="p-4">
                <Card.Title style={cardHeaderStyle}>🎨 How It Works</Card.Title>
                <Card.Text style={cardTextStyle}>
                  Mix and match intuitive design components such as colors, tones, textures, 
                  and descriptive keywords to represent your desired vibe. The system interprets 
                  these inputs collectively to curate personalized film recommendations that 
                  align with your mood rather than conventional metadata. Our algorithm considers 
                  the emotional palette you create, matching it with films that embody similar 
                  aesthetic and tonal qualities.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card style={cardStyle} className="glass-panel">
              <Card.Body className="p-4">
                <Card.Title style={cardHeaderStyle}>🎯 Our Vision</Card.Title>
                <Card.Text style={cardTextStyle}>
                  CineVibe transforms recommendation into an act of self-expression, bridging 
                  design aesthetics with media discovery. By focusing on mood as the central 
                  input, we highlight the potential for design-driven personalization and 
                  redefine the relationship between user interface, aesthetic exploration, 
                  and entertainment choice. We believe that discovering your next favorite 
                  film should be as engaging and creative as the films themselves.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={4}>
            <Card style={featureCardStyle} className="glass-panel">
              <div style={featureIconStyle}>🎬</div>
              <h4 style={{ ...cardHeaderStyle, fontSize: '1.2rem' }}>
                Mood-Driven
              </h4>
              <p style={{ ...cardTextStyle, fontSize: '0.9rem' }}>
                Express emotions through visual elements instead of rigid categories
              </p>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={featureCardStyle} className="glass-panel">
              <div style={featureIconStyle}>⚡</div>
              <h4 style={{ ...cardHeaderStyle, fontSize: '1.2rem' }}>
                Real-Time
              </h4>
              <p style={{ ...cardTextStyle, fontSize: '0.9rem' }}>
                Instant recommendations that adapt as you refine your mood
              </p>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={featureCardStyle} className="glass-panel">
              <div style={featureIconStyle}>✨</div>
              <h4 style={{ ...cardHeaderStyle, fontSize: '1.2rem' }}>
                Immersive
              </h4>
              <p style={{ ...cardTextStyle, fontSize: '0.9rem' }}>
                Cinematic UI that makes discovery an experience in itself
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}