import { useMemo, useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import MoodControls from "./MoodControls.jsx";
import MovieCard from "./MovieCard.jsx";

// --- Simple scorer that works with IMDb dataset ---
function scoreMovieByMood(movie, mood) {
  let score = 0;

  // Match mood descriptors to movie Plot
  mood.descriptors.forEach(desc => {
    if (movie.Plot?.toLowerCase().includes(desc.toLowerCase())) {
      score += 1.5;
    }
  });

  // Match colors loosely to genre tone
  const colorGenreMap = {
    purple: ["fantasy", "sci-fi", "surreal"],
    blue: ["mystery", "drama", "thriller"],
    orange: ["romance", "family", "comedy"],
    red: ["action", "horror"]
  };

  mood.colors.forEach(color => {
    const g = movie.Genre?.toLowerCase() || "";
    if (colorGenreMap[color]?.some(x => g.includes(x))) {
      score += 1.2;
    }
  });

  return score;
}

export default function Home() {
  const [mood, setMood] = useState({
    colors: new Set(),
    descriptors: new Set(),
  });

  const [gradientColors, setGradientColors] = useState(['#7f5af0', '#009ffd']);
  const [showIntro, setShowIntro] = useState(true);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // Load initial movies (romance)
  // -----------------------------
  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);

        const req = await fetch(
          `https://www.omdbapi.com/?apikey=7ce293ef&s=romance&type=movie`
        );
        const data = await req.json();

        if (data.Response === "True") {
          const details = await Promise.all(
            data.Search.map(async (m) => {
              const full = await fetch(
                `https://www.omdbapi.com/?apikey=7ce293ef&i=${m.imdbID}`
              );
              return await full.json();
            })
          );

          setMovies(details);
        } else {
          setMovies([]);
        }
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  // -------------------------------------
  // Score and rank movies by user's mood
  // -------------------------------------
  const ranked = useMemo(() => {
    return movies
      .map(m => ({
        ...m,
        _score: scoreMovieByMood(m, mood)
      }))
      .sort((a, b) => b._score - a._score);
  }, [movies, mood]);

  // -------------------------------------
  // Hide intro after user interacts
  // -------------------------------------
  useEffect(() => {
    if (mood.colors.size > 0 || mood.descriptors.size > 0) {
      setShowIntro(false);
    }
  }, [mood]);

  return (
    <>
      <Container style={{ padding: "2rem" }}>

        {/* Header */}
        <h1 style={{ color: "white", fontWeight: 700, textAlign: "center" }}>
          🎬 Discover Your Cinematic Vibe
        </h1>

        {/* Mood Controls */}
        <MoodControls mood={mood} onChange={setMood} />

        {/* Results */}
        <h2 style={{ color: "white", marginTop: "2rem", textAlign: "center" }}>
          {ranked.length > 0 ? `🎯 Top Matches` : "Start by choosing your mood"}
        </h2>

        <Row className="g-4">
          {ranked.map((movie) => (
            <Col key={movie.imdbID} sm={12} md={6}>
              <MovieCard movie={movie} showScore={true} />
            </Col>
          ))}
        </Row>

      </Container>
    </>
  );
}
