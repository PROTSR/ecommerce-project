const express = require('express')
const Product = require('../models/products')
const CartModel = require('../models/ProductCart')
const mongoose = require('mongoose')
const Order = require('../models/Order')

const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find({})
        if (allProducts.length > 0) {
            res.status(201).json({
                success: true,
                message: 'all products fetched successfully',
                data: allProducts
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'products not found'
            })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "something went wrong, try again"
        })
    }
}
const getProductById = async (req, res) => {
    try {
        const productId = req.params.id
        const desiredProduct = await Product.findById(productId)
        if (desiredProduct) {
            res.status(201).json({
                success: true,
                messgae: "Product fetched successfully",
                data: desiredProduct
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'product not found, try different id'
            })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "something went wrong, try again"
        })
    }

}
const AddProduct = async (req, res) => {
    try {
        const productData = req.body
        const newProduct = await Product.create(productData)
        if (newProduct) {
            res.status(201).json({
                success: true,
                message: 'product added successfully',
                data: newProduct
            })
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "something went wrong, try again"
        })
    }
}
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const updatedDeatails = req.body
        const updatedProduct = await Product.findByIdAndUpdate(productId, updatedDeatails, { new: true })
        if (updateProduct) {
            res.status(200).json({
                success: true,
                message: "product updated succesfully",
                data: updatedProduct
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'product not found, try different id'
            })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "something went wrong, try again"
        })
    }
}
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const deletedProduct = await Product.findByIdAndDelete(productId)
        if (deletedProduct) {
            res.status(200).json({
                success: true,
                message: "product deleted succesfully",
                data: deletedProduct
            })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "something went wrong, try again"
        })
    }
}

const addToCart = async (req, res) => {
    try {
        const CartItemData = req.body
        const newItem = await CartModel.create(CartItemData)
        if (newItem) {
            return res.status(201).json({
                data: newItem
            })
        }

    } catch (error) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "something went wrong, try again"
        })
    }


}

const addOrder = async (req, res) => {
    try {
        const { userId } = req.userInfo
        const { orderItems, customerId, taxPrice, shippingCharge, totalPrice, paymentResult, paymentType, paymentDetail, shippingAddress, isDelevered, isPaid, paidAt } = req.body


        if(paymentType === 'card'){
            const date = paymentDetail.cardDate.length === 4
            const cvv = paymentDetail.cvc.length === 3
            const cardNumber = paymentDetail.cardNumber.length === 15

            if(!date || !cvv || !cardNumber){
                return res.status(400).json({message:'Enter valid details'})
            }
        }

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'no order items provided' })
        }
        let subTotal = 0
        let formattedOrder = []

        for (const item of orderItems) {
            const product = await Product.findOne({ 'size.color.sku': item.sku })

            if (!product) {
                return res.status(404).json({ message: `Product not found` });
            }

            let sizeObj = null
            let colorVArientObj = null

            for (const size of product.size) {

                const foundProduct = size.color.find((i) => i.sku === item.sku)

                if (foundProduct) {
                    sizeObj = size
                    colorVArientObj = foundProduct
                    break
                }
            }

            if (colorVArientObj.stock < item.quantity) {
                return res.status(400).json({ message: `${product.name} is out of stock` });
            }

            colorVArientObj.stock -= item.quantity

            subTotal += (sizeObj.price * item.quantity)

            await product.save()

            formattedOrder.push({
                color: item.color,
                name: item.name,
                size: sizeObj.size,
                image: item.image,
                price: sizeObj.price,
                quantity: item.quantity,
                sku: item.sku
            })

        }
        const tax = (subTotal * 8) / 100

        const newOrder = await Order.create({
            customerId: userId,
            orderItems: formattedOrder,
            taxPrice: tax,
            shippingCharge: 15,
            totalPrice: subTotal + tax + 15,
            paymentType: paymentType,
            paymentDetail: paymentType === 'card' ? paymentDetail: {cardNumber:null,cardDate:null,cvc:null},
            paymentResult: paymentResult,
            shippingAddress: shippingAddress,
            isPaid: isPaid,
            paidAt: paidAt,
            isDelevered: isDelevered,
            deleveredAt: null
        })
        // if (!newOrder) {

        // }
        res.status(201).json({ message: 'Order added successfully', data: newOrder })


    } catch (error) {
        res.status(500).json({ message: `something wrong ${error}` })
    }
}

const productAnalytics = async (req, res) => {
    try {
        const stats = await Order.aggregate([
            {
                $lookup:{
                    from:"Products",
                    localField:""
                }
            },
            {
                $addFields:{
                    subtotal:{
                        $subtract : [ {$subtract:["$totalPrice","$taxPrice"]},"$shippingCharge"]
                    },
                    totalProducts:{
                        $sum:"$orderItems.quantity"
                    }
                }
            },
           
            {
                $group: {
                    _id:null,
                    totalSales:{$sum:"$subtotal"},
                    products:{
                        $sum:"$totalProducts"
                    },
                    orders:{
                        $sum:1
                    }
                }
            }
        ])

        res.status(200).json({data:stats})
    } catch (e) {
        console.log(e)
        res.status(500).json({message:`something wrong ${e}` })
    }
}


module.exports = { deleteProduct, updateProduct, AddProduct, getProductById, getAllProducts, addToCart, addOrder,productAnalytics }