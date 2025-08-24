import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api", 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

export default api;
