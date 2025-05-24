import axios, { AxiosInstance } from "axios";
import { store } from "../Redux/Store";

export const apiInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_URL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Add request interceptor to add token from Redux store
apiInstance.interceptors.request.use((config) => {
  const token = store.getState().loginSlice.data?.access_token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiInstance;
