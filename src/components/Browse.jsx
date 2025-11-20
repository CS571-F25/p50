import { Container, Row, Col } from 'react-bootstrap';
import { MOVIES, DATASET_INFO } from '../data/movies.js';
import MovieCard from './MovieCard.jsx';

export default function Browse() {
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 30% 70%, rgba(0, 159, 253, 0.1) 0%, transparent 50%)',
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
    textShadow: '0 0 20px rgba(0, 159, 253, 0.8)',
    marginBottom: '0.5rem',
    letterSpacing: '-0.02em',
  };

  const subtitleStyle = {
    color: 'var(--text-secondary)',
    fontSize: '1.1rem',
    marginBottom: '2rem',
    fontWeight: '400',
  };

  const statsStyle = {
    background: 'rgba(35, 35, 41, 0.6)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(0, 159, 253, 0.3)',
    borderRadius: '12px',
    padding: '1rem 1.5rem',
    marginBottom: '2rem',
    display: 'inline-block',
    color: 'var(--neon-blue)',
    fontWeight: '600',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
  };

  const dividerStyle = {
    height: '2px',
    background: 'linear-gradient(90deg, transparent 0%, var(--neon-blue) 50%, transparent 100%)',
    border: 'none',
    margin: '2rem 0',
    opacity: '0.5',
  };

  return (
    <>
      <div style={overlayStyle}></div>
      <Container style={containerStyle} className="cinematic-container">
        <h1 style={headerStyle} className="neon-header">
          Browse Collection
        </h1>
        <p style={subtitleStyle}>
          Explore our handpicked selection of cinematic experiences
        </p>

        <div style={statsStyle}>
          📽️ {MOVIES.length} Films Available • {DATASET_INFO.moodCategories.length} Mood Categories
        </div>

        <hr style={dividerStyle} />

        <Row className="g-4">
          {MOVIES.map((movie) => (
            <Col key={movie.id} sm={12} md={6} lg={4}>
              <MovieCard movie={movie} showScore={false} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

