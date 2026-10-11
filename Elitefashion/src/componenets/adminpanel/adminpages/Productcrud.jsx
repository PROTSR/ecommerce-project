




import React, { useRef } from 'react'
import { Plus, Search } from 'lucide-react'
import ProductTable from './admcomponents/ProductTable' // Import the table component
import { useNavigate } from 'react-router-dom'

const Productcrud = () => {
  const inputRef = useRef(null)
  const navigate = useNavigate();
  function handleOnclick() {
    inputRef.current?.focus()
  }

  return (
    <section className="h-full bg-gray-100 col-span-10 px-8 py-8 flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products Management</h1>
          
        </div>
        <button 
        onClick={()=>navigate('/admin/productcrud/addproduct')}
        className="flex bg-black px-4 py-2 justify-center text-sm text-gray-100 h-9 items-center gap-2 font-bold rounded-xl hover:bg-gray-800 transition-colors">
          <Plus strokeWidth={3} size={14} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex justify-between items-center bg-white py-4 px-4 rounded-2xl shadow-sm gap-4">
        <div className="flex flex-1 bg-gray-200 h-9 rounded-xl items-center pl-4 focus-within:bg-white focus-within:ring-2 focus-within:ring-gray-300 transition-all cursor-pointer">
          <Search size={18} onClick={handleOnclick} className="text-gray-500" />
          <input
            ref={inputRef}
            type="search"
            className="outline-none w-full bg-transparent h-9 pl-3 text-sm text-gray-700 placeholder-gray-400"
            placeholder="Filter products by name or SKU..."
          />
        </div>

        <div className="flex gap-3">
          <select className="bg-gray-200 h-9 px-4 text-sm font-medium text-gray-700 rounded-xl outline-none cursor-pointer">
            <option value="">All Categories</option>
            <option value="Jeans">Jeans</option>
            <option value="Trousers">Trousers</option>
            <option value="Shirts">Shirts</option>
            <option value="Tshirts">Tshirts</option>
            <option value="Formal">Formal</option>
            <option value="Casuals">Casuals</option>
          </select>
          <select className="bg-gray-200 h-9 px-4 text-sm font-medium text-gray-700 rounded-xl outline-none cursor-pointer">
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Low Stocks">Low Stock</option>
            <option value="Out Of Stocks">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Product Table */}
      <ProductTable />
    </section>
  )
}

export default Productcrud