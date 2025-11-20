import Chip from "./Chip.jsx";

const COLORS = ["#FF6B6B","#F59E0B","#34D399","#60A5FA","#A78BFA","#F472B6","#9CA3AF"];
const DESCRIPTORS = ["cozy","melancholic","upbeat","mysterious","gritty","surreal","romantic","dark comedy"];

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

  return (
    <div className="glass-panel" style={panelStyle}>
      <h3 style={sectionTitleStyle}>🎨 Mood Palette</h3>
      
      <div style={sectionTitleStyle} className="mt-3">Colors</div>
      <div className="d-flex flex-wrap mb-3">
        {COLORS.map(c => (
          <button
            key={c}
            type="button"
            onClick={() => toggleColor(c)}
            className="color-selector"
            style={colorButtonStyle(c, mood.colors.has(c))}
            aria-label={`color ${c}`}
            title={`Select color ${c}`}
          />
        ))}
      </div>

      <hr style={dividerStyle} />

      <div style={sectionTitleStyle}>Vibes</div>
      <div className="d-flex flex-wrap mb-3">
        {DESCRIPTORS.map(d => (
          <Chip 
            key={d} 
            label={d} 
            selected={mood.descriptors.has(d)} 
            onClick={() => toggleDesc(d)} 
          />
        ))}
      </div>

      <hr style={dividerStyle} />

      <div className="row mt-3">
        <div className="col-md-6 mb-3" style={sliderContainerStyle}>
          <label className="form-label" style={sliderLabelStyle}>
            <span>⚡ Intensity</span>
            <span style={sliderValueStyle}>{(mood.intensity * 100).toFixed(0)}%</span>
          </label>
          <input
            type="range" 
            min="0" 
            max="1" 
            step="0.01"
            value={mood.intensity}
            className="form-range"
            onChange={(e) => onChange({ ...mood, intensity: Number(e.target.value) })}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className="col-md-6 mb-3" style={sliderContainerStyle}>
          <label className="form-label" style={sliderLabelStyle}>
            <span>🎬 Pacing</span>
            <span style={sliderValueStyle}>{(mood.pacing * 100).toFixed(0)}%</span>
          </label>
          <input
            type="range" 
            min="0" 
            max="1" 
            step="0.01"
            value={mood.pacing}
            className="form-range"
            onChange={(e) => onChange({ ...mood, pacing: Number(e.target.value) })}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  );
}
