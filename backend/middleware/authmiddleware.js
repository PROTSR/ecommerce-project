require('dotenv').config()
const jwt = require('jsonwebtoken')



const authMiddleware = async (req, res, next) => {
    try {
        // const authheader = req.headers.authorization
        // if (!authheader || !authheader.startsWith('Bearer ')) {
        //     return res.status(401).json({ message: 'Unauthorized' })
        // }
        // const token = authheader.split(' ')[1]
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Token payload is empty' });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.userInfo = decode

        return next()

    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Forbidden Access: Invalid or expired token' })
        }

        return res.status(500).json({ message: 'Internal Server Error' })
    }

}

module.exports = authMiddleware