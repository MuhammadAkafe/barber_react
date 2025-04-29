import React, { useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import './App.css';

// Components & Pages

import Login from './pages/auth/Login/Login';
import Register from './pages/auth/Register/Register';
import NoPage from './pages/components/NoPage/NoPage';
import Navbar from './pages/components/NavBar/Navbar';
import Profile from './pages/Profile/Profile';
import MyAppointments from './pages/Appointments/myAppointments/MyAppointments';
import AddAppointment from './pages/Appointments/Add_Appointments/AddAppoinment';

// Protected Routes
import ProtectedRoutes from './protectedroutes/ProtectedRoutes';

function App() {
  const location = useLocation();

  // Define valid routes
  const validRoutes = ['/', '/Register', '/MyAppointments', '/Profile', '/AddAppointment'];

  // Hide Navbar if on Login, Register, or an invalid (404) route
  const hideNavbar = useMemo(() => {
    return ['/', '/Register'].includes(location.pathname) || !validRoutes.includes(location.pathname);
  }, [location.pathname]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        <Route
          path="/MyAppointments"
          element={
              <MyAppointments />
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
            <ProtectedRoutes>
              <AddAppointment />
            </ProtectedRoutes>
          }
        />

        {/* Catch-all for 404 (NoPage) */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </LocalizationProvider>
  );
}

export default App;
