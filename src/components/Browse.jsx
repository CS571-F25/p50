import { Container, Row, Col, Form, InputGroup, Modal, Button } from 'react-bootstrap';
import { useState, useEffect, useMemo } from "react";
import MovieCard from './MovieCard.jsx';

const ALL_CATEGORIES = ["Drama", "Comedy", "Romance", "Action", "Thriller", "Sci-Fi", "Horror", "Fantasy"];

export default function Browse() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState(null);

  // --------------------------------------------------------
  // INITIAL LOAD (Romance movies)
  // --------------------------------------------------------
  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);

        const resp = await fetch(
          `https://www.omdbapi.com/?apikey=7ce293ef&s=romance&type=movie`
        );
        const data = await resp.json();

        if (data.Response === "False") {
          setError(data.Error);
          setMovies([]);
        } else {
          const detailed = await Promise.all(
            data.Search.map(async (m) => {
              const full = await fetch(
                `https://www.omdbapi.com/?apikey=7ce293ef&i=${m.imdbID}`
              );
              return await full.json();
            })
          );
          setMovies(detailed);
        }

      } catch (err) {
        setError("Network error while fetching movies.");
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  // --------------------------------------------------------
  // SEARCH LOGIC
  // --------------------------------------------------------
  async function searchMovies(term) {
    if (term.length < 3) return;

    const resp = await fetch(
      `https://www.omdbapi.com/?apikey=7ce293ef&s=${term}&type=movie`
    );
    const data = await resp.json();

    if (data.Response === "True") {
      const detailed = await Promise.all(
        data.Search.map(async (m) => {
          const full = await fetch(
            `https://www.omdbapi.com/?apikey=7ce293ef&i=${m.imdbID}`
          );
          return await full.json();
        })
      );
      setMovies(detailed);
    } else {
      setMovies([]);
    }
  }

  // --------------------------------------------------------
  // CATEGORY FILTER
  // --------------------------------------------------------
  const filteredMovies = useMemo(() => {
    if (!categoryFilter) return movies;

    return movies.filter(movie =>
      movie.Genre?.toLowerCase().includes(categoryFilter.toLowerCase())
    );
  }, [movies, categoryFilter]);

  return (
    <>
      <Container style={{ padding: "2rem" }}>

        {/* Title */}
        <h1 style={{ color: "white", fontWeight: 700 }}>Browse Collection</h1>

        {/* Info + Category Button */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <span style={{ color: "#aaa", fontSize: "0.9rem" }}>
            📽️ {movies.length} films loaded
          </span>

          <button
            onClick={() => setShowModal(true)}
            style={{
              background: "linear-gradient(135deg, var(--neon-purple), var(--neon-blue))",
              border: "none",
              borderRadius: "12px",
              padding: "0.6rem 1.1rem",
              color: "var(--text-primary)",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            🎭 Mood Categories ({ALL_CATEGORIES.length})
          </button>
        </div>

        {/* Search Bar */}
        <Form className="mb-4">
          <InputGroup
            style={{
              background: "rgba(35, 35, 41, 0.7)",
              border: "1px solid rgba(127, 90, 240, 0.4)",
              borderRadius: "12px",
            }}
          >
            <InputGroup.Text style={{ background: "transparent", border: "none", color: "var(--neon-purple)" }}>
              🔍
            </InputGroup.Text>

            <Form.Control
              type="text"
              placeholder="Search titles..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                searchMovies(e.target.value);
              }}
              style={{ background: "transparent", border: "none", color: "white" }}
            />
          </InputGroup>
        </Form>

        {/* Movie Grid */}
        <Row className="g-4">
          {filteredMovies.map((movie) => (
            <Col key={movie.imdbID} sm={12} md={6} lg={4}>
              <MovieCard movie={movie} />
            </Col>
          ))}

          {filteredMovies.length === 0 && (
            <p style={{ color: "white", marginTop: "2rem" }}>No movies found.</p>
          )}
        </Row>
      </Container>

      {/* Category Modal */}
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
