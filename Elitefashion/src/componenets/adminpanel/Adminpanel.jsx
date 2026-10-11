import React from 'react'
import Navigation from './adminpages/Navigation'
import Dashboard from './adminpages/Dashboard'
import Productcrud from './adminpages/Productcrud'
import Categories from './adminpages/Categories'
import Stockes from './adminpages/Stockes'
import Orders from './adminpages/Orders'
import Customers from './adminpages/Customers'
import { Routes,Route, Outlet } from 'react-router-dom'
import Form from './adminpages/admcomponents/Form'
import AdminSignup from './adminpages/AdminSignup'

const Adminpanel = () => {
    return (
        <main className='h-screen bg-gray-200 grid grid-cols-12'>
          <Navigation/>

          <Outlet/>
          
          {/* <Routes>
            <Route path='dashboard' element={<Dashboard/>} />
            <Route path='productcrud' element={<Productcrud/>} />
            <Route path='productcrud/addproduct' element={<Form/>} />
            <Route path='categories' element={<Categories/>} />
            <Route path='stocks' element={<Stockes/>} />
            <Route path='orders' element={<Orders/>} />
            <Route path='customers' element={<Customers/>} />
            <Route path='signup' element={<AdminSignup/>} />

          </Routes> */}
            
        </main>
    )
}

export default Adminpanel