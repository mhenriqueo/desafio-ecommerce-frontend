import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p><strong>Preço: </strong>{product.price}</p>
      <p><strong>Categoria: </strong>{product.categoryTitle}</p>
      <p><strong>Proprietário: </strong>{product.ownerName}</p>
    </div>
  );
};

export default ProductCard;