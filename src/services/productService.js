import axios from 'axios';

const API_URL = 'http://localhost:8083/api';

export const getProducts = () => axios.get(`${API_URL}/products`);
export const getProductByTitle = (title) => axios.get(`${API_URL}/products/search?title=${title}`);
export const createProduct = (productData) => axios.post(`${API_URL}/product`, productData);
export const updateProduct = (productId, productData) => axios.put(`${API_URL}/product/${productId}`, productData);
export const deleteProduct = (productId) => axios.delete(`${API_URL}/product/${productId}`);