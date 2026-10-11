import React from 'react'

const Inventorycard = () => {
    return (
        <div className='flex justify-between items-center bg-gray-100 px-3 py-2 rounded-2xl'>
            <img
                className='h-12 w-12 bg-white rounded-xl '
                src=""
            />
            <div>
                <p className='text-sm font-bold'>Ergonomic Mesh Office Chair</p>
                <span className='text-xs'>SKU: CHR-ERG-02</span>
            </div>
            <span className='bg-red-200 w-12 text-center rounded-full px-1 py-1 text-xs'>8 left</span>
        </div>
    )
}

export default Inventorycard