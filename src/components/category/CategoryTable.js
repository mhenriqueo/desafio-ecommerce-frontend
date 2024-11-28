import React, { useState } from 'react';
import { deleteCategory } from '../../services/categoryService';

function CategoryTable({ categories, onDelete, onEdit }) {
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      onDelete(categoryId);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setErrorMessage(
          "Não é possível excluir a categoria, pois ela está vinculada a um ou mais produtos."
        );
        setErrorModalOpen(true);
      } else {
        setErrorMessage("Ocorreu um erro ao tentar excluir a categoria.");
        setErrorModalOpen(true);
      }
    }
  };

  return (
    <div>
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

      {errorModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{errorMessage}</p>
            <button className="modal-close-btn" onClick={() => setErrorModalOpen(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryTable;