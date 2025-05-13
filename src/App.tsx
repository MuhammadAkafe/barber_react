import { useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import './App.css';

// Pages
import Login from './pages/User/auth/Login/Login';
import Register from './pages/User/auth/Register/Register';
import NoPage from './pages/NoPage/NoPage';
import Menu from './pages/components/Menu/Menu';
import Profile from './pages/User/Profile/Profile';
import GetUserAppointments from './pages/User/ShowAppointment/GetUserAppointments';
import AddAppointment from './pages/User/Add_Appointments/AddAppoinment';

// Protected Routes
import ProtectedRoutes from './protectedroutes/ProtectedRoutes';

const App = () => {


  return (
    <>
   
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        <Route path="/GetUserAppointments" element={
         // <ProtectedRoutes>
            <>
              <Menu />
              <GetUserAppointments />
            </>
        //  </ProtectedRoutes>
          } />

        <Route
          path="/Profile"
          element={
           // <ProtectedRoutes>
              <>
              <Menu />
              <Profile />
              </>
           //  </ProtectedRoutes>
          }
        />

        <Route
          path="/AddAppointment"
          element={
           // <ProtectedRoutes>
              <>
                <Menu />
                <AddAppointment />
              </>
            //</ProtectedRoutes>
          }
        />

        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
};

export default App;
