import React, { useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import './App.css';

// Pages
import Login from './pages/auth/Login/Login';
import Register from './pages/auth/Register/Register';
import NoPage from './pages/NoPage/NoPage';
import Menu from './pages/components/Menu/Menu';
import Profile from './pages/Profile/Profile';
import MyAppointments from './pages/Appointments/myAppointments/MyAppointments';
import AddAppointment from './pages/Appointments/Add_Appointments/AddAppoinment';

// Protected Routes
import ProtectedRoutes from './protectedroutes/ProtectedRoutes';

const App = () => {
  const location = useLocation();

  // Define routes that don't need the Navbar (Menu)
  const routesWithoutNavbar = ['/', '/Register'];

  // Decide if Navbar should be hidden
  const hideNavbar = useMemo(() => {
    const isKnownRoute = [
      '/', 
      '/Register', 
      '/MyAppointments', 
      '/Profile', 
      '/AddAppointment'
    ].includes(location.pathname);
    return routesWithoutNavbar.includes(location.pathname) || !isKnownRoute;
  }, [location.pathname]);

  return (
    <>
      {!hideNavbar && <Menu />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/MyAppointments" element={<MyAppointments />} />

        <Route
          path="/Profile"
          element={
            // Uncomment below to protect this route when needed
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

        {/* Fallback route for 404 */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
};

export default App;
