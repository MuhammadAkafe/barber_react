import axios, { AxiosInstance } from "axios";

export const apiInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_URL}`,
  withCredentials: true,
});

// Store the token
let accessToken: string | null = null;

// Request Interceptor: Attach token to all requests if it exists
apiInstance.interceptors.request.use(
  (config) => {
    if (accessToken)
       {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 errors and refresh token
// apiInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If token is expired and not retried yet, refresh the token
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // Call refresh token endpoint
//         const refreshResponse = await axios.post(
//           `${process.env.REACT_APP_URL}/RefreshToken`,
//           {},
//           { withCredentials: true } // Assumes refresh_token uses cookies
//         );

//         // Update the token
//         accessToken = refreshResponse.data.accessToken;
//         if(accessToken)
//           {
//           localStorage.setItem("accessToken",accessToken)
//         }
       

//         // Retry the original request with the new token
//         originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//         return apiInstance(originalRequest);
//       } 
//       catch (refreshError) 
//       {
//         // Refresh failed, log out user or take appropriate action
//         console.error("Token refresh failed:", refreshError);
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default apiInstance;
