import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleAuthProvider } from './GoogleAuthContext';
import './index.css'; // <-- Make sure this is present

const clientId = "793172469677-nsm80kqihtnjuqrc7to2948vat543aoq.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleAuthProvider>
        <App />
      </GoogleAuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
