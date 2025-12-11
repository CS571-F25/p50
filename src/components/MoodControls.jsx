import Chip from "./Chip.jsx";
import { Button } from "react-bootstrap";

const COLORS = ["#FF6B6B","#F59E0B","#34D399","#60A5FA","#A78BFA","#F472B6","#9CA3AF"];
const DESCRIPTORS = ["cozy","melancholic","upbeat","mysterious","gritty","surreal","romantic","dark comedy"];

export default function MoodControls({ mood, onChange }) {
  const hasSelections = mood.colors.size > 0 || mood.descriptors.size > 0 || mood.intensity !== 0.5 || mood.pacing !== 0.5;

  const handleClear = () => {
    onChange({
      colors: new Set(),
      descriptors: new Set(),
      intensity: 0.5,
      pacing: 0.5,
    });
  };
  const toggleColor = (c) => {
    const next = new Set(mood.colors);
    next.has(c) ? next.delete(c) : next.add(c);
    onChange({ ...mood, colors: next });
  };

  const toggleDesc = (d) => {
    const next = new Set(mood.descriptors);
    next.has(d) ? next.delete(d) : next.add(d);
    onChange({ ...mood, descriptors: next });
  };

  const panelStyle = {
    background: 'rgba(35, 35, 41, 0.7)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '2px solid rgba(127, 90, 240, 0.4)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 16px 4px rgba(127, 90, 240, 0.3)',
    borderRadius: '16px',
    padding: '1.5rem',
    transition: 'all 0.3s ease',
  };

  const sectionTitleStyle = {
    color: 'var(--neon-purple)',
    fontWeight: '700',
    fontSize: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '1rem',
    textShadow: '0 0 10px rgba(127, 90, 240, 0.5)',
  };

  const colorButtonStyle = (color, selected) => ({
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    border: selected ? `3px solid var(--text-primary)` : '3px solid transparent',
    backgroundColor: color,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: selected ? `0 0 16px 4px ${color}` : '0 2px 8px rgba(0, 0, 0, 0.3)',
    marginRight: '0.75rem',
    marginBottom: '0.75rem',
    position: 'relative',
    transform: selected ? 'scale(1.1)' : 'scale(1)',
  });

  const sliderContainerStyle = {
    position: 'relative',
  };

  const sliderLabelStyle = {
    color: 'var(--text-primary)',
    fontWeight: '600',
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const sliderValueStyle = {
    color: 'var(--neon-blue)',
    fontWeight: '700',
    textShadow: '0 0 8px rgba(0, 159, 253, 0.8)',
  };

  const dividerStyle = {
    height: '2px',
    background: 'linear-gradient(90deg, transparent 0%, var(--neon-purple) 50%, transparent 100%)',
    border: 'none',
    margin: '1.5rem 0',
    opacity: '0.5',
  };

  const handleColorKeyDown = (e, color) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleColor(color);
    }
  };

  const clearButtonStyle = {
    background: hasSelections 
      ? 'linear-gradient(135deg, var(--neon-crimson), rgba(215, 38, 61, 0.8))' 
      : 'rgba(35, 35, 41, 0.6)',
    border: hasSelections ? '2px solid var(--neon-crimson)' : '2px solid rgba(127, 90, 240, 0.3)',
    color: hasSelections ? 'var(--text-primary)' : 'var(--text-muted)',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: hasSelections ? 'pointer' : 'not-allowed',
    transition: 'all 0.3s ease',
    opacity: hasSelections ? 1 : 0.5,
    boxShadow: hasSelections ? '0 0 12px 2px rgba(215, 38, 61, 0.4)' : 'none',
  };

  return (
    <div className="glass-panel" style={panelStyle} role="region" aria-label="Mood board controls">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={sectionTitleStyle} id="mood-palette-heading">🎨 Mood Palette</h2>
        {hasSelections && (
          <Button
            type="button"
            onClick={handleClear}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && hasSelections) {
                e.preventDefault();
                handleClear();
              }
            }}
            style={clearButtonStyle}
            onMouseEnter={(e) => {
              if (hasSelections) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 0 16px 4px rgba(215, 38, 61, 0.6)';
              }
            }}
            onMouseLeave={(e) => {
              if (hasSelections) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 0 12px 2px rgba(215, 38, 61, 0.4)';
              }
            }}
            aria-label="Clear all mood selections"
            title="Reset mood board to default"
            tabIndex={hasSelections ? 0 : -1}
          >
            🗑️ Clear All
          </Button>
        )}
      </div>
      
      <div role="group" aria-labelledby="colors-heading">
        <h3 style={sectionTitleStyle} className="mt-3" id="colors-heading">Colors</h3>
        <div className="d-flex flex-wrap mb-3" role="group" aria-label="Color selection">
          {COLORS.map(c => (
            <button
              key={c}
              type="button"
              onClick={() => toggleColor(c)}
              onKeyDown={(e) => handleColorKeyDown(e, c)}
              className="color-selector"
              style={colorButtonStyle(c, mood.colors.has(c))}
              aria-label={`Select color ${c}`}
              aria-pressed={mood.colors.has(c)}
              title={`Select color ${c}`}
              tabIndex={0}
            />
          ))}
        </div>
      </div>

      <hr style={dividerStyle} />

      <div role="group" aria-labelledby="vibes-heading">
        <h3 style={sectionTitleStyle} id="vibes-heading">Vibes</h3>
        <div className="d-flex flex-wrap mb-3" role="group" aria-label="Mood descriptor selection">
          {DESCRIPTORS.map(d => (
            <Chip 
              key={d} 
              label={d} 
              selected={mood.descriptors.has(d)} 
              onClick={() => toggleDesc(d)} 
            />
          ))}
        </div>
      </div>

      <hr style={dividerStyle} />

      <div className="row mt-3" role="group" aria-label="Mood intensity and pacing controls">
        <div className="col-md-6 mb-3" style={sliderContainerStyle}>
          <label htmlFor="intensity-slider" className="form-label" style={sliderLabelStyle}>
            <span>⚡ Intensity</span>
            <span style={sliderValueStyle} aria-live="polite" aria-atomic="true">
              {(mood.intensity * 100).toFixed(0)}%
            </span>
          </label>
          <input
            id="intensity-slider"
            type="range" 
            min="0" 
            max="1" 
            step="0.01"
            value={mood.intensity}
            className="form-range"
            onChange={(e) => onChange({ ...mood, intensity: Number(e.target.value) })}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const step = e.shiftKey ? 0.1 : 0.01;
                const newValue = e.key === 'ArrowLeft' 
                  ? Math.max(0, mood.intensity - step)
                  : Math.min(1, mood.intensity + step);
                onChange({ ...mood, intensity: Number(newValue.toFixed(2)) });
              }
            }}
            style={{ cursor: 'pointer' }}
            aria-label="Intensity slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(mood.intensity * 100)}
            aria-valuetext={`${Math.round(mood.intensity * 100)} percent`}
          />
        </div>
        <div className="col-md-6 mb-3" style={sliderContainerStyle}>
          <label htmlFor="pacing-slider" className="form-label" style={sliderLabelStyle}>
            <span>🎬 Pacing</span>
            <span style={sliderValueStyle} aria-live="polite" aria-atomic="true">
              {(mood.pacing * 100).toFixed(0)}%
            </span>
          </label>
          <input
            id="pacing-slider"
            type="range" 
            min="0" 
            max="1" 
            step="0.01"
            value={mood.pacing}
            className="form-range"
            onChange={(e) => onChange({ ...mood, pacing: Number(e.target.value) })}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const step = e.shiftKey ? 0.1 : 0.01;
                const newValue = e.key === 'ArrowLeft' 
                  ? Math.max(0, mood.pacing - step)
                  : Math.min(1, mood.pacing + step);
                onChange({ ...mood, pacing: Number(newValue.toFixed(2)) });
              }
            }}
            style={{ cursor: 'pointer' }}
            aria-label="Pacing slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(mood.pacing * 100)}
            aria-valuetext={`${Math.round(mood.pacing * 100)} percent`}
          />
        </div>
      </div>
    </div>
  );
}
