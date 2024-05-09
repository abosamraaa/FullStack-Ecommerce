import React, { createContext, useState } from 'react';

// Create a context to store the token and authentication state
// export const AuthContext = createContext({
//   token: null,
//   setToken: () => {}, // Placeholder function for setting the token
// });
export const AuthContext = createContext();
// AuthProvider component to manage the authentication token
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(); // Initialize state with null token
  const [user,setUser] = useState();
  return (
    <AuthContext.Provider value={{ token, setToken , user ,setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;


