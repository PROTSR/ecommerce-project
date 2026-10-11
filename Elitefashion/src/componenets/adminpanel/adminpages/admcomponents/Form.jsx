
import React, { useState } from 'react';
import { PostMethod } from '../../../../contex/Api';

const DEFAULT_CATEGORIES = ['JEANS', 'PENTS', 'FORMAL', 'TROUSER', 'SHIRT', 'TSHIRT', 'CASUAL'];
const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const COLORS = ['Black', 'Blue', 'Maroo', 'Olive', 'Brown', 'Beige', 'Navy', 'Green', 'Grey', 'White'];

const Form = (props) => {
  // State for available categories (initialized with defaults)
  const [categoriesList, setCategoriesList] = useState(DEFAULT_CATEGORIES);
  const [newCategoryInput, setNewCategoryInput] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    images: [''], // Array of image URL strings
    category: [],
    description: '',
    size: [
      {
        size: 'S',
        price: 0,
        color: [{ sku: '', color: ['Black'], stock: 0 }]
      }
    ]
  });

  // Handle basic fields
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- IMAGE URL HANDLERS ---
  const handleImageChange = (index, value) => {
    setFormData((prev) => {
      const updatedImages = [...prev.images];
      updatedImages[index] = value;
      return { ...prev, images: updatedImages };
    });
  };

  const addImageInput = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImageInput = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // --- CATEGORY HANDLERS ---
  const handleCategoryChange = (cat) => {
    setFormData((prev) => {
      const exists = prev.category.includes(cat);
      const updatedCategories = exists
        ? prev.category.filter((c) => c !== cat)
        : [...prev.category, cat];
      return { ...prev, category: updatedCategories };
    });
  };

  // Add custom user-typed category
  const handleAddCustomCategory = () => {
    const trimmed = newCategoryInput.trim().toUpperCase();
    if (!trimmed) return;

    // Add to selectable list if unique
    if (!categoriesList.includes(trimmed)) {
      setCategoriesList((prev) => [...prev, trimmed]);
    }

    // Automatically check/select the newly added category
    if (!formData.category.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        category: [...prev.category, trimmed]
      }));
    }

    setNewCategoryInput('');
  };

  // Size Variant Handlers
  const addSizeVariant = () => {
    setFormData((prev) => ({
      ...prev,
      size: [
        ...prev.size,
        { size: 'M', price: 0, color: [{ sku: '', color: ['Black'], stock: 0 }] }
      ]
    }));
  };

  const removeSizeVariant = (sizeIdx) => {
    setFormData((prev) => ({
      ...prev,
      size: prev.size.filter((_, idx) => idx !== sizeIdx)
    }));
  };

  const handleSizeChange = (sizeIdx, field, value) => {
    setFormData((prev) => {
      const updatedSizes = [...prev.size];
      updatedSizes[sizeIdx][field] = value;
      return { ...prev, size: updatedSizes };
    });
  };

  // Color Variant Handlers
  const addColorVariant = (sizeIdx) => {
    setFormData((prev) => {
      const updatedSizes = [...prev.size];
      updatedSizes[sizeIdx].color.push({ sku: '', color: ['Black'], stock: 0 });
      return { ...prev, size: updatedSizes };
    });
  };

  const removeColorVariant = (sizeIdx, colorIdx) => {
    setFormData((prev) => {
      const updatedSizes = [...prev.size];
      updatedSizes[sizeIdx].color = updatedSizes[sizeIdx].color.filter((_, idx) => idx !== colorIdx);
      return { ...prev, size: updatedSizes };
    });
  };

  const handleColorChange = (sizeIdx, colorIdx, field, value) => {
    setFormData((prev) => {
      const updatedSizes = [...prev.size];
      if (field === 'color') {
        updatedSizes[sizeIdx].color[colorIdx].color = [value];
      } else {
        updatedSizes[sizeIdx].color[colorIdx][field] = value;
      }
      return { ...prev, size: updatedSizes };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.category.length === 0) {
      alert('Please select or add at least one category.');
      return;
    }

    const cleanedData = {
      ...formData,
      images: formData.images.filter((url) => url.trim() !== '')
    };
    
    await PostMethod(cleanedData);

    // Reset Form State
    setFormData({
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
    });
  };

  return (
    <div className="col-span-10 p-6 bg-white shadow-lg border border-gray-200 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            maxLength={100}
            required
            value={formData.name}
            onChange={handleTextChange}
            placeholder="e.g. Premium Cotton Slim Fit Shirt"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* IMAGE URL INPUT SECTION */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-semibold text-gray-700">
              Product Image URLs *
            </label>
            <button
              type="button"
              onClick={addImageInput}
              className="text-xs bg-blue-50 text-blue-600 font-semibold px-3 py-1 rounded hover:bg-blue-100 border border-blue-200 transition"
            >
              + Add Another Image URL
            </button>
          </div>

          <div className="space-y-3">
            {formData.images.map((url, imgIdx) => (
              <div key={imgIdx} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded border bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                  {url ? (
                    <img
                      src={url}
                      alt={`Preview ${imgIdx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/40x40?text=Err';
                      }}
                    />
                  ) : (
                    <span className="text-[10px] text-gray-400">No Image</span>
                  )}
                </div>

                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => handleImageChange(imgIdx, e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />

                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageInput(imgIdx)}
                    className="text-red-500 hover:text-red-700 text-sm font-bold px-2 py-1"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Categories Section */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Categories * (Select at least one or add new)
          </label>

          {/* Selectable Checkboxes */}
          <div className="flex flex-wrap gap-3 mb-3">
            {categoriesList.map((cat) => (
              <label
                key={cat}
                className={`inline-flex items-center space-x-2 text-sm border px-3 py-1.5 rounded-md cursor-pointer transition ${
                  formData.category.includes(cat)
                    ? 'bg-blue-100 border-blue-400 text-blue-800'
                    : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.category.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>

          {/* Add Custom Category Input */}
          <div className="flex gap-2 max-w-sm">
            <input
              type="text"
              value={newCategoryInput}
              onChange={(e) => setNewCategoryInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddCustomCategory();
                }
              }}
              placeholder="Add custom category (e.g. HOODIES)"
              className="flex-1 px-3 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase"
            />
            <button
              type="button"
              onClick={handleAddCustomCategory}
              className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              + Add
            </button>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Description * (Min 50 characters)
          </label>
          <textarea
            name="description"
            rows="4"
            minLength={50}
            required
            value={formData.description}
            onChange={handleTextChange}
            placeholder="Provide a detailed product description..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <span className="text-xs text-gray-400">
            {formData.description.length} / 50 characters minimum
          </span>
        </div>

        {/* Size & Color Nested Variants */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Size & Color Variants</h3>
            <button
              type="button"
              onClick={addSizeVariant}
              className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition"
            >
              + Add Size Variant
            </button>
          </div>

          <div className="space-y-4">
            {formData.size.map((sizeItem, sizeIdx) => (
              <div key={sizeIdx} className="p-4 border border-blue-100 rounded-lg bg-blue-50/30 space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-600">Size</label>
                    <select
                      value={sizeItem.size}
                      onChange={(e) => handleSizeChange(sizeIdx, 'size', e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md bg-white"
                    >
                      {SIZES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-600">Price (₹)</label>
                    <input
                      type="number"
                      min={0}
                      required
                      value={sizeItem.price}
                      onChange={(e) => handleSizeChange(sizeIdx, 'price', Number(e.target.value))}
                      className="w-full mt-1 p-2 border rounded-md bg-white"
                    />
                  </div>

                  {formData.size.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSizeVariant(sizeIdx)}
                      className="text-red-500 text-sm hover:underline mt-5"
                    >
                      Remove Size
                    </button>
                  )}
                </div>

                {/* Nested Color Variants */}
                <div className="pl-4 border-l-2 border-blue-200 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Colors for Size ({sizeItem.size})
                    </span>
                    <button
                      type="button"
                      onClick={() => addColorVariant(sizeIdx)}
                      className="text-xs text-blue-600 font-semibold hover:underline"
                    >
                      + Add Color
                    </button>
                  </div>

                  {sizeItem.color.map((colorItem, colorIdx) => (
                    <div key={colorIdx} className="grid grid-cols-12 gap-2 items-center bg-white p-2 border rounded-md">
                      <div className="col-span-4">
                        <input
                          type="text"
                          required
                          placeholder="SKU (e.g. SHT-BLK-S)"
                          value={colorItem.sku}
                          onChange={(e) => handleColorChange(sizeIdx, colorIdx, 'sku', e.target.value.toUpperCase())}
                          className="w-full p-1.5 border rounded text-xs uppercase"
                        />
                      </div>

                      <div className="col-span-4">
                        <select
                          value={colorItem.color[0]}
                          onChange={(e) => handleColorChange(sizeIdx, colorIdx, 'color', e.target.value)}
                          className="w-full p-1.5 border rounded text-xs"
                        >
                          {COLORS.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div className="col-span-3">
                        <input
                          type="number"
                          min={0}
                          placeholder="Stock"
                          required
                          value={colorItem.stock}
                          onChange={(e) => handleColorChange(sizeIdx, colorIdx, 'stock', Number(e.target.value))}
                          className="w-full p-1.5 border rounded text-xs"
                        />
                      </div>

                      <div className="col-span-1 text-center">
                        {sizeItem.color.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeColorVariant(sizeIdx, colorIdx)}
                            className="text-red-500 font-bold hover:text-red-700"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit & Cancel Buttons */}
        <div className="flex flex-col justify-center items-center gap-4">
          <button
            type="submit"
            className="w-1/2 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition"
          >
            Save Product
          </button>
          
          <button
            type="button"
            onClick={() => props.clicked(false)}
            className="w-1/2 bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;