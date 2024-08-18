import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './pages/main/Main';
import NoPage from './pages/NoPage/NoPage';
import Login from './pages/auth/login';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
  <React.StrictMode>
    <Routes>
    <Route path="/" element={<Main />}>
    </Route>
    <Route path="/Login" element={<Login/>}/>
    <Route path="*" element={<NoPage />}/>
    </Routes>
  </React.StrictMode>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
