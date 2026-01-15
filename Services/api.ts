import axios from 'axios';

const API_BASE_URL = 'https://68333c07464b499636fec58b.mockapi.io/api/v1';

export const getTasks = () => axios.get(`${API_BASE_URL}/task`);
export const getTask = (id: string) => axios.get(`${API_BASE_URL}/task/${id}`);
export const createTask = (task: any) => axios.post(`${API_BASE_URL}/task`, task);
export const updateTask = (id: string, task: any) => axios.put(`${API_BASE_URL}/task/${id}`, task);
export const deleteTask = (id: string) => axios.delete(`${API_BASE_URL}/task/${id}`);