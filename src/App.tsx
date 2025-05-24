import { Suspense, useMemo, lazy, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import ProtectedRoutes from './Protectedroutes/ProtectedRoutes';

const Login = lazy(() =>  import('./pages/User/auth/Login/Login'));
const Register = lazy(() =>  import('./pages/User/auth/Register/Register'));
const NoPage = lazy(() =>  import('./pages/NoPage/NoPage'));
const Menu = lazy(() =>  import('./pages/components/Menu/Menu'));
const Profile = lazy(() =>  import('./pages/User/Profile/Profile'));
const GetUserAppointments = lazy(() =>  import('./pages/User/Appointments/ShowAppointment/GetUserAppointments'));
const AddAppointment = lazy(() =>  import('./pages/User/Appointments/Add_Appointments/AddAppoinment'));
const Email = lazy(() =>  import('./pages/User/auth/email/Email'));
const VerificationCode = lazy(() =>  import('./pages/User/auth/verification/VerificationCode'));
const UpdatePassword = lazy(() =>  import('./pages/User/auth/UpdatePassword/UpdatePassword'));

// Loading spinner component
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh' 
  }}>
    <div className='spinner-border text-primary' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </div>
  </div>
);

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        } />


        <Route path="/Register" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Register />
          </Suspense>
        } />

        <Route path="/phonenumber" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Email />
          </Suspense>
        } />

        <Route path="/verification" element={
          <Suspense fallback={<LoadingSpinner />}>
            <VerificationCode />
          </Suspense>
        } />

        <Route path="/updatepassword" element={
          <Suspense fallback={<LoadingSpinner />}>
            <UpdatePassword />
          </Suspense>
        } />


        <Route path="/GetUserAppointments" element={
          <Suspense fallback={<LoadingSpinner />}>
              {/* //<ProtectedRoutes > */}
                <>
                <Menu />
                <GetUserAppointments />
                </>
              {/* </ProtectedRoutes > */}
          </Suspense>
        } />
        <Route path="/Profile" element={
          <Suspense fallback={<LoadingSpinner />}>
            <>
              <Menu />
              <Profile />
            </>
          </Suspense>
        } />
        <Route path="/AddAppointment" element={
          <Suspense fallback={<LoadingSpinner />}>
            <>
              <Menu />
              <AddAppointment />
            </>
          </Suspense>
        } />
        <Route path="*" element={
          <Suspense fallback={<LoadingSpinner />}>
            <NoPage />
          </Suspense>
        } />
      </Routes>
    </>
  );
};

export default App;
