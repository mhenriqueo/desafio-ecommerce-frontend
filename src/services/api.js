import axios from 'axios';

const API_URL = 'http://localhost:8083/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};

export const createProduct = async (product) => {
  try {
    const response = await api.post('/product', product);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    await api.delete(`/product/${productId}`);
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    throw error;
  }
};

export const updateProduct = async (productId, product) => {
  try {
    const response = await api.put(`/product/${productId}`, product);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    throw error;
  }
};

export const searchProducts = async (title) => {
  try {
    const response = await api.get(`/products/search?title=${title}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos por título:', error);
    throw error;
  }
};