require('dotenv').config()
const jwt = require('jsonwebtoken')



const AdminMiddleware = async (req,res,next)=>{
    try {
        // const authheader= req.headers.authorization
        // if(!authheader || !authheader.startsWith('Bearer ')){
        //     return res.status(401).json({message:'Unauthorized'})
        // }
        // const token = authheader.split(' ')[1]
        const token = req.cookies.token
        
        const decode = jwt.verify(token,process.env.ADMIN_JWT_SECRET_KEY)
        const isAdmin= decode.employee_code
        if(!isAdmin){
            return res.status(403).json({message:"Forbidden: Admin access required"})
        }
        req.userInfo = decode

       return next()

    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Forbidden Access: Invalid or expired token' })
        }
        
        return res.status(500).json({ message: 'Internal Server Error' })
    }
  
}

module.exports = AdminMiddleware