import React, { useContext, useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { ThemData } from '../../../../contex/Theme'
import UpdateProd from './UpdateProd'
import { useNavigate } from 'react-router-dom'
import { DeleteProduct } from '../../../../contex/Api'



const ProductTable = () => {
  const {productData}=useContext(ThemData)
  // const [isUpdate,setIsUpdate]=useState(false)
  const navigate = useNavigate()

  const delProduct =async (id)=>{
    try {
      const res = await DeleteProduct(id)
      if(res.status === 200 || res.status === 204){
        alert("product deleted successfully")
      }
    } catch (e) {
      if(e.res.status === 404){
        alert('product not found')
      }
      if(e.res.status === 403){
        alert('Access denied')
      }
      console.error(e)
    }
  }
  return (
    <div className="w-full h-full bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden  ">
      <div className="">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <th className="py-4 px-6 font-semibold">Product</th>
              <th className="py-4 px-6 font-semibold">Category</th>
              <th className="py-4 px-6 font-semibold">Price</th>
              <th className="py-4 px-6 font-semibold">Stock</th>
              <th className="py-4 px-6 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {productData.map((product,idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                {/* Product Column */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover bg-gray-100 border border-gray-200"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800 text-sm">
                        {product.name}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">
                       SKU:  {product.size[0]?.color[0]?.sku}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="py-4 px-6 text-gray-600 font-medium">
                  {product.category.join(' ')}
                </td>

                {/* Price */}
                <td className="py-4 px-6 font-semibold text-gray-800">
                  {product.size[0]?.price}
                </td>

                {/* Stock */}
                <td className="py-4 px-6 text-gray-600">
                  {product.size[0]?.color[0]?.stock }
                </td>

                

                {/* Actions */}
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                      title="Edit Product"
                      onClick={()=>navigate(`/admin/productcrud/UpdateProduct/${product._id}`,{ state:{productupdate:product}})}
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors"
                      title="Delete Product"
                      onClick={()=>delProduct(product._id)}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* {isUpdate && <UpdateProd/>} */}
    </div>
  )
}

export default ProductTable