import axios from 'axios';

const API_URL = 'http://localhost:8083/api';

export const getCategories = () => axios.get(`${API_URL}/categories`);
export const createCategory = (categoryData) => axios.post(`${API_URL}/category`, categoryData);
export const updateCategory = (categoryId, categoryData) => axios.put(`${API_URL}/category/${categoryId}`, categoryData);
export const deleteCategory = (categoryId) => axios.delete(`${API_URL}/category/${categoryId}`);