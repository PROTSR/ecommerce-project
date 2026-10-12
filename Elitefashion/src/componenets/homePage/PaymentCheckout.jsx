import React, { useContext, useState, useMemo } from 'react';
import { MapPin, Plus, UserCheck, CreditCard, ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemData } from '../../contex/Theme';
import { AddOrder } from '../../contex/Api';



export default function PaymentCheckout() {
  const { userDetail, cartItems } = useContext(ThemData)
  const navigate = useNavigate()
  const location = useLocation()

  const SAVED_PROFILE_ADDRESSES = [{
    label: 'Home',
    name: userDetail?.name,
    street: userDetail?.street,
    state: userDetail?.state,
    city: userDetail?.city,
    pincode: userDetail?.pincode

  }];
  console.log(SAVED_PROFILE_ADDRESSES)
  const totalAmount = location.state?.totalPay || 0
  const shippingCharge = location.state?.shippingCharge || 15
  const tax = location.state?.tax || 0
  const [addresses, setAddresses] = useState([]);
  const allAddress = [...SAVED_PROFILE_ADDRESSES, ...addresses]
  const [selectedAddressId, setSelectedAddressId] = useState(0);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [paymentDetail, setPaymentDetail] = useState({ cardNumber: undefined, cvc: undefined, cardDate: '' })
  const [orderDetail, setOrderDetail] = useState({
    customerId: '',
    orderItems: [],
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      pincode: 0,
    },
    paymentType: '',
    paymentDetail: {},
    paymentResult: false,
    taxPrice: 0,
    shippingCharge: 0,
    totalPrice: 0,
    isPaid: false,
    paidAt: Date.now(),
    isDelevered: false,
    deleveredAt: ''

  })

  // New Address Form State
  const [newAddress, setNewAddress] = useState({
    label: '',
    name: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleInputChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleSaveNewAddress = (e) => {
    e.preventDefault();
    if (!newAddress.street || !newAddress.city || !newAddress.pincode) return;

    const createdAddress = {
      ...newAddress,
      label: newAddress.label || 'Custom Address',
    };

    setAddresses([...addresses, createdAddress]);
    setSelectedAddressId(SAVED_PROFILE_ADDRESSES.length + addresses.length - 1);
    setIsAddingNew(false);
    setNewAddress({ label: '', name: '', street: '', city: '', state: '', pincode: '' });
  };

  const handleInputPayments = (e) => {
    setPaymentDetail((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    console.log(paymentDetail)
  }

  const handlePlaceOrder = async () => {
    try {
       if(paymentMethod === 'card' && (!paymentDetail.cardNumber || !paymentDetail.cardDate || !paymentDetail.cvc))return
      const orderObj = {
        customerId: userDetail._id,
        orderItems: [...cartItems],
        shippingAddress: {
          street: allAddress[selectedAddressId].street,
          city: allAddress[selectedAddressId].city,
          state: allAddress[selectedAddressId].state,
          pincode: allAddress[selectedAddressId].pincode,
        },
        paymentType: paymentMethod,
        paymentDetail: { ...paymentDetail },
        paymentResult: 'success',
        taxPrice: tax,
        shippingCharge: shippingCharge,
        totalPrice: totalAmount,
        isPaid: true,
        paidAt: Date.now(),
        isDelevered: false
        // deleveredAt: null 

      }
      // setOrderDetail(orderObj)
      console.log(orderObj)
      const response =await AddOrder(orderObj)
      console.log(response.data)
      setPaymentDetail({})
      setIsOrderPlaced(true);
      localStorage.removeItem('cart')
    } catch (error) {
      console.log(error)
    }

  };

  if (isOrderPlaced) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. We've sent a confirmation email with your order details.
        </p>
        <button
          onClick={() => navigate('/')}
          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Back to Store
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 font-sans">
      {/* Navigation & Header */}
      <button
        onClick={() => navigate('/cart')}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Cart
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Main Flow: Address & Payment */}
        <div className="lg:col-span-2 space-y-8">

          {/* Section 1: Address Selection */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-700" /> Shipping Address
              </h2>
              {!isAddingNew && (
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add New Address
                </button>
              )}
            </div>

            {/* List of Profile & Saved Addresses */}
            {!isAddingNew && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allAddress.map((addr, idx) => {
                  const isSelected = selectedAddressId === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedAddressId(idx)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${isSelected
                        ? 'border-black bg-gray-50/50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <span className="font-semibold text-sm text-gray-900">{addr.label}</span>
                      {addr.name && <p className="text-sm font-medium text-gray-800">{addr.name}</p>}
                      {addr.street && <p className="text-xs text-gray-500 mt-1">{addr.street}</p>}
                      {addr.city && addr.state && addr.pincode && (
                        <p className="text-xs text-gray-500">{addr.city}, {addr.state} {addr.pincode}</p>)
                      }
                    </div>
                  );
                })}
              </div>
            )}

            {/* Form: Add New Address */}
            {isAddingNew && (
              <form onSubmit={handleSaveNewAddress} className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-sm text-gray-800">Add New Shipping Address</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="label"
                    placeholder="Address Label (e.g. Vacation Home)"
                    value={newAddress.label}
                    onChange={handleInputChange}
                    className="p-2.5 text-sm border border-gray-300 rounded-lg w-full"
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    value={newAddress.name}
                    onChange={handleInputChange}
                    className="p-2.5 text-sm border border-gray-300 rounded-lg w-full"
                  />
                </div>

                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  required
                  value={newAddress.street}
                  onChange={handleInputChange}
                  className="p-2.5 text-sm border border-gray-300 rounded-lg w-full"
                />

                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    required
                    value={newAddress.city}
                    onChange={handleInputChange}
                    className="p-2.5 text-sm border border-gray-300 rounded-lg w-full"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    required
                    value={newAddress.state}
                    onChange={handleInputChange}
                    className="p-2.5 text-sm border border-gray-300 rounded-lg w-full"
                  />
                  <input
                    type="text"
                    name="pincode"
                    placeholder="PINCODE"
                    required
                    value={newAddress.pincode}
                    onChange={handleInputChange}
                    className="p-2.5 text-sm border border-gray-300 rounded-lg w-full"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingNew(false)}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-black"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-black text-white rounded-lg font-medium hover:bg-gray-800"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Section 2: Payment Method */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-gray-700" /> Payment Method
            </h2>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="accent-black"
                />
                <span className="font-medium text-sm text-gray-800">Credit or Debit Card</span>
              </label>

              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={paymentMethod === 'wallet'}
                  onChange={() => setPaymentMethod('wallet')}
                  className="accent-black"
                />
                <span className="font-medium text-sm text-gray-800">Wallet</span>
              </label>
            </div>

            {paymentMethod === 'card' && (
              <div className="mt-4 space-y-3 pt-2">
                <input
                  type="text"
                  name='cardNumber'
                  value={paymentDetail.cardNumber}
                  onChange={(e) => handleInputPayments(e)}
                  placeholder="Card Number"
                  required
                  className="p-2.5 text-sm border border-gray-300 rounded-lg w-full"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name='cardDate'
                    value={paymentDetail.cardDate}
                    onChange={(e) => handleInputPayments(e)}
                    placeholder="MM/YY"
                    required
                    className="p-2.5 text-sm border border-gray-300 rounded-lg w-full"
                  />
                  <input
                    type="number"
                    name='cvc'
                    value={paymentDetail.cvc}
                    onChange={(e) => handleInputPayments(e)}
                    placeholder="CVC"
                    className="p-2.5 text-sm border border-gray-300 rounded-lg w-full"
                    required
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-fit">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Summary</h2>

          <div className="border-b border-gray-100 pb-4 mb-4 text-sm text-gray-600 space-y-2">
            <div className="flex justify-between">
              <span>Total Amount:</span>
              <span className="font-bold text-gray-900">{totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-black text-white py-3.5 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-sm"
          >
            Pay {totalAmount.toFixed(2)}
          </button>

          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-4">
            <ShieldCheck className="w-4 h-4" /> Secure Encrypted Checkout
          </div>
        </div>

      </div>
    </div>
  );
}