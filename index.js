const restify = require('restify')
const mongoose = require('mongoose')
const config = require('./config')
const donorsRoutes = require('./routes/donors')
const usersRoutes = require('./routes/users')
const rjwt = require('restify-jwt-community')

const server = restify.createServer()

//middleware
server.use(restify.plugins.bodyParser())

//protect routes
// server.use(rjwt({secret: config.JWT_SECRET}).unless({ path: ['/auth'] }))

//listen
server.listen(config.PORT, () => {
    mongoose.connect(config.MONGODB_URI, {
        useNewUrlParser: true
    })
})

const db = mongoose.connection

db.on('errors', (err) => {
    console.log(err)
})

db.once('open', () => {
    donorsRoutes(server)
    usersRoutes(server)
    console.log(`Server started on port ${config.PORT}`)
})