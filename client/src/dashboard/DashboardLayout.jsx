import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
// import Header from '../components/Header'


const DashboardLayout = () => {
  return (

       
    <div className=' flex gap-5  md:flex-row'>
      <SideBar/>
      <Outlet/>
      </div>
     
  );
}

export default DashboardLayout;