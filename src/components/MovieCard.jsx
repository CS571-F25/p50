import { useState, useEffect } from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';

export default function MovieCard({ movie, showScore = false, onClick }) {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(movie.poster);

  // Reset image state when movie changes
  useEffect(() => {
    setImageError(false);
    setImageSrc(movie.poster);
  }, [movie.poster]);

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      // Try alternative: use w300 size instead of w500, or placeholder
      const originalUrl = movie.poster;
      if (originalUrl && originalUrl.includes('/w500/')) {
        // Try smaller size
        const smallerUrl = originalUrl.replace('/w500/', '/w300/');
        setImageSrc(smallerUrl);
      } else {
        // Use placeholder as final fallback
        setImageSrc(`https://via.placeholder.com/500x750/232329/7f5af0?text=${encodeURIComponent(movie.title.substring(0, 20))}`);
      }
    } else {
      // If already tried fallback, use placeholder
      setImageSrc(`https://via.placeholder.com/500x750/232329/7f5af0?text=${encodeURIComponent(movie.title.substring(0, 20))}`);
    }
  };
  const cardStyle = {
    background: 'linear-gradient(135deg, rgba(35, 35, 41, 0.9), rgba(26, 26, 36, 0.9))',
    border: '1px solid var(--surface-steel)',
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    position: 'relative',
  };

  const posterStyle = {
    width: '120px',
    height: '180px',
    objectFit: 'cover',
    borderTopLeftRadius: '12px',
    borderBottomLeftRadius: '12px',
    boxShadow: '4px 0 12px rgba(0, 0, 0, 0.5)',
  };

  const titleStyle = {
    color: 'var(--text-primary)',
    fontWeight: '700',
    fontSize: '1.1rem',
    marginBottom: '0.5rem',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
  };

  const scoreStyle = {
    background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-blue))',
    color: 'var(--text-primary)',
    fontWeight: '700',
    fontSize: '0.9rem',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    boxShadow: '0 0 12px 2px rgba(127, 90, 240, 0.6)',
    minWidth: '50px',
    textAlign: 'center',
  };

  const tagStyle = {
    background: 'rgba(127, 90, 240, 0.2)',
    color: 'var(--neon-purple)',
    border: '1px solid rgba(127, 90, 240, 0.4)',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '500',
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
    display: 'inline-block',
    transition: 'all 0.3s ease',
  };

  const handleClick = () => {
    if (onClick) onClick(movie);
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault();
      onClick(movie);
    }
  };

  return (
    <Card 
      className="movie-card h-100" 
      style={cardStyle}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : -1}
      role={onClick ? "button" : undefined}
      aria-label={onClick ? `View details for ${movie.title}` : undefined}
    >
      <Row className="g-0 h-100">
        <Col xs="auto">
          <Card.Img
            src={imageSrc}
            alt={`${movie.title} movie poster`}
            style={posterStyle}
            loading="lazy"
            onError={handleImageError}
          />
        </Col>
        <Col>
          <Card.Body className="py-3 px-3">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <Card.Title style={titleStyle} className="mb-0">
                {movie.title}
              </Card.Title>
              {showScore && (movie._score !== undefined || movie._similarity !== undefined) && (
                <div style={scoreStyle} title={`Match: ${(movie._similarity * 100 || movie._score || 0).toFixed(1)}%`}>
                  {movie._score !== undefined 
                    ? movie._score.toFixed(1) 
                    : (movie._similarity * 100).toFixed(1)}%
                </div>
              )}
            </div>
            <div className="mt-2">
              {movie.tags.map((tag, index) => (
                <span key={index} style={tagStyle} className="mood-tag">
                  {tag}
                </span>
              ))}
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

