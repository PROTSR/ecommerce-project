import { Plus, Search, ChevronRight } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, } from 'recharts'
import Dashcard from './admcomponents/Dashcard'
import Inventorycard from './admcomponents/Inventorycard'
import Form from './admcomponents/Form'
import { useNavigate } from 'react-router-dom'

// 6-Month Mock Sales Data
const salesData = [
    { month: 'Jan', sales: 12400 },
    { month: 'Feb', sales: 18900 },
    { month: 'Mar', sales: 15600 },
    { month: 'Apr', sales: 22800 },
    { month: 'May', sales: 28400 },
    { month: 'Jun', sales: 34200 },
]

const Dashboard = () => {
    const inputRef = useRef(null)
      const navigate = useNavigate();
    

    function handleOnclick() {
        inputRef.current?.focus()
    }

    

    return (
        <section className="h-full bg-gray-200 col-span-10 flex flex-col">
            {/* Header Bar */}
            <div className="bg-gray-50 flex px-8 h-16 items-center justify-between border-b border-gray-200">
                <div className="flex w-96 bg-gray-200 h-9 rounded-xl items-center pl-4 cursor-pointer">
                    <Search size={18} onClick={()=>navigate('/admin/productcrud/addproduct')} className="text-gray-500" />
                    <input
                        ref={inputRef}
                        type="search"
                        className="outline-none w-full bg-transparent h-9 pl-3 text-sm text-gray-700 placeholder-gray-400"
                        placeholder="Search product, customers, and orders here..."
                    />
                </div>
                <button
                    onClick={()=>navigate('/admin/productcrud/addproduct') }
                    className="flex bg-black px-4 py-2 justify-center text-sm text-gray-100 h-9 items-center gap-2 font-bold rounded-xl hover:bg-gray-800 transition-colors">
                    <Plus strokeWidth={3} size={14} />
                    <span>Add Product</span>
                </button>
            </div>
           



            {/* Main Content Area */}
            <div className="bg-gray-100 flex-1 px-8 py-6 gap-6 flex flex-col overflow-y-auto">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

                {/* Dashcards Section */}
                <div className="flex justify-between gap-4">
                    <Dashcard />
                    <Dashcard />
                    <Dashcard />
                    <Dashcard />
                </div>

                {/* Analytics Section */}
                <div className="grid grid-cols-12 gap-6 flex-1 min-h-95">
                    {/* 6-Month Sales Chart */}
                    <div className="col-span-8 bg-gray-50 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">Sales Overview</h2>
                                <p className="text-xs text-gray-500">6-Month Revenue Performance</p>
                            </div>
                            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                                +24% vs Last Period
                            </span>
                        </div>

                        <div className="w-full h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                        tickFormatter={(val) => `$${val / 1000}k`}
                                    />
                                    <Tooltip
                                        formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                                        contentStyle={{
                                            backgroundColor: '#0f172a',
                                            borderRadius: '10px',
                                            color: '#fff',
                                            border: 'none',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                        }}
                                        itemStyle={{ color: '#60a5fa' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="sales"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#salesGradient)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Inventory Alert Column */}
                    <div className="col-span-4 bg-gray-50 p-6 rounded-2xl shadow-sm">
                        <div className='flex justify-between items-center'>
                            <h2 className="text-lg font-bold text-amber-900 ">Inventory Alert</h2>
                            <button className='text-xs flex items-center gap-1'>
                                <span>
                                    View all
                                </span>
                                <ChevronRight size={15} />
                            </button>
                        </div>
                        <div className='mt-5 flex flex-col gap-3'>
                            <Inventorycard />
                            <Inventorycard />
                            <Inventorycard />
                            <Inventorycard />
                            {/* <Inventorycard/> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard