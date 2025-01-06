import React from 'react'
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: JSX.Element;
    isisAuthenticated:boolean;
  }
  function ProtectedRoutes(props: ProtectedRouteProps) 
  {
    const { children,isisAuthenticated } = props;
   return isisAuthenticated? children:<Navigate to="/" />;
  }

export default ProtectedRoutes