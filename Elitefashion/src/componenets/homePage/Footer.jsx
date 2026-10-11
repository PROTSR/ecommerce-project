
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ThemData } from '../../contex/Theme'


const Footer = () => {
  const {adminToken}=useContext(ThemData)
  const navigate = useNavigate()
  return (
    <footer className='bg-slate-900 text-indigo-300 h-20 px-15 flex gap-15 justify-center items-center'>
      {/* <div className='flex  '> */}
        <Link to='/about' >Our Story</Link>
        <Link to='/contact' >Contact</Link>
        <Link to={adminToken?'/admin/dashboard':'/admin_login'} >Admin Login</Link>
      <span> @2026 All rights reserved </span>
        
      {/* </div> */}


    </footer>
  )
}

export default Footer