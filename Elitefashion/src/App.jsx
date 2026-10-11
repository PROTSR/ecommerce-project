import { useContext, useEffect, useState } from 'react'
import './App.css'
import Nav from './componenets/Nav'
import Herosec from './componenets/homePage/Herosec'
import Home from './componenets/homePage/Home'
import Category from './componenets/category/Category'
import About from './componenets/about/About'
import Contact from './componenets/contact/Contact'
import { Routes, Route, useLocation } from 'react-router-dom'
import axios, { Axios } from 'axios'
// import Dashboard from './componenets/adminpanel/Adminpanel'
import Adminpanel from './componenets/adminpanel/Adminpanel'
import LoginAdmin from './componenets/adminpanel/adminpages/LoginAdmin'
import ProtectedAdminRoute from './componenets/adminpanel/ProtectedAdminRoute'
import Dashboard from './componenets/adminpanel/adminpages/Dashboard'
import Productcrud from './componenets/adminpanel/adminpages/Productcrud'
import Categories from './componenets/adminpanel/adminpages/Categories'
import Stockes from './componenets/adminpanel/adminpages/Stockes'
import Orders from './componenets/adminpanel/adminpages/Orders'
import Customers from './componenets/adminpanel/adminpages/Customers'
import Form from './componenets/adminpanel/adminpages/admcomponents/Form'
import AdminSignup from './componenets/adminpanel/adminpages/AdminSignup'
import { ThemData } from './contex/Theme'
import SignUp from './componenets/SignUp'
import Login from './componenets/Login'
import Forgot_Password from './componenets/Forgotpassword'
import ForgotPassword from './componenets/adminpanel/ForgotPassword'
import Cart from './componenets/homePage/Cart'
import PaymentCheckout from './componenets/homePage/PaymentCheckout'
import Profile from './componenets/homePage/Profile'
import UpdateProd from './componenets/adminpanel/adminpages/admcomponents/UpdateProd'
import Products from './componenets/smallcomp/Products'



function App() {
  const location = useLocation()
  //  UseAuth()

  const isAdminRoute = location.pathname.startsWith('/admin')

  return (

    <main className='  h-screen overflow-auto scrollbar-none   '>
      
      {
        !isAdminRoute && <Nav />
      }
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category' element={<Category />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:id' element={<Products />} />
        <Route path='/payment' element={<PaymentCheckout />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/admin_login' element={<LoginAdmin />} />
        <Route path='/admin_forgot_password' element={<ForgotPassword />} />
        <Route path='/forgot-password' element={<Forgot_Password/>} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />

        <Route element={<ProtectedAdminRoute />} >

          <Route path='/admin/*' element={<Adminpanel />} >
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='productcrud' element={<Productcrud />} />
            <Route path='productcrud/AddProduct' element={<Form />} />
            <Route path='productcrud/UpdateProduct/:id' element={<UpdateProd />} />
            <Route path='categories' element={<Categories />} />
            <Route path='stocks' element={<Stockes />} />
            <Route path='orders' element={<Orders />} />
            <Route path='customers' element={<Customers />} />
            <Route path='signup' element={<AdminSignup />} />
          </Route>
        </Route>

      </Routes>

        

    </main>

  )
}

export default App