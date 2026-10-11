import React, { useContext } from 'react'
import { UserRoundPen, ShoppingCart } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { ThemData } from '../contex/Theme'

const Nav = () => {
    const { userToken } = useContext(ThemData)
    return (
        <nav className=' md:flex md:justify-between md:px-14  md:items-center md:h-15 md:sticky md:top-0 md:z-50 bg-gray-200  '>

            <h1 className='md:text-4xl font-semibold font-sans'>Elite Fashion</h1>
            <div className='md:flex md:gap-8 md:text-md md:items-center ' >
                
                <input type="search"
                    placeholder='Search here...'
                    name="" id=""
                    className='outline-none md:w-150 text-sm md:h-10 md:pl-4 md:pb-1 rounded-xl bg-gray-800 text-gray-100 md:placeholder:text-gray-400 md:placeholder:text-sm'
                />
            </div>
            <div className='md:flex md:gap-10 md:text-md'>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/cart'><ShoppingCart /></NavLink>
                {
                    userToken
                        ? <NavLink to='/profile'><UserRoundPen /></NavLink>
                        : (
                            <>
                                <NavLink to='/login'>login</NavLink>
                                <NavLink to='/signup'>Sign up</NavLink>

                            </>
                        )
                }

                
            </div>
        </nav>
    )
}

export default Nav