import { useState, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MOVIES, DATASET_INFO } from '../data/movies.js';
import MovieCard from './MovieCard.jsx';
import MovieDetail from './MovieDetail.jsx';
import SearchBar from './SearchBar.jsx';

export default function Browse() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const filteredMovies = useMemo(() => {
    if (!searchTerm.trim()) return MOVIES;
    const term = searchTerm.toLowerCase();
    return MOVIES.filter(movie => 
      movie.title.toLowerCase().includes(term) ||
      movie.tags.some(tag => tag.toLowerCase().includes(term))
    );
  }, [searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedMovie(null);
  };
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
          📽️ {filteredMovies.length} {filteredMovies.length === MOVIES.length ? 'Films' : 'Results'} Available • {DATASET_INFO.moodCategories.length} Mood Categories
        </div>

        <div style={{ marginBottom: '2rem', maxWidth: '600px' }}>
          <SearchBar onSearch={handleSearch} placeholder="Search by title or mood..." />
        </div>

        <hr style={dividerStyle} />

        {filteredMovies.length > 0 ? (
          <Row className="g-4">
            {filteredMovies.map((movie) => (
              <Col key={movie.id} sm={12} md={6} lg={4}>
                <MovieCard 
                  movie={movie} 
                  showScore={false} 
                  onClick={handleMovieClick}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem',
            color: 'var(--text-muted)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
              No movies found
            </h2>
            <p>Try a different search term or browse all movies.</p>
          </div>
        )}

        <MovieDetail 
          movie={selectedMovie} 
          show={showDetail} 
          onHide={handleCloseDetail} 
        />
      </Container>
    </>
  );
}

