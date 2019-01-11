const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
// const User = mongoose.model('user')
const User = require('./models/User')

exports.authenticate = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Get user by email
            const user = await User.findOne({
                email
            })

            //Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err

                if (isMatch) {
                    resolve(user)
                } else {
                    reject("Authentication Failed")
                }
            })

        } catch (error) {
            //Email Not Found
            reject("Authentication Failed")
        }
    })
}