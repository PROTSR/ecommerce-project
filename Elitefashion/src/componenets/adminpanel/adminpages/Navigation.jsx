import { LayoutDashboard, Package, Layers, TriangleAlert, NotepadText, Users } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'


const Navigation = () => {
    return (
        <section className='h-full  bg-gray-50 col-span-2 flex flex-col gap-4 border-r border-gray-200'>
            <div className='h-22 flex justify- items-center gap-3 px-7 border-b border-gray-200'>
                <span className='bg-black text-gray-50 text-2xl text-center h-8 w-8 rounded-md'>U</span>
                <span className='text-md'>Admin name</span>
            </div>
            <div className='px-5 flex flex-col gap-2'>
                <span className='text-xs pl-2'>MAIN NAVIGATION</span>
                <div className='flex flex-col gap-1' >
                    <NavLink
                        to='/admin/dashboard'
                        className={({ isActive }) => `${(isActive ? 'bg-gray-800 text-gray-50' : 'hover:bg-gray-200')} flex gap-2  h-10 text-sm font-bold pl-4 items-center rounded-xl`}>
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink
                        to='/admin/productcrud'
                        className={({ isActive }) => `${(isActive ? 'bg-gray-800 text-gray-50' : 'hover:bg-gray-200')} flex gap-2  h-10 text-sm font-bold pl-4 items-center rounded-xl`}>
                        <Package size={18} />
                        <span>Product CRUD</span>
                    </NavLink>
                    <NavLink
                        to='/admin/categories'
                        className={({ isActive }) => `${(isActive ? 'bg-gray-800 text-gray-50' : 'hover:bg-gray-200')} flex gap-2  h-10 text-sm font-bold pl-4 items-center rounded-xl`}>
                        <Layers size={18} />
                        <span>Categories</span>
                    </NavLink>
                    <NavLink
                        to='/admin/stocks'
                        className={({ isActive }) => `${(isActive ? 'bg-gray-800 text-gray-50' : 'hover:bg-gray-200')} flex gap-2  h-10 text-sm font-bold pl-4 items-center rounded-xl`}>
                        <TriangleAlert size={18} />
                        <span>Stock</span>
                    </NavLink>
                    <NavLink
                        to='/admin/orders'
                        className={({ isActive }) => `${(isActive ? 'bg-gray-800 text-gray-50' : 'hover:bg-gray-200')} flex gap-2  h-10 text-sm font-bold pl-4 items-center rounded-xl`}>
                        <NotepadText size={18} />
                        <span>Orders</span>
                    </NavLink>
                    <NavLink
                        to='/admin/customers'
                        className={({ isActive }) => `${(isActive ? 'bg-gray-800 text-gray-50' : 'hover:bg-gray-200')} flex gap-2  h-10 text-sm font-bold pl-4 items-center rounded-xl`}>
                        <Users size={18} />
                        <span>Customers</span>
                    </NavLink>
                    <NavLink
                        to='/admin/signup'
                        className={({ isActive }) => `${(isActive ? 'bg-gray-800 text-gray-50' : 'hover:bg-gray-200')} flex gap-2  h-10 text-sm font-bold pl-4 items-center rounded-xl`}>
                        <Users size={18} />
                        <span>Sign Up</span>
                    </NavLink>






                </div>
            </div>
        </section>
    )
}

export default Navigation