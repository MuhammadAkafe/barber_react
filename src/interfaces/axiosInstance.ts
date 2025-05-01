import axios, { AxiosInstance } from "axios";

export const apiInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_URL}`,
  withCredentials: true,
});




export default apiInstance;
