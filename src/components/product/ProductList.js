import React from 'react';
import ProductTable from './ProductTable';

function ProductList({ products, onDelete, onSearch, searchQuery, onSearchQueryChange, onEdit }) {
  return (
    <div className="product-list">
      <ProductTable products={products} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}

export default ProductList;