const express = require('express')
const {deleteProduct,updateProduct,AddProduct,getProductById,getAllProducts,addOrder} = require('../controllers/productController')
const AdminMiddleware = require('../middleware/AdminMiddleware')
const authMiddleware = require('../middleware/authmiddleware')
const route = express.Router()


route.get('/get',getAllProducts)
route.get('/get/:id',getProductById)
route.post('/add',AdminMiddleware,AddProduct)
route.put('/update/:id',AdminMiddleware,updateProduct)
route.delete('/delete/:id',AdminMiddleware,deleteProduct)
route.post('/orders',authMiddleware,addOrder)


module.exports = route