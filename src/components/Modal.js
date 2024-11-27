import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Modal({ isProduct, owners, product, closeModal }) {
  const [formData, setFormData] = useState({
    name: product ? product.name : '',
    price: product ? product.price : '',
    quantity: product ? product.quantity : '',
    ownerId: product ? product.owner.id : '',
  });

  // Atualiza o estado do formData com os valores do produto, caso seja edição
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        ownerId: product.owner.id,
      });
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isProduct) {
      if (product) {
        axios.put(`http://localhost:8083/api/products/${product.id}`, formData)
          .then(() => {
            closeModal(); // Fecha o modal após o sucesso
          })
          .catch(error => console.error('Erro ao editar produto:', error));
      } else {
        axios.post('http://localhost:8083/api/products', formData)
          .then(() => {
            closeModal();
          })
          .catch(error => console.error('Erro ao cadastrar produto:', error));
      }
    } else {
      // Similar para Categoria, pode criar ou editar dependendo do caso
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isProduct ? 'Cadastrar Produto' : 'Cadastrar Categoria'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label>Preço:</label>
            <input
              type="number"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
            />
          </div>
          <div>
            <label>Quantidade:</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={e => setFormData({ ...formData, quantity: e.target.value })}
            />
          </div>
          <div>
            <label>Proprietário:</label>
            <select
              value={formData.ownerId}
              onChange={e => setFormData({ ...formData, ownerId: e.target.value })}
            >
              <option value="">Selecione o Proprietário</option>
              {owners.map(owner => (
                <option key={owner.id} value={owner.id}>{owner.name}</option>
              ))}
            </select>
          </div>
          <div>
            <button type="submit">{isProduct ? 'Salvar Produto' : 'Salvar Categoria'}</button>
            <button type="button" onClick={closeModal}>Fechar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;