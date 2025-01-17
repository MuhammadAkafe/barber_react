import React from 'react';
import './App.css';
import Login from './pages/auth/Login/Login';
import NoPage from './pages/NoPage/NoPage';
import Profile from './pages/Profile/Profile';
import Register from './pages/auth/Register/Register';
import Home from './pages/Home/Home';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './protectedroutes/ProtectedRoutes'; // Fixed import path
import Roles from './pages/Roles/Roles';
import Navbar from './pages/NavBar/Navbar';
import { useLocation } from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


function App() {
  const location = useLocation();
  const noNavbarPaths = ['/', '/Register'];

  return (
    <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      {!noNavbarPaths.includes(location.pathname) && <Navbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Profile" 
          element={  
             <ProtectedRoutes>        
              <Profile />   
              </ProtectedRoutes>
            }
          />
          <Route
            path="/Home"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/Roles"
            element={
              // <ProtectedRoutes>
                <Roles />
              /* </ProtectedRoutes> */
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<NoPage />} />
        </Routes>
        </LocalizationProvider>
      </>
  );
}

export default App;
