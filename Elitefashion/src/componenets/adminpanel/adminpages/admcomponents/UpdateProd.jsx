import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Api, UpdateProduct } from '../../../../contex/Api'
import { ThemData } from '../../../../contex/Theme'

const UpdateProd = () => {
  const { categories, setCategories, COLORS, SIZES } = useContext(ThemData)
  const location = useLocation()
  const product = location.state?.productupdate || {
    name: '',
    images: [''],
    category: [],
    description: '',
    size: [
      {
        size: 'S',
        price: 0,
        color: [
          { sku: '', color: ['Black'], stock: 0 }
        ]
      }
    ]
  }

  const [formData, setFormData] = useState(product)
  const uniqueCategory = new Set([...categories, ...formData.category])
  useEffect(() => setCategories([...uniqueCategory]), [categories])

  const [inputCategory, setInputCategory] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()
  console.log(formData)

  // text input
  const nameInputHandler = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // add images
  const addImages = () => {
    setFormData((prev) => ({
      ...prev, images: [...prev.images, '']
    }))
  }

  // remove image
  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev, images: prev.images.filter((_, i) => i !== index)
    }))
  }

  // update images 

  const updateImage = (e, index) => {
    const { value } = e.target

    setFormData((prev) => {
      const updatedImages = [...prev.images]
      updatedImages[index] = value
      return { ...prev, images: updatedImages }
    })
  }

  // update category 
  const handleCategory = (cat) => {
    setFormData((prev) => {
      const exist = prev.category.includes(cat)
      const updatedCategory = exist
        ? prev.category.filter((c) => c !== cat)
        : [...prev.category, cat]
      return { ...prev, category: updatedCategory }
    })
  }

  // add custom category 

  const customCategory = () => {

    const trimmed = inputCategory.trim().toUpperCase()

    if (!trimmed) return
    if (!categories.includes(trimmed)) {
      setCategories((prev) => ([...prev, trimmed]))
    }
    if (!formData.category.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev, category: [...prev.category, trimmed]
      }))
    }
    setInputCategory('')
  }

  // description 
  const handleDescription = (e) => {
    const { value } = e.target
    setFormData((prev) => ({
      ...prev, description: value
    }))
  }

  // add size 
  const addSize = () => {
    const newSize = {
      size: 'S',
      price: 0,
      color: [{
        color: ['Black'],
        sku: '',
        stock: 0
      }]
    }
    setFormData((prev) => ({
      ...prev, size: [...prev.size, newSize]
    }))
  }

  // remove size 
  const removeSize = (index) => {
    setFormData((prev) => ({
      ...prev, size: prev.size.filter((_, idx) => idx !== index)
    }))
  }

  // update size 
  const updateSizePrice = (e, index) => {
    const { name, value } = e.target

    setFormData((prev) => {
      const updatedSize = [...prev.size]
      updatedSize[index] = { ...updatedSize[index], [name]: value }
      return { ...prev, size: updatedSize }
    })
  }

  // update color properties

  const UpdatedColorPropt = (e, sizeId, colorId) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const updatedSizeProp = [...prev.size]
      const colorPropt = [...updatedSizeProp[sizeId].color]
      if (name === 'color') {
        colorPropt[colorId] = { ...colorPropt[colorId], [name]: [value] }
      } else {
        colorPropt[colorId] = { ...colorPropt[colorId], [name]: value }
      }
      updatedSizeProp[sizeId] = { ...updatedSizeProp[sizeId], color: colorPropt }
      return { ...prev, size: updatedSizeProp }

    })
  }

  // add color 
  const addColor = (sizeId) => {
    const newColor = {
      color: ['Black'],
      sku: '',
      stock: 0
    }

   
    setFormData((prev) => {
      const updatedSizeProp = [...prev.size]
      const colorPropt = [...updatedSizeProp[sizeId].color, newColor]
      updatedSizeProp[sizeId] = { ...updatedSizeProp[sizeId], color: colorPropt }
      return { ...prev, size: updatedSizeProp }

    })
  }
 // remove color 
    const removeColor=(cid,sid)=>{
      setFormData((prev)=>{
        const s = [...prev.size]
        const c = s[sid].color.filter((_,i)=>i!==cid)
        s[sid] = {...s[sid],color:c}
        return {...prev,size:s}
      })
    }


  async function handleSubmit(e) {
    try {
      e.preventDefault()
      const response = await UpdateProduct(formData, id)
      if (response.status === 200 || response.status === 204) {
        navigate('/admin/productcrud')
        return alert("Product updated successfully")
      }

      console.log(response.data?.data)

    } catch (e) {
      if (e.response?.status === 404) {
        alert("product not faound")
      } else if (e.response?.status === 403) {
        alert("Access denied,")
      } else {
        alert("Invalid data, enter data properly")
      }
      console.log(e)
    }
  }
  return (
    <div className='text-black p-5  bg-gray-100  col-span-10'>
      <h1 className='text-2xl font-bold mb-6 text-gray-800 border-b pb-2'>Update Product</h1>
      <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-5'>
        <div >
          <label htmlFor='name' className='block mb-1 font-medium' >Product Name*</label>
          <input
            className='w-full h-8 pl-3 rounded-lg outline-none border focus:ring-2 focus:ring-blue-500'
            type="text"
            id='name'
            name='name'
            onChange={(e) => nameInputHandler(e)}
            required
            value={formData?.name}
          />
        </div>
        <div>
          <div className='flex justify-between w-full'>
            <label htmlFor='images' className='block mb-1 font-medium' >Product image URLs*</label>
            <button
              type='button'
              onClick={addImages}
            >
              + Add Images
            </button>
          </div>
          <div className='w-full  flex flex-col gap-2'>
            {formData?.images.map((url, idx) => (
              <div key={idx} className='flex gap-2'>
                {url ? (
                  <img className='h-10 w-10 border rounded-lg' src={`${url}`} />
                ) : (
                  <span className='h-10 w-10 border rounded-lg text-sm'>No image</span>
                )}

                <input
                  className=' h-10 w-full  pl-3 rounded-lg outline-none border focus:ring-2 focus:ring-blue-500'

                  type="url"
                  name='images'
                  required
                  onChange={(e) => updateImage(e, idx)}
                  value={url}
                />
                {formData.images.length > 1 && (
                  <button className='h-10 ' onClick={() => removeImage(idx)} type="button">✕</button>
                )}

              </div>
            ))}
          </div>
        </div>
        <div className=' flex flex-col gap-3'>
          <label className='  font-medium' htmlFor="">Categories * (Select at least one or add new)</label>
          <div className='flex gap-3 flex-wrap  '>
            {categories.map((cat) => (
              <label key={cat} htmlFor={`${cat}`} className={`space-x-2 border px-2  py-1 rounded-lg cursor-pointer transition ${formData.category.includes(cat) && 'bg-blue-100 border-blue-400 text-blue-800'}`}>
                <input
                  type="checkbox"
                  className="rounded text-blue-600 focus:ring-blue-500 mr-1"
                  checked={formData.category.includes(cat)}
                  onChange={() => handleCategory(cat)}
                  name={`${cat}`}
                  id={`${cat}`} />
                <span>{cat}</span>
              </label>
            ))}
          </div>
          <div>
            <input
              className='outline-none border rounded-lg h-8 w-80 mr-2 pl-2 focus:ring-2 focus:ring-blue-500 '
              type="text" placeholder='add category...'
              value={inputCategory}
              onChange={(e) => setInputCategory(e.target.value)} />
            <button type='button' onClick={customCategory} className='bg-blue-500 text-white px-2 h-8 w-20 rounded-md' >+ Add</button>
          </div>
        </div>
        <div>
          <label htmlFor="description" className='block mb-1 font-medium'>Description *</label>
          <textarea
            className='w-full outline-none border-2 rounded-xl pl-2 pt-1 bg-gray-100 focus:ring-2 focus:ring-blue-500 h-20'
            name="description"
            id="description"
            minLength={50}
            value={formData.description}
            placeholder='Product description...'
            onChange={(e) => handleDescription(e)}
          />
          <span className='text-gray-400'>{formData.description.length}/50 characters minimum</span>
        </div>
        <div>
          <div className='flex justify-between items-center mb-3'>
            <h3 className="text-lg font-semibold text-gray-800">Size & Color Variants</h3>
            <button
              type="button"
              className='bg-blue-500 text-white px-2 h-8 w-50 rounded-md'
              onClick={addSize}
            >
              + Add Size Varient
            </button>
          </div>
          <div className='flex flex-col gap-3'>
            {
              formData.size.map((sizeVarient, sid) => (

                <div key={sid} className='w-full bg-gray-200 p-4 flex flex-col gap-6 '>
                  <div className='flex gap-8  '>
                    <div className='w-1/2'>
                      <label htmlFor={`size-${sid}`} className='block mb-0.5 text-xs'>Size</label>
                      <select
                        value={sizeVarient.size}
                        onChange={(e) => updateSizePrice(e, sid)}
                        name="size" id={`size-${sid}`} className='w-full h-11 outline-none border-2 rounded-lg pl-2'>
                        {SIZES.map((item, idx) => (
                          <option key={idx} value={item}>{item}</option>

                        ))}

                      </select>
                    </div>
                    <div className='w-1/2'>
                      <label htmlFor="" className='block mb-0.5 text-xs'>Price (₹)</label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        value={sizeVarient.price}
                        onChange={(e) => updateSizePrice(e, sid)}
                        className='w-full h-11 outline-none border-2 rounded-lg pl-2' />
                    </div>
                    {formData.size.length > 1 && (
                      <button type="button" className='text-red-500 font-semibold mb-2' onClick={() => removeSize(sid)}>
                        Remove
                      </button>
                    )}
                  </div>
                  {/* color */}
                  <div className='flex flex-col gap-3'>

                    <div className='flex items-center justify-between'>
                      <span>Colors for Size {sizeVarient.size}</span>
                      <button
                        type="button"
                        onClick={() => addColor(sid)}
                        className='text-blue-800 text-sm font-bold'>+ Add Color</button>
                    </div>
                    {sizeVarient.color.map((c, cid) => (
                      <div key={cid} className='px-3 border-l flex flex-col justify-between h-11'>
                        <div className='w-full flex justify-between gap-5 p-2 border'>
                          <input
                            type="text"
                            name='sku'
                            value={c.sku}
                            onChange={(e) => UpdatedColorPropt(e, sid, cid)}
                            placeholder="SKU (e.g. SHT-BLK-S)"
                            className='w-1/3 outline-none border pl-2' />
                          <select
                            value={c.color[0]}
                            onChange={(e) => UpdatedColorPropt(e, sid, cid)}
                            name="color"
                            id="color"
                            className='w-1/3 outline-none border pl-2' >
                            {COLORS.map((item, idx) => (
                              <option key={idx} value={item}>{item}</option>

                            ))}
                          </select>
                          <input
                            value={c.stock}
                            className='w-1/3 outline-none border pl-2'
                            type="number"
                            name="stock"
                            onChange={(e) => UpdatedColorPropt(e, sid, cid)}
                            id="stock"
                          />
                        {sizeVarient?.color.length > 1 && (
                          <button type="button" className='text-red-500 font-semibold mb-2 text-xs' onClick={() => removeColor(cid,sid)}>
                            Remove
                          </button>
                        )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            }

          </div>
        </div>
        {/* submit and cancel button */}

        <div className='w-full flex items-center justify-center gap-3'>
          <button
            type="button"
            onClick={() => navigate('/admin/productcrud')}
            className="w-60 bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition"
          >Cancel</button>
          <button
            type="submit"
            className="w-60 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition"
          >Save Product</button>

        </div>
      </form>
    </div>
  )
}

export default UpdateProd