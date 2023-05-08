import  React,{ createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (user) => {
    setLoggedIn(true);
    setUser(user);
  };

  const logout = () => {
    setLoggedIn(false);
    setUser(null);
  };

  const authContextValue = {
    loggedIn,
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
