import React, { createContext, useContext, useState } from 'react';

interface GoogleAuthContextType {
  accessToken: string | null;
  email: string | null;
  setAuth: (token: string, email: string) => void;
}

const GoogleAuthContext = createContext<GoogleAuthContextType>({
  accessToken: null,
  email: null,
  setAuth: () => {},
});

export const useGoogleAuth = () => useContext(GoogleAuthContext);

export const GoogleAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const setAuth = (token: string, email: string) => {
    setAccessToken(token);
    setEmail(email);
  };

  return (
    <GoogleAuthContext.Provider value={{ accessToken, email, setAuth }}>
      {children}
    </GoogleAuthContext.Provider>
  );
};
