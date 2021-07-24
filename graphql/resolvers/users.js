const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')
const { validateRegisterInput, validateLoginInput } = require('../../util/validators')

const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, process.env.SECRET_KEY, {expiresIn: '1h'})
}

module.exports = {
    Mutation: {
        register: async (_, 
                {
                    registerInput: {username, email, password, confirmPassword}
                }
            ) => {
            //TODO: validate user data
            const { errors, valid } = validateRegisterInput(
                username,
                email,
                password, 
                confirmPassword
            )
            if(!valid) {
                throw new UserInputError('errors', { errors })
            }
            //TODO: make sure user doesn't exist
            const user = await User.findOne({username})
            if (user) {
                throw new UserInputError('username is taken', {
                    errors: 'username is taken'
                })
            }
            //TODO: hash password and Token
            password = await bcrypt.hash(password, 12)
            const newUser = new User({
                username,
                email,
                password,
                createdAt: new Date().toISOString()
            })
            const res = await newUser.save()
            const token = generateToken(res)
            return {
                ...res._doc,
                id: res._id,
                token
            }
             
        },


        login: async (_,{username, password}) => {
            const { errors, valid } = validateLoginInput(username, password)
            if(!valid) {
                throw new UserInputError('Errors', {errors})
            }

            const user = await User.findOne({ username })
            if(!user) {
                user.general = "User not found"
                throw new UserInputError('User not found', {errors})
            }
            const match = bcrypt.compare(password, user.password)
            if(!match) {
                user.general = "Wrong credentials"
                throw new UserInputError('Wrong credentials', {errors})
            }
            const token = generateToken(user)
            return {
                ...user,
                id: user._id,
                token
            }
        }
    }
}