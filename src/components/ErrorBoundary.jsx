import { Component } from 'react';
import { Container, Button } from 'react-bootstrap';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '#/';
  };

  render() {
    if (this.state.hasError) {
      const errorStyle = {
        textAlign: 'center',
        padding: '4rem 2rem',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      };

      const titleStyle = {
        color: 'var(--neon-crimson)',
        fontSize: '2rem',
        fontWeight: '700',
        marginBottom: '1rem',
      };

      const textStyle = {
        color: 'var(--text-secondary)',
        fontSize: '1.1rem',
        marginBottom: '2rem',
        maxWidth: '600px',
      };

      return (
        <Container style={errorStyle}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
          <h1 style={titleStyle}>Something went wrong</h1>
          <p style={textStyle}>
            We encountered an unexpected error. Please try refreshing the page or returning to the homepage.
          </p>
          <Button 
            onClick={this.handleReset}
            style={{
              background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-blue))',
              border: 'none',
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              fontWeight: '600',
            }}
          >
            Return to Home
          </Button>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

