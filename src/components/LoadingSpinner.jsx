import { Spinner } from 'react-bootstrap';

export default function LoadingSpinner({ message = "Loading..." }) {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
    gap: '1rem',
  };

  const spinnerStyle = {
    color: 'var(--neon-purple)',
    width: '3rem',
    height: '3rem',
    borderWidth: '0.3rem',
  };

  const textStyle = {
    color: 'var(--text-secondary)',
    fontSize: '1rem',
  };

  return (
    <div style={containerStyle} role="status" aria-live="polite">
      <Spinner 
        animation="border" 
        style={spinnerStyle}
        role="status"
        aria-label={message}
      >
        <span className="visually-hidden">{message}</span>
      </Spinner>
      {message && <p style={textStyle}>{message}</p>}
    </div>
  );
}

