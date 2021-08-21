import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3002",
  headers: {'token': localStorage.getItem('token')}
});

export default api;