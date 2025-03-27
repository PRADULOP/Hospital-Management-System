import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000/api' });



export const sendMessage = (data) => API.post('/chat/send', data);
export const getMessages = (docId, userId) => API.get(`/chat/${docId}/${userId}`);

export default API;