require('dotenv').config()
const cors = require('cors')
const express = require('express')
const connectDb = require('./database/db')
const ProductRoute= require('./routes/productRoute')
const UserRoute = require('./routes/userRoute')
const AdminRoute = require('./routes/adminRoute')
const cookieParser = require('cookie-parser')

const app = express();
connectDb()
app.use(cookieParser())
app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true ,
  allowedHeaders: ['Content-Type', 'Authorization']               
}))

app.use('/api/products',ProductRoute)

app.use('/api/auth',UserRoute)
app.use('/api/admin_auth',AdminRoute)


const Port = process.env.PORT || 3000


app.listen(Port,()=>console.log(`app is running on ${Port}`))