import axios from 'axios';

const API_URL = 'http://localhost:8083/api/owners';

export const getOwners = () => axios.get(API_URL);