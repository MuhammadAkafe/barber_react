import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { useAppDispatch, useAppSelector } from '../Redux/Store';
import { setAccessToken } from '../Redux/User/Auth/login';

interface ProtectedRoutesProps {
  children: JSX.Element;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data } = useAppSelector((state) => state.loginSlice);
  const access_token = data?.access_token;

  // Validate the token locally
  const validateToken = (token: string): boolean => {
    try {
      const decoded: { exp?: number } = jwtDecode(token);
      if (!decoded.exp) return true; // Valid if no expiration is set
      const currentTime = Date.now() / 1000; // Convert to seconds
      return decoded.exp > currentTime; // Check expiration
    } 
    catch 
    {
      return false; // Token is invalid
    }
  };

  // Check authentication and handle token refresh
  const checkAuth = async () => {
    if (!access_token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    const isTokenValid = validateToken(access_token);
    if (!isTokenValid) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false); // End loading
  };

  useEffect(() => {
    console.log(access_token);
    checkAuth(); // Validate and refresh token on mount
  }, [access_token]); // Rerun if the accessToken changes

  if (loading) {
    return <div>Loading...</div>; // Placeholder for loading state
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redirect to login if not authenticated
  }

  return children; // Render the protected content
};

export default ProtectedRoutes;
