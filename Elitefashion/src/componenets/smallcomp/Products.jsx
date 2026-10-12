

import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Star, ShieldCheck, Truck, RefreshCw } from 'lucide-react'
import { ThemData } from '../../contex/Theme'

const Products = () => {
  const { cartItems, setCartItems } = useContext(ThemData)
  const location = useLocation()
  const navigate = useNavigate()
  const productDetail = location.state?.productDetails
  console.log(productDetail)

  // Fallback state when page is directly refreshed without router state
  if (!productDetail) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
        <p className="text-gray-600 mb-6">No product data was passed to this page.</p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-purple-700 text-white px-5 py-2.5 rounded-lg hover:bg-purple-800 transition-colors"
        >
          <ArrowLeft size={18} /> Back to Products
        </button>
      </div>
    )
  }

  // Handle selected size index from product structure: product?.size[i]
  const name = productDetail.name
  const [isClicked, setIsClicked] = useState(false)
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0)
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [newCartItem, setNewCartItem] = useState({
    name: productDetail.name || '',
    price: 0,
    size: '',
    color: '',
    quantity: 1,
    sku: ''
  })

  const sizeObj = productDetail.size[selectedSizeIndex]
  const currentPrice = sizeObj?.price
  const currentcolors = sizeObj?.color
  const selectColor = currentcolors[selectedColorIndex]
  // update quantity

  const updateQuantity = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta))
    // setNewCartItem((prev) => ({ ...prev, quantity: quantity }))
  }




  const cartHandler = () => {

    const newCart = {
      name: productDetail.name || '',
      price: sizeObj.price,
      image:productDetail.images[0],
      size: sizeObj.size,
      color: selectColor.color,
      quantity: quantity,
      sku: selectColor.sku
    }


    setCartItems((prev) => {
      const existSameItem = prev.findIndex((item) => item.sku === newCart.sku)
      if (existSameItem > -1) {
        const updatedCart = [...prev]
        updatedCart[existSameItem] = { ...updatedCart[existSameItem], quantity: updatedCart[existSameItem].quantity + newCart.quantity }
        return setCartItems(updatedCart)
      }
      return [...prev,newCart]
    })
    console.log(newCart)
    console.log(cartItems)
  }







  return (
    <section className="max-w-6xl  m-auto mt-4 p-4 md:p-4 font-sans h-[87.5%]  ">
      <button>Back</button>
      <div className='md:grid md:grid-cols-12 md:h-140 p-4 md:mt-2 md:p-4 border '>


        <div className='bg-amber-400 md:col-span-6'>image</div>
        <div className='bg-amber-50 md:col-span-6 md:flex md:flex-col px-8 py-4 justify-around'>
          <h1 className='text-4xl font-bold'>{productDetail.name} </h1>
          <div className='font-bold text-lg '>
            <label className='block mb-1'>Sizes :</label>
            <div className='text-xs flex gap-3 pl-1'>
              {
                productDetail.size.map((item, idx) => (
                  <button
                    key={idx}
                    className={`border h-8 w-8 p-1 ${selectedSizeIndex === idx
                      ? 'border-purple-700  bg-purple-700 text-white'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}
                    onClick={() => setSelectedSizeIndex(idx)}
                  >

                    {item.size}
                  </button>
                ))
              }
            </div>

          </div>
          <div className='font-bold text-lg '>
            <label className='block mb-1'>Colors :</label>
            <div className='text-sm pl-1'>
              {currentcolors.map((item, idx) => (
                <button
                  key={idx}
                  className={`border h-8  p-1 ${selectedColorIndex === idx
                    ? 'border-purple-700  bg-purple-700 text-white'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}
                  onClick={() => setSelectedColorIndex(idx)}
                >

                  {item.color}
                </button>
              ))
              }
            </div>

          </div>
          <span className='text-2xl font-bold text-purple-700'>5400/-</span>
          <div className=' flex items-center '>
            <button className='h-8 w-8 border-black border font-bold text-purple-700 text-lg'
              onClick={() => updateQuantity(-1)}
            >
              -
            </button>
            <div className='h-8 w-8 border-black border-y font-bold bg-purple-700 text-white text-lg text-center'>
              {quantity}
            </div>
            <button className='h-8 w-8 border-black border font-bold text-purple-700 text-lg'
              onClick={() => updateQuantity(1)}

            >
              +
            </button>
          </div>
          <button
            onClick={cartHandler}
            className='w-full bg-gray-900 text-gray-100 h-10 rounded-xl font-bold active:bg-purple-800'>
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  )
}

export default Products