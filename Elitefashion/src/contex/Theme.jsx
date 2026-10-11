import React, { createContext, useEffect, useState, useMemo } from 'react'
import { Api, getUser } from './Api'
import { useNavigate } from 'react-router-dom';

export const ThemData = createContext()

const DEFAULT_CATEGORIES = ['JEANS', 'PENTS', 'FORMAL', 'TROUSER', 'SHIRT', 'TSHIRT', 'CASUAL'];
const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const COLORS = ['Black', 'Blue', 'Maroo', 'Olive', 'Brown', 'Beige', 'Navy', 'Green', 'Grey', 'White'];

const Theme = (props) => {
  // const naviagate = useNavigate()
  const [categories, setCategories] = useState([...DEFAULT_CATEGORIES])
  const [cartProduct,setCartProduct]=useState()
  const [Colors,setColors]=useState(...COLORS)
  const [Sizes,setSizes]=useState(...SIZES)
  const [productData, setProductData] = useState([])
  const [userDetail, setUserDetail] = useState(()=>JSON.parse(localStorage.getItem('userDetail')))
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('adminToken'));
  const [userToken, setUserToken] = useState(() => localStorage.getItem('usertoken'));
  // const [cartItems, setCartItems] = useState([])
  const [cartItems, setCartItems] = useState(()=>{
    try {
      const savedCart = localStorage.getItem('cart')
      const parsed= savedCart ? JSON.parse(savedCart):[]
      return Array.isArray(parsed)? parsed:[]
    } catch (error) {
      console.log('failed to parse cart items',error)
      return []
    }
  });
  



  

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await Api.get('/api/products/get')
        console.log(response.data.data)
        setProductData(response.data.data)
      } catch (error) {
        console.log(error)
      }

    }
    getProducts()

  }, [])

  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(cartItems))
  },[cartItems])

 useEffect(()=>{
  if(userToken){
    getUserDetail()
  }
 })
 
   async function getUserDetail() {
     try {
       const response = await getUser();
       const data = response.data?.data;
 
       console.log('User Data Received:', data);
 
       if (data) {
        //  setUserDetail(data);
        localStorage.setItem('userDetail',JSON.stringify(data))
       }
     } catch (error) {
       if (error.response?.status === 403 || error.response?.status === 401) {
         alert("Your session has expired. Please log in again.");
         setUserDetail(null);
         localStorage.removeItem('usertoken')
         setUserToken(null)
         navigate('/login');
       }
     }
   }

  const contextValue = useMemo(() => ({
    productData,
    categories,
    setCategories,
    userDetail,
    setUserDetail,
    adminToken,
    setAdminToken,
    SIZES,
    COLORS,
    userToken,
    setUserToken,
    cartProduct,
    setCartProduct,
    cartItems,
    setCartItems
  }), [productData, userDetail, adminToken, userToken,cartItems]);

  return (
    <ThemData.Provider value={contextValue} >
      {props.children}
    </ThemData.Provider>
  )
}

export default Theme