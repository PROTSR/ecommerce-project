import React from 'react'

const Cart = (props) => {
  return (
    <div className='  w-50 h-60 border-2 border-gray-400 py-2'>
    <span className='text-center block w-full'>{props.name}</span>
      <img className='h-50 w-full' src={`${props.img}`} alt=""/>
    </div>
  )
}

export default Cart