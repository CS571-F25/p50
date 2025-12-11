import Chip from "./Chip.jsx";
import { Button } from "react-bootstrap";

const COLORS = ["#FF6B6B", "#F59E0B", "#34D399", "#60A5FA", "#A78BFA", "#F472B6", "#9CA3AF"];
const DESCRIPTORS = ["cozy", "melancholic", "upbeat", "mysterious", "gritty", "surreal", "romantic", "dark comedy"];

export default function MoodControls({ mood, onChange }) {
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

  // -----------------------------
  // Determine whether to show "Clear All"
  // -----------------------------
  const hasSelections =
    mood.colors.size > 0 ||
    mood.descriptors.size > 0 ||
    (mood.intensity ?? 0.5) !== 0.5 ||
    (mood.pacing ?? 0.5) !== 0.5;

  const handleClear = () => {
    onChange({
      ...mood,
      colors: new Set(),
      descriptors: new Set(),
      intensity: 0.5,
      pacing: 0.5,
    });
  };

  // -----------------------------
  // Styles
  // -----------------------------
  const panelStyle = {
    background: 'rgba(35, 35, 41, 0.7)',
    border: '2px solid rgba(127, 90, 240, 0.4)',
    borderRadius: '16px',
    padding: '1.5rem',
  };

  const sectionTitleStyle = {
    color: 'var(--neon-purple)',
    fontWeight: 700,
    marginBottom: '1rem',
  };

  const colorButtonStyle = (color, selected) => ({
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    border: selected ? '3px solid var(--text-primary)' : '3px solid transparent',
    backgroundColor: color,
    cursor: 'pointer',
    marginRight: '0.75rem',
    marginBottom: '0.75rem',
  });

  const sliderContainerStyle = { position: 'relative' };

  const sliderLabelStyle = {
    color: 'var(--text-primary)',
    fontWeight: '600',
    marginBottom: '0.5rem',
    display: 'flex',
    justifyContent: 'space-between',
  };

  const sliderValueStyle = {
    color: 'var(--neon-blue)',
    fontWeight: '700',
  };

  const dividerStyle = {
    height: '2px',
    background: 'linear-gradient(90deg, transparent, var(--neon-purple), transparent)',
    border: 'none',
    margin: '1.5rem 0',
    opacity: 0.5,
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
    opacity: hasSelections ? 1 : 0.5,
    marginBottom: '1rem',
  };

  return (
    <div className="glass-panel" style={panelStyle}>
      <h3 style={sectionTitleStyle}>🎨 Mood Palette</h3>

      {/* CLEAR ALL BUTTON */}
      <button
        type="button"
        onClick={handleClear}
        disabled={!hasSelections}
        style={clearButtonStyle}
      >
        🗑️ Clear All
      </button>

      {/* COLOR SELECTOR */}
      <h4 style={sectionTitleStyle}>Colors</h4>
      <div className="d-flex flex-wrap mb-3">
        {COLORS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => toggleColor(c)}
            style={colorButtonStyle(c, mood.colors.has(c))}
            aria-label={`Select color ${c}`}
          />
        ))}
      </div>

      <hr style={dividerStyle} />

      {/* DESCRIPTORS */}
      <h4 style={sectionTitleStyle}>Vibes</h4>
      <div className="d-flex flex-wrap mb-3">
        {DESCRIPTORS.map((d) => (
          <Chip
            key={d}
            label={d}
            selected={mood.descriptors.has(d)}
            onClick={() => toggleDesc(d)}
          />
        ))}
      </div>

      <hr style={dividerStyle} />

      {/* SLIDERS */}
      <div className="row mt-3">
        <div className="col-md-6 mb-3" style={sliderContainerStyle}>
          <label className="form-label" style={sliderLabelStyle}>
            ⚡ Intensity
            <span style={sliderValueStyle}>{((mood.intensity ?? 0.5) * 100).toFixed(0)}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={mood.intensity ?? 0.5}
            onChange={(e) => onChange({ ...mood, intensity: Number(e.target.value) })}
            className="form-range"
          />
        </div>

        <div className="col-md-6 mb-3" style={sliderContainerStyle}>
          <label className="form-label" style={sliderLabelStyle}>
            🎬 Pacing
            <span style={sliderValueStyle}>{((mood.pacing ?? 0.5) * 100).toFixed(0)}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={mood.pacing ?? 0.5}
            onChange={(e) => onChange({ ...mood, pacing: Number(e.target.value) })}
            className="form-range"
          />
        </div>
      </div>
    </div>
  );
}
