import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthContext from './components/AuthContext';
import SideBar from './dashboard/SideBar'; // Assuming this is where your Sidebar component is located

const App = () => {
  return (
    <>
      <AuthContext.Provider value={{ user: 'test-user' }}>
        
        <SideBar />
        <Outlet />
      </AuthContext.Provider>
    </>
  );
};

export default App;
