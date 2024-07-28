import React, { createContext } from 'react';

const AuthContext = createContext({
  user: 'test-user', // Set default value for user
});

export default AuthContext;
