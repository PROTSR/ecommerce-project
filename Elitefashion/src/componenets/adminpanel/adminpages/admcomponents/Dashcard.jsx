import React from 'react'
import { BadgeIndianRupee } from 'lucide-react'
const Dashcard = () => {
    return (
        <div className='h-30 w-70 bg-gray-50 p-6 flex shadow-sm justify-between items-center rounded-2xl '>
            <div className='flex flex-col justify-between gap-1'>
                <div className='text-sm'>TOTAL SALES</div>
                <span className='text-3xl font-bold w-30 text-wrap'>₹1202112</span>
                <div className='text-xs'>+12.4% from last month</div>
            </div>
            <BadgeIndianRupee className='bg-green-100 rounded-2xl p-2' size={55} color="#6ed053" strokeWidth={1.5} />

        </div>
    )
}

export default Dashcard