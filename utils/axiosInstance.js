// utils/axiosInstance.js

import axios from "axios";

const instance = axios.create({
  // baseURL: 'https://property-management-backend-hrjp.onrender.com/api',
  baseURL: "http://localhost:5000/api", // or your production backend
  withCredentials: true,
});

// Attach token from localStorage safely (only on client-side)
instance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") { // check if running on client
      const token = localStorage.getItem("userToken"); 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response interceptor to handle 401 globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optional: remove token and redirect
      if (typeof window !== "undefined") {
        localStorage.removeItem("userToken");
        window.location.href = "/user/login";
      }
    }
    return Promise.reject(error);
  }
);

export default instance;

