const bcrypt = require('bcryptjs')
const errors = require('restify-errors')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const auth = require('../auth')
const config = require('../config')

module.exports = server => {
    //Register User
    server.post('/register', async (req, res, next) => {
        const {
            email,
            password
        } = req.body

        const user = new User({
            email,
            password
        })

        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(user.password, salt)
            user.password = hashedPassword

            //save user
            try {
                const newUser = await user.save()
                res.send(201)
            } catch (error) {
                return next(new errors.InternalError(error.message))
            }
        } catch (error) {
            throw Error(error.message)
        }
    })

    //Auth user
    server.post('/auth', async (req, res, next) => {
        const {
            email,
            password
        } = req.body

        try {
            //Authenticate
            const user = await auth.authenticate(email, password)

            //Create JWT
            const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
                expiresIn: '15m'
            })

            const {
                iat,
                exp
            } = jwt.decode(token)

            //Respond with token
            res.send({
                iat,
                exp,
                token
            })

            next()
        } catch (error) {
            //User unauthorized
            return next(new errors.UnauthorizedError(error))
        }
    })
}