import React from 'react';
import './App.css';
import Login from './pages/auth/Login/Login';
import NoPage from './pages/NoPage/NoPage';
import Register from './pages/auth/Register/Register';
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from './protected routes/ProtectedRoutes';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="*" element={<NoPage />} />
          <Route path='/Profile' element={
            <ProtectedRoutes isisAuthenticated={true}>
              <Home />
            </ProtectedRoutes>
          }>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
