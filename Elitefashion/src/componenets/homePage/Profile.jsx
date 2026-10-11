import React, { useContext, useState, useEffect } from 'react';
import { User, Package, CheckCircle, Edit3, X, Save, Clock, ChevronRight } from 'lucide-react';
import { ThemData } from '../../contex/Theme';
import { getUser, UpdateProfile } from '../../contex/Api';
import { useNavigate } from 'react-router-dom';

const INITIAL_ORDERS = [
  {
    id: 'ORD-94820',
    date: 'August 18, 2026',
    status: 'Delivered',
    total: '$129.50',
    items: [
      { name: 'Wireless Ergonomic Keyboard', qty: 1, price: '$89.50' },
      { name: 'Desk Mat (Large)', qty: 1, price: '$40.00' },
    ],
  },
  {
    id: 'ORD-83912',
    date: 'July 28, 2026',
    status: 'In Transit',
    total: '$75.00',
    items: [
      { name: 'USB-C Charging Hub', qty: 1, price: '$75.00' },
    ],
  },
  {
    id: 'ORD-71029',
    date: 'June 10, 2026',
    status: 'Delivered',
    total: '$210.00',
    items: [
      { name: 'Smart Fitness Band', qty: 1, price: '$150.00' },
      { name: 'Replacement Strap Pair', qty: 2, price: '$30.00' },
    ],
  },
];

export default function Profile() {
  const navigate = useNavigate();
  const { setUserDetail, userDetail,userToken, setUserToken,getUserDetail } = useContext(ThemData);
  const [activeTab, setActiveTab] = useState('personal');
  const [user, setUser] = useState(userDetail || {});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userDetail || {});
  const [showSuccess, setShowSuccess] = useState(false);

  // Sync local state when userDetail context updates
  useEffect(() => {
    if (userDetail && Object.keys(userDetail).length > 0) {
      setUser(userDetail);
      setFormData(userDetail);
    }
  }, [userDetail]);

  // useEffect(() => {
  //   if(userToken){
  //     getUserDetail();
  //   }
  //  }, []);

  // async function getUserDetail() {
  //   try {
  //     const response = await getUser();
  //     const data = response.data?.data;

  //     console.log('User Data Received:', data);

  //     if (data) {
  //       setUserDetail(data);
  //       setUser(data);
  //       setFormData(data);
  //     }
  //   } catch (error) {
  //     if (error.response?.status === 403 || error.response?.status === 401) {
  //       alert("Your session has expired. Please log in again.");
  //       setUserDetail(null);
  //       localStorage.removeItem('usertoken')
  //       setUserToken(null)
  //       navigate('/login');
  //     }
  //   }
  // }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await UpdateProfile(formData)
      console.log(response.data)
      if (response.status !== 200) {
        return alert(response.data?.message)
      }
      setUser(formData);
      setUserDetail(formData);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error(error.response?.data?.message || error.message)
    }

  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('usertoken');
    setUserToken(null)
    setUserDetail(null);
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
        >
          Log Out
        </button>
      </div>

      {/* Top Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab('personal')}
            className={`pb-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'personal'
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
          >
            <User className="w-4 h-4" /> Personal Details
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'orders'
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
          >
            <Package className="w-4 h-4" /> Orders
          </button>
        </nav>
      </div>

      {/* Success Notification */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl flex items-center gap-2 text-sm">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>Profile details updated successfully!</span>
        </div>
      )}

      {/* Tab Content: Personal Details */}
      {activeTab === 'personal' && (
        <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
              <p className="text-sm text-gray-500">Manage your personal details and address.</p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Edit3 className="w-4 h-4" /> Edit Details
              </button>
            )}
          </div>

          <form onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData?.name || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                ) : (
                 user &&  <p className="text-base font-medium text-gray-900">{ user?.name }</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Gender
                </label>
                {isEditing ? (
                  <select
                    name="gender"
                    value={formData?.gender || 'MALE'}
                    onChange={handleInputChange}
                    className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                ) : (
                 user &&  <p className="text-base font-medium text-gray-900 capitalize">
                    {user?.gender ? user.gender.toLowerCase() : 'N/A'}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData?.email || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                ) : (
                 user &&  <p className="text-base font-medium text-gray-900">{user?.email || 'N/A'}</p>
                )}
              </div>

              {/* Address Fields */}
              <div className="md:col-span-2 pt-4 border-t border-gray-100">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Street
                </label>
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="street"
                      placeholder="Street"
                      value={formData?.street || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                ) : (
                  <div className="text-base font-medium text-gray-900">
                  { user &&  <p>{user?.street || 'No address saved'}</p>}
                  </div>
                )}
              </div>
              <div className='md:col-span-2 pt-4 border-t border-gray-100 grid md:grid-cols-2 gap-6'>
                {/* state Fields */}
                <div className="">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    State
                  </label>
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData?.state || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  ) : (
                    <div className="text-base font-medium text-gray-900">
                      {user && <p>{user?.state || 'No address saved'}</p>}
                    </div>
                  )}
                </div>
                {/* City Fields */}
                <div >
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    City
                  </label>
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData?.city || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  ) : (
                    <div className="text-base font-medium text-gray-900">
                    { user &&  <p>{user?.city || 'No address saved'}</p>}
                    </div>
                  )}
                </div>
                {/* pincode Fields */}
                <div >
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Pincode
                  </label>
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="number"
                        name="pincode"
                        placeholder="Pincode"
                        value={formData?.pincode || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  ) : (
                    <div className="text-base font-medium text-gray-900">
                     {user &&  <p>{user?.pincode || 'No address saved'}</p>}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-black transition-colors"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
                >
                  <Save className="w-4 h-4" /> Update Details
                </button>
              </div>
            )}
          </form>
        </div>
      )}

      {/* Tab Content: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">Order History</h2>
            <p className="text-sm text-gray-500">View and track your previous purchases.</p>
          </div>

          {INITIAL_ORDERS.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:border-gray-200 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-900 text-base">{order.id}</span>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${order.status === 'Delivered'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                        }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Placed on {order.date}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500 uppercase tracking-wider block">Total</span>
                  <span className="text-lg font-bold text-gray-900">{order.total}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="mt-4 space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">
                      {item.name} <span className="text-gray-400 text-xs">(x{item.qty})</span>
                    </span>
                    <span className="font-medium text-gray-900">{item.price}</span>
                  </div>
                ))}
              </div>

              {/* Footer CTA */}
              <div className="mt-4 pt-3 border-t border-gray-50 flex justify-end">
                <button className="text-xs font-semibold text-black hover:underline flex items-center gap-1">
                  View Order Details <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}