import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/auth/AuthContext';
import { SelectDataProvider } from './context/selectData/SelectDataContext';
import './index.css';
import AppRoutes from './routes/routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SelectDataProvider>
        <BrowserRouter>
          <AppRoutes />
          <ToastContainer position="top-right" autoClose={3000} />
        </BrowserRouter>
      </SelectDataProvider>
    </AuthProvider>
  </React.StrictMode>
);
