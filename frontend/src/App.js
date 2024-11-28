import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Adjust based on your file structure
import Home from './pages/Home';
import Login from './pages/Login';
import CreateProduct from './pages/CreateProduct';
import ProtectedRoute from './components/ProtectedRoute';
//import {login} from google
const App = () => {
  return (
    <AuthProvider>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateProduct />
            </ProtectedRoute>
          }
        />
      </Routes>

    </AuthProvider>
  );
};

export default App;