import React from 'react';
import './App.css';
import Login from './pages/auth/Login/Login';
import NoPage from './pages/NoPage/NoPage';
import Profile from './pages/Profile/Profile';
import Register from './pages/auth/Register/Register';
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './protectedroutes/ProtectedRoutes'; // Fixed import path
import Roles from './pages/Roles/Roles';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* Login Route */}
          <Route path="/" element={<Login />} />
          
          {/* Public Routes */}
          <Route path="/Home" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route
            path="/Profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/Roles"
            element={
              <ProtectedRoutes>
                <Roles />
              </ProtectedRoutes>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
