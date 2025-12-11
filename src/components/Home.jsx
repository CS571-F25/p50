import { useMemo, useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import MoodControls from "./MoodControls.jsx";
import MovieCard from "./MovieCard.jsx";
import MovieDetail from "./MovieDetail.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";
import { MOVIES, DATASET_INFO } from "../data/movies.js";
import { DEFAULT_MOOD } from "../lib/recommend.js";
import { getRecommendationsKnnSync } from "../lib/recommendKnn.js";

export default function Home() {
  const [mood, setMood] = useState(DEFAULT_MOOD);
  const [gradientColors, setGradientColors] = useState(['#7f5af0', '#009ffd']);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useKnn, setUseKnn] = useState(true); // Toggle between KNN and old algorithm
  const [kValue, setKValue] = useState(5); // Number of recommendations

  // Use KNN algorithm for recommendations
  const ranked = useMemo(() => {
    if (!useKnn) {
      // Fallback to old algorithm if needed
      const { rankByMood } = require("../lib/recommend.js");
      return rankByMood(MOVIES, mood);
    }
    
    try {
      setError(null);
      // Use synchronous KNN for immediate updates
      const recommendations = getRecommendationsKnnSync(mood, MOVIES, kValue, 'euclidean');
      return recommendations;
    } catch (err) {
      console.error('KNN Error:', err);
      setError(err.message);
      // Fallback to empty array on error
      return [];
    }
  }, [mood, useKnn, kValue]);

  // Update gradient based on selected colors
  useEffect(() => {
    if (mood.colors.size > 0) {
      const colors = Array.from(mood.colors);
      setGradientColors(colors.length >= 2 ? colors.slice(0, 2) : [...colors, '#7f5af0']);
    } else {
      setGradientColors(['#7f5af0', '#009ffd']);
    }
  }, [mood.colors]);

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at 50% 50%, ${gradientColors[0]}15 0%, transparent 50%)`,
    pointerEvents: 'none',
    zIndex: 0,
    opacity: 0.4,
    animation: 'pulse-glow 8s ease-in-out infinite',
    transition: 'background 1s ease',
  };

  const containerStyle = {
    position: 'relative',
    zIndex: 1,
    padding: '2rem',
    minHeight: 'calc(100vh - 60px)',
  };

  const heroStyle = {
    textAlign: 'center',
    marginBottom: '3rem',
    padding: '2rem 0',
  };

  const headerStyle = {
    color: 'var(--text-primary)',
    fontWeight: '700',
    fontSize: '3rem',
    textShadow: '0 0 30px rgba(127, 90, 240, 0.8)',
    marginBottom: '1rem',
    letterSpacing: '-0.02em',
  };

  const subtitleStyle = {
    color: 'var(--text-secondary)',
    fontSize: '1.3rem',
    marginBottom: '1.5rem',
    fontWeight: '400',
    lineHeight: '1.6',
  };

  const descriptionStyle = {
    color: 'var(--text-muted)',
    fontSize: '1.05rem',
    maxWidth: '800px',
    margin: '0 auto 2rem',
    lineHeight: '1.7',
  };

  const introCardStyle = {
    background: 'rgba(35, 35, 41, 0.6)',
    backdropFilter: 'blur(12px)',
    border: '2px solid rgba(127, 90, 240, 0.4)',
    borderRadius: '16px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  };

  const instructionStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '1.5rem',
    gap: '1rem',
  };

  const stepNumberStyle = {
    background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-blue))',
    color: 'var(--text-primary)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '1.2rem',
    flexShrink: 0,
    boxShadow: '0 0 16px 4px rgba(127, 90, 240, 0.6)',
  };

  const stepContentStyle = {
    flex: 1,
  };

  const stepTitleStyle = {
    color: 'var(--neon-purple)',
    fontWeight: '600',
    fontSize: '1.1rem',
    marginBottom: '0.5rem',
    textShadow: '0 0 8px rgba(127, 90, 240, 0.5)',
  };

  const stepDescStyle = {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    lineHeight: '1.6',
  };

  const statsStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '3rem',
    marginTop: '2rem',
    flexWrap: 'wrap',
  };

  const statItemStyle = {
    textAlign: 'center',
  };

  const statNumberStyle = {
    color: 'var(--neon-purple)',
    fontSize: '2.5rem',
    fontWeight: '700',
    textShadow: '0 0 16px rgba(127, 90, 240, 0.8)',
    display: 'block',
  };

  const statLabelStyle = {
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  const sectionTitleStyle = {
    color: 'var(--neon-purple)',
    fontWeight: '700',
    fontSize: '1.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginTop: '3rem',
    marginBottom: '1.5rem',
    textShadow: '0 0 12px rgba(127, 90, 240, 0.6)',
    textAlign: 'center',
  };

  const progressBarStyle = {
    height: '4px',
    background: 'var(--surface-steel)',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '2rem',
  };

  const progressFillStyle = {
    height: '100%',
    background: `linear-gradient(90deg, ${gradientColors[0]}, ${gradientColors[1] || gradientColors[0]})`,
    boxShadow: `0 0 12px 2px ${gradientColors[0]}cc`,
    width: ranked.length > 0 ? '100%' : '0%',
    transition: 'width 0.5s ease',
  };

  const emptyStateStyle = {
    textAlign: 'center',
    padding: '4rem 2rem',
    background: 'rgba(35, 35, 41, 0.4)',
    borderRadius: '16px',
    border: '2px dashed rgba(127, 90, 240, 0.3)',
  };

  // Preset mood configurations
  const applyPreset = (presetName) => {
    let newMood;
    
    switch(presetName) {
      case 'orange-cozy':
        newMood = {
          colors: new Set(['#F59E0B']), // Orange
          descriptors: new Set(['cozy']),
          intensity: 0.2, // Low intensity
          pacing: 0.5, // Default pacing
        };
        break;
      case 'blue-mysterious':
        newMood = {
          colors: new Set(['#60A5FA']), // Blue
          descriptors: new Set(['mysterious']),
          intensity: 0.5, // Default intensity
          pacing: 0.8, // High pacing
        };
        break;
      case 'purple-surreal':
        newMood = {
          colors: new Set(['#A78BFA']), // Purple
          descriptors: new Set(['surreal']),
          intensity: 0.5, // Medium intensity
          pacing: 0.5, // Default pacing
        };
        break;
      default:
        return;
    }
    
    setMood(newMood);
  };

  const exampleMoodStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.25rem',
    background: 'rgba(127, 90, 240, 0.2)',
    border: '2px solid rgba(127, 90, 240, 0.4)',
    borderRadius: '20px',
    color: 'var(--neon-purple)',
    fontSize: '0.9rem',
    fontWeight: '500',
    margin: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    userSelect: 'none',
  };

  const exampleMoodHoverStyle = {
    ...exampleMoodStyle,
    background: 'rgba(127, 90, 240, 0.3)',
    borderColor: 'var(--neon-purple)',
    boxShadow: '0 0 16px 4px rgba(127, 90, 240, 0.4)',
    transform: 'translateY(-2px)',
  };

  return (
    <>
      <div style={overlayStyle}></div>
      <Container style={containerStyle} className="cinematic-container">
        {/* Hero Section */}
        <div style={heroStyle}>
          <h1 style={headerStyle} className="neon-header">
            🎬 Discover Your Cinematic Vibe
          </h1>
          <p style={subtitleStyle}>
            Stop searching by genre. Start feeling your way to the perfect film.
          </p>
          <p style={descriptionStyle}>
            CineVibe transforms movie discovery into an emotional experience. 
            Express your current mood through colors, vibes, and energy levels — 
            and watch as our algorithm instantly curates films that match your exact atmosphere.
          </p>

          {/* Stats */}
          <div style={statsStyle}>
            <div style={statItemStyle}>
              <span style={statNumberStyle}>{DATASET_INFO.totalMovies}+</span>
              <span style={statLabelStyle}>Films</span>
            </div>
            <div style={statItemStyle}>
              <span style={statNumberStyle}>{DATASET_INFO.moodCategories.length}</span>
              <span style={statLabelStyle}>Mood Categories</span>
            </div>
            <div style={statItemStyle}>
              <span style={statNumberStyle}>∞</span>
              <span style={statLabelStyle}>Vibe Combinations</span>
            </div>
          </div>
        </div>

        {/* Instructions - Always visible */}
        <Card style={introCardStyle} className="glass-panel">
            <h2 style={{ 
              ...sectionTitleStyle, 
              marginTop: 0, 
              marginBottom: '2rem',
              fontSize: '1.3rem' 
            }}>
              ✨ How It Works
            </h2>

            <Row>
              <Col md={6}>
                <div style={instructionStyle}>
                  <div style={stepNumberStyle}>1</div>
                  <div style={stepContentStyle}>
                    <div style={stepTitleStyle}>Choose Your Colors</div>
                    <div style={stepDescStyle}>
                      Select colors that represent the visual tone you're craving. 
                      Warm oranges for cozy vibes, cool blues for mystery, vibrant purples for surreal experiences.
                    </div>
                  </div>
                </div>
              </Col>

              <Col md={6}>
                <div style={instructionStyle}>
                  <div style={stepNumberStyle}>2</div>
                  <div style={stepContentStyle}>
                    <div style={stepTitleStyle}>Pick Your Vibes</div>
                    <div style={stepDescStyle}>
                      Add descriptive keywords that capture the mood you want: 
                      cozy, melancholic, mysterious, upbeat, gritty, surreal, romantic, or darkly comedic.
                    </div>
                  </div>
                </div>
              </Col>

              <Col md={6}>
                <div style={instructionStyle}>
                  <div style={stepNumberStyle}>3</div>
                  <div style={stepContentStyle}>
                    <div style={stepTitleStyle}>Adjust Intensity & Pacing</div>
                    <div style={stepDescStyle}>
                      Fine-tune your mood with sliders. High intensity for edge-of-your-seat thrillers, 
                      slower pacing for contemplative dramas.
                    </div>
                  </div>
                </div>
              </Col>

              <Col md={6}>
                <div style={instructionStyle}>
                  <div style={stepNumberStyle}>4</div>
                  <div style={stepContentStyle}>
                    <div style={stepTitleStyle}>Instant Recommendations</div>
                    <div style={stepDescStyle}>
                      Watch recommendations appear in real-time, ranked by how well they match your exact vibe. 
                      Each film gets a score based on your mood board.
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <div style={{ 
              marginTop: '2rem', 
              padding: '1.5rem', 
              background: 'rgba(127, 90, 240, 0.1)',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ 
                color: 'var(--text-primary)', 
                fontSize: '1rem',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                💡 Try these mood combinations:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => applyPreset('orange-cozy')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      applyPreset('orange-cozy');
                    }
                  }}
                  style={exampleMoodStyle}
                  onMouseEnter={(e) => {
                    Object.assign(e.target.style, exampleMoodHoverStyle);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.target.style, exampleMoodStyle);
                  }}
                  aria-label="Apply preset: Orange color, Cozy vibe, Low intensity"
                  title="Click to apply this mood preset"
                >
                  🟠 Orange + Cozy + Low Intensity
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('blue-mysterious')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      applyPreset('blue-mysterious');
                    }
                  }}
                  style={exampleMoodStyle}
                  onMouseEnter={(e) => {
                    Object.assign(e.target.style, exampleMoodHoverStyle);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.target.style, exampleMoodStyle);
                  }}
                  aria-label="Apply preset: Blue color, Mysterious vibe, High pacing"
                  title="Click to apply this mood preset"
                >
                  🔵 Blue + Mysterious + High Pacing
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('purple-surreal')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      applyPreset('purple-surreal');
                    }
                  }}
                  style={exampleMoodStyle}
                  onMouseEnter={(e) => {
                    Object.assign(e.target.style, exampleMoodHoverStyle);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.target.style, exampleMoodStyle);
                  }}
                  aria-label="Apply preset: Purple color, Surreal vibe, Medium intensity"
                  title="Click to apply this mood preset"
                >
                  🟣 Purple + Surreal + Medium Intensity
                </button>
              </div>
            </div>
          </Card>

        {/* Mood Board Controls */}
        <h2 style={sectionTitleStyle}>
          🎨 Create Your Mood Board
        </h2>
        <MoodControls
          mood={mood}
          onChange={(next) => setMood(next)}
        />

        {/* Progress Indicator */}
        <div style={progressBarStyle} className="neon-progress">
          <div style={progressFillStyle} className="neon-progress-bar"></div>
          </div>

        {/* Results Section */}
        <h2 style={sectionTitleStyle}>
          {ranked.length > 0 ? `🎯 Your Top ${ranked.length} Matches` : '🎯 Your Personalized Recommendations'}
        </h2>

        {/* Error Display */}
        {error && (
          <div style={{
            background: 'rgba(215, 38, 61, 0.2)',
            border: '2px solid var(--neon-crimson)',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1.5rem',
            color: 'var(--neon-crimson)',
          }}>
            <strong>⚠️ Error:</strong> {error}
            <button
              onClick={() => setError(null)}
              style={{
                marginLeft: '1rem',
                padding: '0.25rem 0.75rem',
                background: 'var(--neon-crimson)',
                border: 'none',
                borderRadius: '6px',
                color: 'var(--text-primary)',
                cursor: 'pointer',
              }}
            >
              Dismiss
            </button>
          </div>
        )}
        
        {/* Loading State */}
        {isLoading && (
          <div style={{ marginBottom: '2rem' }}>
            <LoadingSpinner message="Finding your perfect cinematic matches..." />
          </div>
        )}
        
        <Row className="g-4">
          {!isLoading && ranked.map((movie) => (
            <Col key={movie.id} sm={12} md={6}>
              <MovieCard 
                movie={movie} 
                showScore={true} 
                onClick={(m) => {
                  setSelectedMovie(m);
                  setShowDetail(true);
                }}
              />
            </Col>
        ))}
          {!isLoading && ranked.length === 0 && (
            <Col>
              <div style={emptyStateStyle}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎬</div>
                <h3 style={{ 
                  color: 'var(--text-primary)', 
                  marginBottom: '1rem',
                  fontSize: '1.5rem'
                }}>
                  Your Cinematic Journey Awaits
                </h3>
                <p style={{ 
                  color: 'var(--text-muted)',
                  fontSize: '1.1rem',
                  marginBottom: '2rem',
                  maxWidth: '600px',
                  margin: '0 auto 2rem'
                }}>
                  Start by selecting colors and vibes above to create your unique mood board.
                  <br />
                  Your personalized film recommendations will appear here instantly as you craft your vibe.
                </p>
                <div style={{ 
                  color: 'var(--neon-blue)',
                  fontSize: '0.95rem',
                  fontWeight: '500'
                }}>
                  👆 Begin by clicking colors or vibes in the mood board above
      </div>
    </div>
            </Col>
          )}
        </Row>

        {/* Tips for results */}
        {ranked.length > 0 && (
          <div style={{ 
            marginTop: '3rem', 
            padding: '1.5rem',
            background: 'rgba(35, 35, 41, 0.4)',
            borderRadius: '12px',
            border: '1px solid rgba(127, 90, 240, 0.2)',
            textAlign: 'center'
          }}>
            <p style={{ 
              color: 'var(--text-secondary)',
              margin: 0,
              fontSize: '0.95rem'
            }}>
              💡 <strong style={{ color: 'var(--neon-purple)' }}>Pro Tip:</strong> Adjust your mood board 
              to see recommendations update in real-time. The score shows how closely each film matches your vibe.
            </p>
          </div>
        )}

        <MovieDetail 
          movie={selectedMovie} 
          show={showDetail} 
          onHide={() => {
            setShowDetail(false);
            setSelectedMovie(null);
          }} 
        />
      </Container>
    </>
  );
}
