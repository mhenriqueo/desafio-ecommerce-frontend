import React from 'react';

function ProductTable({ products, onDelete, onEdit }) {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Produto</th>
          <th>Descrição</th>
          <th>Preço</th>
          <th>Categoria</th>
          <th>Proprietário</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {products && products.length > 0 ? (
          products.map(product => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.categoryTitle}</td>
              <td>{product.ownerName}</td>
              <td className="flex-row">
                <button className="icon-btn" onClick={() => onEdit(product)} aria-label="Editar produto">
                  <i className="edit-icon">✏️</i>
                </button>
                <span className="action-separator"> | </span>
                <button className="icon-btn" onClick={() => onDelete(product.id)} aria-label="Excluir produto">
                  <i className="delete-icon">🗑️</i>
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="no-products">
              Nenhum produto encontrado.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default ProductTable;