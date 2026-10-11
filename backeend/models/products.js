const mongoose = require('mongoose')

const colorVarient = new mongoose.Schema({
    sku: {
        type: String,
        required: [true, 'SKU is required'],
        unique: true, // Guarantees no two variants share the same SKU
        trim: true,
        uppercase: true // Standard practice for SKUs (e.g., TS-BLK-M-001)
    },
    color: {
        type: [String],
        required: true,
        enum: ['Black', 'Blue', 'Maroo', 'Olive', 'Brown', 'Beige', 'Navy', 'Green', 'Grey', 'White']
    },
    stock: {
        type: Number,
        required: true,
        min: [0],
        default: 0
    }
})

const SizeVarient = new mongoose.Schema({
    size: {
        type: String,
        required: true,
        enum: ['S', 'M', 'L', 'XL', 'XXL']
    },
    price: {
        type: Number,
        required: [true, 'price is mandatory'],
        min: [0],
        default: 0
    },
    color: [colorVarient]

})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is  required!'],
        maxLength: [100, 'name can not be exceeded than 100 characters'],
        trim: true
    },
    images: {
        type: [String],
        required: [true, 'At least one image URL is required'],
        validate: [
            (val) => val.length > 0,
            'Please provide at least one product image URL'
        ]
    },
    size: [SizeVarient],
    category: {
        type: [String],
        required: [true, 'Please provide at least one category'],
        validate: [
            (val) => Array.isArray(val) && val.length > 0,
            'Please select or enter at least one category'
        ]
    },
    description: {
        type: String,
        required: [true, 'write product description'],
        minLength: [50, 'Minimum 150 characters of description']
    }

})

// productSchema.index({ 'size.color.sku': 1 }, { unique: true });

module.exports = mongoose.model('products', productSchema)