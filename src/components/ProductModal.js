import React, { useState, useEffect } from 'react';

function ProductModal({ show, onClose, onSubmit, owners, categories, product, isEditMode }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode && product) {
      setName(product.title);
      setDescription(product.description);
      setPrice(product.price);
      setCategoryId(product.categoryId || '');
      setOwnerId(product.ownerId || '');
    }
  }, [isEditMode, product]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !price || !ownerId || !categoryId) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    setError('');
    const productData = { id: product?.id, title: name, description, price: parseFloat(price), ownerId, categoryId };
    onSubmit(productData);
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditMode ? 'Editar Produto' : 'Cadastrar Produto'}</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <input
            type="text"
            className="input-field"
            placeholder="Nome do Produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="input-field"
            placeholder="Descrição do Produto"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            className="input-field"
            placeholder="Preço"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <select
            className="select-field"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Selecione a Categoria</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
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

export default ProductModal;