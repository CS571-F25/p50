import { Card } from 'react-bootstrap';

export default function StatsCard({ title, value, icon, description }) {
  const cardStyle = {
    background: 'rgba(35, 35, 41, 0.7)',
    backdropFilter: 'blur(12px)',
    border: '2px solid rgba(127, 90, 240, 0.3)',
    borderRadius: '16px',
    padding: '1.5rem',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    height: '100%',
  };

  const iconStyle = {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    filter: 'drop-shadow(0 0 10px rgba(127, 90, 240, 0.6))',
  };

  const valueStyle = {
    color: 'var(--neon-purple)',
    fontSize: '2.5rem',
    fontWeight: '700',
    textShadow: '0 0 16px rgba(127, 90, 240, 0.8)',
    marginBottom: '0.5rem',
  };

  const titleStyle = {
    color: 'var(--text-primary)',
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  };

  const descStyle = {
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
  };

  return (
    <Card style={cardStyle} className="glass-panel">
      <Card.Body>
        {icon && <div style={iconStyle}>{icon}</div>}
        <div style={valueStyle}>{value}</div>
        <h3 style={titleStyle}>{title}</h3>
        {description && <p style={descStyle}>{description}</p>}
      </Card.Body>
    </Card>
  );
}

