import React from 'react'
import Navbar from '../../components/Navbar_fpc'
import { Outlet} from 'react-router-dom'
function Fpc() {
  return (
    <>
    <Navbar/>
    <Outlet/>
  </>
  )
}

export default Fpc
