import axios from 'axios';

const API_URL = 'http://localhost:8083/api/product';

export const getProducts = () => axios.get(`${API_URL}s`);
export const getProductByTitle = (title) => axios.get(`${API_URL}s/search?title=${title}`);
export const createProduct = (productData) => axios.post(API_URL, productData);
export const updateProduct = (productId, productData) => axios.put(`${API_URL}/${productId}`, productData);
export const deleteProduct = (productId) => axios.delete(`${API_URL}/${productId}`);