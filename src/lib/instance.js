import axios from "axios";

export const fetcher = axios.create({
  baseURL: "/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

fetcher.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

fetcher.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    return Promise.reject(error?.response?.data);
  }
);
