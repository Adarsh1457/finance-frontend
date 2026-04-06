import api from './axios';

export const listRecords = (params) => api.get('/records', { params }).then((res) => res.data);
export const getRecord = (id) => api.get(`/records/${id}`).then((res) => res.data.data);
export const createRecord = (payload) => api.post('/records', payload).then((res) => res.data.data);
export const updateRecord = (id, payload) => api.patch(`/records/${id}`, payload).then((res) => res.data.data);
export const deleteRecord = (id) => api.delete(`/records/${id}`).then((res) => res.data.data);
export const restoreRecord = (id) => api.patch(`/records/${id}/restore`).then((res) => res.data.data);
export const importRecords = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/records/import', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => res.data.data);
};
export const downloadTemplate = (format) => api.get('/records/import/template', { params: { format }, responseType: 'blob' });
export const exportRecords = (params) => api.get('/records/export', { params, responseType: 'blob' });
export const listImportLogs = (params) => api.get('/records/import/logs', { params }).then((res) => res.data);
export const countRecords = (params) => api.get('/records/count', { params }).then((res) => res.data.data);