import { Modal, Button, Row, Col, Badge } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function MovieDetail({ movie, show, onHide }) {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(movie?.poster || '');

  // Reset image state when movie changes
  useEffect(() => {
    if (movie) {
      setImageError(false);
      setImageSrc(movie.poster);
    }
  }, [movie?.poster]);

  const handleImageError = () => {
    if (!imageError && movie) {
      setImageError(true);
      const originalUrl = movie.poster;
      if (originalUrl && originalUrl.includes('/w500/')) {
        // Try smaller size
        const smallerUrl = originalUrl.replace('/w500/', '/w300/');
        setImageSrc(smallerUrl);
      } else {
        // Use placeholder as final fallback
        setImageSrc(`https://via.placeholder.com/500x750/232329/7f5af0?text=${encodeURIComponent(movie.title.substring(0, 20))}`);
      }
    } else if (movie) {
      // If already tried fallback, use placeholder
      setImageSrc(`https://via.placeholder.com/500x750/232329/7f5af0?text=${encodeURIComponent(movie.title.substring(0, 20))}`);
    }
  };

  if (!movie) return null;

  const modalContentStyle = {
    background: 'linear-gradient(135deg, rgba(35, 35, 41, 0.95), rgba(26, 26, 36, 0.95))',
    color: 'var(--text-primary)',
  };

  const headerStyle = {
    background: 'rgba(17, 17, 19, 0.9)',
    borderBottom: '2px solid rgba(127, 90, 240, 0.4)',
    color: 'var(--text-primary)',
  };

  const tagStyle = {
    background: 'rgba(127, 90, 240, 0.2)',
    color: 'var(--neon-purple)',
    border: '1px solid rgba(127, 90, 240, 0.4)',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: '500',
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
    display: 'inline-block',
  };

  const statLabelStyle = {
    color: 'var(--text-muted)',
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.25rem',
  };

  const statValueStyle = {
    color: 'var(--neon-purple)',
    fontSize: '1.2rem',
    fontWeight: '700',
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      size="lg"
      contentClassName="movie-detail-modal"
      style={modalContentStyle}
      aria-labelledby="movie-detail-title"
      aria-describedby="movie-detail-description"
    >
      <Modal.Header closeButton style={headerStyle}>
        <Modal.Title id="movie-detail-title" style={{ 
          color: 'var(--text-primary)',
          fontWeight: '700',
          fontSize: '1.8rem'
        }}>
          {movie.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalContentStyle}>
        <Row>
          <Col md={4}>
            <img 
              src={imageSrc} 
              alt={`${movie.title} movie poster`}
              style={{
                width: '100%',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
                marginBottom: '1.5rem',
              }}
              onError={handleImageError}
            />
            <div style={{ marginTop: '1rem' }}>
              <div style={statLabelStyle}>Mood Score</div>
              {movie._score !== undefined && (
                <div style={statValueStyle}>{movie._score.toFixed(2)}</div>
              )}
            </div>
          </Col>
          <Col md={8}>
            <div id="movie-detail-description">
              <h3 style={{ 
                color: 'var(--neon-purple)',
                fontSize: '1.3rem',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                Mood Profile
              </h3>
              <div style={{ marginBottom: '2rem' }}>
                {movie.tags.map((tag, index) => (
                  <span key={index} style={tagStyle}>
                    {tag}
                  </span>
                ))}
              </div>

              <Row className="mb-3">
                <Col xs={4}>
                  <div style={statLabelStyle}>Hue</div>
                  <div style={statValueStyle}>{movie.hue}°</div>
                </Col>
                <Col xs={4}>
                  <div style={statLabelStyle}>Tempo</div>
                  <div style={statValueStyle}>{(movie.tempo * 100).toFixed(0)}%</div>
                </Col>
                <Col xs={4}>
                  <div style={statLabelStyle}>Edge</div>
                  <div style={statValueStyle}>{(movie.edge * 100).toFixed(0)}%</div>
                </Col>
              </Row>

              <div style={{
                background: 'rgba(127, 90, 240, 0.1)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid rgba(127, 90, 240, 0.3)',
              }}>
                <p style={{ 
                  color: 'var(--text-secondary)',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  This film matches your selected mood through its {movie.tags.join(', ')} characteristics. 
                  The visual tone, pacing, and intensity align with your current vibe preferences.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer style={headerStyle}>
        <Button 
          variant="secondary" 
          onClick={onHide}
          style={{
            background: 'var(--surface-steel)',
            border: 'none',
            color: 'var(--text-primary)',
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

