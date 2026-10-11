import React, { useContext, useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { ThemData } from '../../contex/Theme'
import { useNavigate } from 'react-router-dom'

const Prodcart = (props) => {
  const navigate = useNavigate()
  const handleCart=()=>{
    navigate(`/product/${props.product._id}`,{state:{productDetails:props.product}})
  }
  return (
   <div  className=' relative flex flex-col items-center justify-between   w-60 h-90  py-4 hover:bg-gray-50  px-3 rounded-lg'>
      <ShoppingCart 
       size={35}  
       className='absolute p-2 right-2 top-2 hover:text-black bg-black text-white rounded-full hover:bg-purple-300 ' />
      <img className='h-[70%] w-full b rounded-md' src={`${props.product?.images}`} alt=""/>
      <span className='pl-2 block text-sm w-full truncate '>{props.product?.name}</span>
      <span className='pl-2 block w-full'>{props.product?.size[0]?.price}</span>
      <button 
        onClick={handleCart} 
        className='w-full bg-purple-900 text-gray-100 py-1 rounded cursor-pointer hover:bg-purple-800'>View</button>
    </div>
  )
}

export default Prodcart