import React, { useContext, useState } from 'react';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemData } from '../../contex/Theme';


export default function Cart() {
  const { cartItems, setCartItems} = useContext(ThemData);
  const navigate = useNavigate()

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item,i) => {
        if (i === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })

      
  );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item,i) => i !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 15.00 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center bg-white rounded-xl shadow-sm border border-gray-100 mt-10">
        <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <button className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 font-sans">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item,idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg bg-gray-50 shrink-0"
                />
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    Color: {item.color} | Size: {item.size}
                  </p>
                  <p className="text-gray-900 font-bold mt-1">{item.price.toFixed(2)|| 'NAN'}</p>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0">
                {/* Quantity Controls */}
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => updateQuantity(idx, -1)}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-l-lg transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-medium text-gray-800">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(idx, 1)}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-r-lg transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Total & Remove */}
                <div className="flex items-center gap-4">
                  <span className="font-bold text-gray-900 min-w-17.5 text-right">
                    {(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeItem(idx)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-fit">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="font-semibold text-gray-900">{shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax (8%)</span>
              <span className="font-semibold text-gray-900">{tax.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t border-gray-100 my-4 pt-4 flex justify-between text-base font-bold text-gray-900">
            <span>Total</span>
            <span>{total.toFixed(2)}</span>
          </div>

          <button
            onClick={() => navigate('/payment',{state:{totalPay:total,tax:tax,shippingCharge:shipping}})}
            className="w-full mt-4 bg-black text-white py-3.5 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-sm">
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}