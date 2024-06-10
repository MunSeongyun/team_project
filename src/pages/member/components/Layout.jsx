import React from 'react'
import { Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import OffcanvasExample from './OffcanvasExample';

const Layout = () => {


  return (
    <div>
      <OffcanvasExample />
      <Outlet />
    </div>
  )
}

export default Layout