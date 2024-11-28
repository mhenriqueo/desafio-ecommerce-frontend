import React from 'react';

function ProductSearch({ searchQuery, onSearchQueryChange, onSearch }) {
  const handleChange = (event) => {
    onSearchQueryChange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Pesquisar produto por título"
          className="search-input"
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>
    </div>
  );
}

export default ProductSearch;