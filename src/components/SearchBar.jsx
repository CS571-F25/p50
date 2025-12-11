import { Form, InputGroup } from 'react-bootstrap';
import { useState } from 'react';

export default function SearchBar({ onSearch, placeholder = "Search movies..." }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch(searchTerm);
    }
  };

  const inputStyle = {
    background: 'rgba(35, 35, 41, 0.7)',
    border: '2px solid rgba(127, 90, 240, 0.3)',
    color: 'var(--text-primary)',
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
  };

  return (
    <InputGroup className="mb-3">
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={inputStyle}
        aria-label="Search movies"
        aria-describedby="search-description"
      />
      <InputGroup.Text style={{
        background: 'rgba(127, 90, 240, 0.2)',
        border: '2px solid rgba(127, 90, 240, 0.3)',
        borderLeft: 'none',
        color: 'var(--neon-purple)',
        borderRadius: '0 8px 8px 0',
      }}>
        🔍
      </InputGroup.Text>
      <div id="search-description" className="visually-hidden">
        Enter a movie title to search
      </div>
    </InputGroup>
  );
}

