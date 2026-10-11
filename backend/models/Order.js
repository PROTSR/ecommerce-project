const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        reuired: true
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            sku: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
            // product:{
            //     type:mongoose.Schema.Types.ObjectId,
            //     required:true,
            //     ref:'products'
            // }
        }
    ],
    shippingAddress: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        }
    },
    paymentType: {
        type: String,
        required: true
    },
    paymentDetail: {
        cardNumber: { type: Number },
        cvc: { type: Number },
        cardDate: { type: Number }
        
    },
    paymentResult: {
        type: String,
        required: true
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingCharge: {
        type: Number,
        required: true,
        default: 0
    },
    totalPrice: {
        type: Number,
        reuired: true,
        default: 0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date,
    },
    isDelevered: {
        type: Boolean,
        required: true,
        default: false
    },
    deleveredAt: {
        type: Date,
    }


}, { timestamps: true })


module.exports = mongoose.model('Orders', OrderSchema)