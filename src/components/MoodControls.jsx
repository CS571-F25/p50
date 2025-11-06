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

  return (
    <div className="card shadow-sm p-3">
      <div className="mb-2 fw-semibold">Colors</div>
      <div className="d-flex flex-wrap mb-3">
        {COLORS.map(c => (
          <button
            key={c}
            type="button"
            onClick={() => toggleColor(c)}
            className="me-2 mb-2"
            style={{
              width: 36, height: 36, borderRadius: 8,
              border: `2px solid ${mood.colors.has(c) ? "#111" : "transparent"}`,
              backgroundColor: c
            }}
            aria-label={`color ${c}`}
          />
        ))}
      </div>

      <div className="mb-2 fw-semibold">Descriptors</div>
      <div className="d-flex flex-wrap">
        {DESCRIPTORS.map(d => (
          <Chip key={d} label={d} selected={mood.descriptors.has(d)} onClick={() => toggleDesc(d)} />
        ))}
      </div>

      <div className="row mt-3">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Intensity</label>
          <input
            type="range" min="0" max="1" step="0.01"
            value={mood.intensity}
            className="form-range"
            onChange={(e) => onChange({ ...mood, intensity: Number(e.target.value) })}
          />
        </div>
        <div className="col-md-6 mb-2">
          <label className="form-label fw-semibold">Pacing</label>
          <input
            type="range" min="0" max="1" step="0.01"
            value={mood.pacing}
            className="form-range"
            onChange={(e) => onChange({ ...mood, pacing: Number(e.target.value) })}
          />
        </div>
      </div>
    </div>
  );
}
