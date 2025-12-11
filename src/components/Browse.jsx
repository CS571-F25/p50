import { Container, Row, Col, Form, InputGroup, Modal, Button } from 'react-bootstrap';
import { MOVIES, DATASET_INFO } from '../data/movies.js';
import MovieCard from './MovieCard.jsx';
import { useState, useMemo } from "react";

// Extract mood categories directly from dataset
const ALL_CATEGORIES = DATASET_INFO.moodCategories;

export default function Browse() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
    cursor: "pointer",
  };

  const dividerStyle = {
    height: '2px',
    background: 'linear-gradient(90deg, transparent 0%, var(--neon-blue) 50%, transparent 100%)',
    border: 'none',
    margin: '2rem 0',
    opacity: '0.5',
  };

  // -----------------------------
  //        FILTERING LOGIC
  // -----------------------------
  const filteredMovies = useMemo(() => {
    const lower = searchTerm.toLowerCase();

    return MOVIES.filter(movie => {
      const matchesSearch =
        movie.title.toLowerCase().includes(lower) ||
        movie.tags.some(tag => tag.toLowerCase().includes(lower));

      const matchesCategory =
        categoryFilter ? movie.tags.includes(categoryFilter) : true;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  return (
    <>
      <div style={overlayStyle}></div>
      <Container style={containerStyle} className="cinematic-container">

        {/* Page Title */}
        <h1 style={headerStyle} className="neon-header">
          Browse Collection
        </h1>
        <p style={subtitleStyle}>
          Explore our handpicked selection of cinematic experiences
        </p>

        {/* Info + Category Button Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "2rem"
          }}
        >

          {/* SUBTLE TEXT NOTE — NOT A BUTTON */}
          <span
            style={{
              color: "var(--text-muted)",
              fontSize: "0.9rem",
              opacity: 0.8,
              userSelect: "none"
            }}
          >
            📽️ {MOVIES.length} films available
          </span>

          {/* CLEAR CLICKABLE BUTTON */}
          <button
            onClick={() => setShowModal(true)}
            style={{
              background: "linear-gradient(135deg, var(--neon-purple), var(--neon-blue))",
              border: "none",
              borderRadius: "12px",
              padding: "0.6rem 1.1rem",
              color: "var(--text-primary)",
              fontWeight: "700",
              fontSize: "0.95rem",
              cursor: "pointer",
              boxShadow: "0 0 12px rgba(127, 90, 240, 0.5)",
              transition: "all 0.3s ease",
              textTransform: "capitalize"
            }}
          >
            🎭 Mood Categories ({ALL_CATEGORIES.length})
          </button>

        </div>



        {/* DARK THEME SEARCH BAR */}
        <Form className="mb-4">
          <Form.Group controlId="searchMovies">
            <Form.Label className="visually-hidden">Search movies</Form.Label>

            <InputGroup
              style={{
                background: "rgba(35, 35, 41, 0.7)",
                border: "1px solid rgba(127, 90, 240, 0.4)",
                borderRadius: "12px",
                boxShadow: "0 0 12px rgba(127, 90, 240, 0.2)",
                overflow: "hidden",
                backdropFilter: "blur(6px)",
              }}
            >
              {/* Icon Box */}
              <InputGroup.Text
                style={{
                  background: "rgba(26, 26, 36, 0.8)",
                  border: "none",
                  color: "var(--neon-purple)",
                  fontSize: "1.2rem",
                  padding: "0.6rem 0.9rem",
                }}
              >
                🔍
              </InputGroup.Text>

              {/* Dark Input Field */}
              <Form.Control
                type="text"
                placeholder="Search by title or vibe..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search movies"
                style={{
                  background: "rgba(26, 26, 36, 0.8)",
                  border: "none",
                  color: "var(--text-primary)",
                  padding: "0.75rem 1rem",
                  fontSize: "1rem",
                  boxShadow: "none",
                }}
              />

            </InputGroup>
          </Form.Group>
        </Form>


        {/* CATEGORY FILTER TAG */}
        {categoryFilter && (
          <div style={{ marginBottom: "1rem", color: "var(--text-primary)" }}>
            Filtering by:
            <span
              style={{
                marginLeft: "0.5rem",
                padding: "0.3rem 0.7rem",
                background: "rgba(127, 90, 240, 0.3)",
                borderRadius: "12px",
                cursor: "pointer",
              }}
              onClick={() => setCategoryFilter(null)}
            >
              {categoryFilter} ❌
            </span>
          </div>
        )}

        <hr style={dividerStyle} />

        {/* Movie Grid */}
        <Row className="g-4">
          {filteredMovies.map((movie) => (
            <Col key={movie.id} sm={12} md={6} lg={4}>
              <MovieCard movie={movie} showScore={false} />
            </Col>
          ))}

          {filteredMovies.length === 0 && (
            <Col>
              <div style={{
                textAlign: "center",
                padding: "3rem",
                background: "rgba(35,35,41,0.4)",
                borderRadius: "12px",
                color: "var(--text-secondary)"
              }}>
                <h3 style={{ color: "var(--text-primary)" }}>No matches found</h3>
                <p>Try another search term or remove filters.</p>
              </div>
            </Col>
          )}
        </Row>
      </Container>

      {/* CATEGORY POPUP MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select a Mood Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-wrap" style={{ gap: "0.5rem" }}>
            {ALL_CATEGORIES.map(cat => (
              <Button
                key={cat}
                variant="outline-primary"
                onClick={() => {
                  setCategoryFilter(cat);
                  setShowModal(false);
                }}
                style={{ borderRadius: "20px", textTransform: "capitalize" }}
              >
                {cat}
              </Button>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
