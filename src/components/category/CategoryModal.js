import React, { useState, useEffect } from 'react';

function CategoryModal({ show, onClose, onSubmit, owners, category, isEditMode }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode && category) {
      setName(category.title);
      setDescription(category.description);
      setOwnerId(category.ownerId || '');
    }
  }, [isEditMode, category]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !ownerId) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    setError('');
    const categoryData = { id: category?.id, title: name, description, ownerId };
    onSubmit(categoryData);
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditMode ? 'Editar Categoria' : 'Cadastrar Categoria'}</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <input
            type="text"
            className="input-field"
            placeholder="Nome da Categoria"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="input-field"
            placeholder="Descrição da Categoria"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="select-field"
            value={ownerId}
            onChange={(e) => setOwnerId(e.target.value)}
          >
            <option value="">Selecione o Proprietário</option>
            {owners.map(owner => (
              <option key={owner.id} value={owner.id}>
                {owner.name}
              </option>
            ))}
          </select>
          {error && <div className="error-message">{error}</div>}
        </div>
        <div className="modal-footer">
          <button className="button" onClick={handleSubmit}>{isEditMode ? 'Editar' : 'Cadastrar'}</button>
        </div>
      </div>
    </div>
  );
}

export default CategoryModal;