import api from './axios';

export const login = (payload) => api.post('/auth/login', payload).then((res) => res.data.data);
export const register = (payload) => api.post('/auth/register', payload).then((res) => res.data.data);
export const logout = () => api.post('/auth/logout').then((res) => res.data.data);