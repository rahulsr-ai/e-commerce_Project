import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL, // Optional: You can set a base URL here
});

// Set up Axios interceptor to add token to headers for every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem("authToken");

    // If token exists, add it to the Authorization header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Always return the config object to continue the request
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
