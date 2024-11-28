import axios from 'axios';

const API_URL = 'http://localhost:8083/api/categories';

export const getCategories = () => axios.get(API_URL);
export const getCategoryById = (categoryId) => axios.get(`${API_URL.replace('/categories', '/category')}/${categoryId}`);
export const createCategory = (categoryData) => axios.post(`${API_URL.replace('/categories', '/category')}`, categoryData);
export const updateCategory = (categoryId, categoryData) => axios.put(`${API_URL.replace('/categories', '/category')}/${categoryId}`, categoryData);
export const deleteCategory = (categoryId) => axios.delete(`${API_URL.replace('/categories', '/category')}/${categoryId}`);