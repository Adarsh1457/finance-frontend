import api from './axios';

export const getSummary = () => api.get('/dashboard/summary').then((res) => res.data.data);
export const getByCategory = () => api.get('/dashboard/by-category').then((res) => res.data.data);
export const getTrends = (period) => api.get('/dashboard/trends', { params: { period } }).then((res) => res.data.data);
export const getRecent = (limit = 10) => api.get('/dashboard/recent', { params: { limit } }).then((res) => res.data.data);
export const getFrequency = () => api.get('/dashboard/frequency').then((res) => res.data.data);
export const getTopCategories = (limit = 5) => api.get('/dashboard/top-categories', { params: { limit } }).then((res) => res.data.data);