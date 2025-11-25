import axios, { type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080", // sin /api
  headers: { "Content-Type": "application/json" },
  timeout: 10000, // opcional
});

export default api;
