import React from 'react';
import './App.css';
import Login from './pages/auth/Login/Login';
import NoPage from './pages/components/NoPage/NoPage';
import Profile from './pages/Profile/Profile';
import Register from './pages/auth/Register/Register';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './protectedroutes/ProtectedRoutes'; // Fixed import path
import AddAppoinment from './pages/Appointments/Add_Appointments/AddAppoinment';
import Navbar from './pages/components/NavBar/Navbar';
import { useLocation } from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import MyAppointments from './pages/Appointments/myAppointments/MyAppointments';


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
          <Route path="/MyAppointments" 
          element={  
             <ProtectedRoutes>        
             <MyAppointments/>
              </ProtectedRoutes>
            }
          />
          <Route
            path="/Profile"
            element={
              <ProtectedRoutes>
                <Profile />  
              </ProtectedRoutes>
            }
          />

          <Route
            path="/AddAppointment"
            element={
              // <ProtectedRoutes>
                <AddAppoinment />
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
