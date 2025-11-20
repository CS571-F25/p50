export default function Chip({ label, selected, onClick }) {
  const chipStyle = {
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    border: selected ? 'none' : '2px solid rgba(127, 90, 240, 0.4)',
    background: selected 
      ? 'linear-gradient(135deg, var(--neon-purple), var(--neon-blue))' 
      : 'rgba(35, 35, 41, 0.6)',
    color: selected ? 'var(--text-primary)' : 'var(--text-secondary)',
    fontWeight: selected ? '600' : '500',
    fontSize: '0.85rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
    boxShadow: selected 
      ? '0 0 16px 4px rgba(127, 90, 240, 0.6)' 
      : '0 2px 8px rgba(0, 0, 0, 0.3)',
    textTransform: 'lowercase',
    letterSpacing: '0.02em',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="mood-chip"
      style={chipStyle}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
}
