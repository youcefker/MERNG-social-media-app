const { AuthenticationError } = require('apollo-server')

const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

module.exports =(context) => {
    const authHeader = context.req.headers.authorization
    if(authHeader) {
        const token = authHeader.split('Bearer ')[1]
        if(token) {
            try {
                const user = jwt.verify(token, process.env.SECRET_KEY)
                return user
            } catch(err) {
                throw new AuthenticationError('Invalid/expired token')
            }
        } 
        throw new Error('token must be in right format')
    }
    throw new Error('authenticatcation header must be provided') 
}