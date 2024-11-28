import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom'; // Add BrowserRouter
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import ErrorBoundary from './ErrorBoundary';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter> {/* Wrap BrowserRouter */}
        <AuthProvider> {/* Wrap AuthProvider */}
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
