import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      {products.length ? (
        products.map((product) => <ProductCard key={product.id} product={product} />)
      ) : (
        <p>Nenhum produto encontrado.</p>
      )}
    </div>
  );
};

export default ProductList;