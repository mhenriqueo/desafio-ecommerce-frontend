import React, { useState } from 'react';
import { deleteCategory } from '../../services/categoryService';

function CategoryTable({ categories, onDelete, onEdit }) {
  const [error, setError] = useState(null);

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      onDelete(categoryId);
      setError(null);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError('Não é possível excluir a categoria, pois ela está vinculada a um ou mais produtos.');
      } else if (err.response && err.response.status === 404) {

      } else {
        setError('Ocorreu um erro ao tentar excluir a categoria. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      <table className="category-table">
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Descrição</th>
            <th>Proprietário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categories && categories.length > 0 ? (
            categories.map(category => (
              <tr key={category.id}>
                <td>{category.title}</td>
                <td>{category.description}</td>
                <td>{category.ownerName}</td>
                <td className="flex-row">
                  <button className="icon-btn" onClick={() => onEdit(category)} aria-label="Editar categoria">
                    <i className="edit-icon">✏️</i>
                  </button>
                  <span className="action-separator"> | </span>
                  <button className="icon-btn" onClick={() => handleDelete(category.id)} aria-label="Excluir categoria">
                    <i className="delete-icon">🗑️</i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-categories">
                Nenhuma categoria encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryTable;