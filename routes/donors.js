const errors = require('restify-errors')
const Donor = require('../models/Donor')
const rjwt = require('restify-jwt-community')
const config = require('../config')

module.exports = server => {
    //Get donors
    server.get('/donors', async (req, res, next) => {
        try {
            const donors = await Donor.find({})
            res.send(donors)
            next()
        } catch (error) {
            return next(new errors.InvalidContentError(err))
        }
    })

    //Get single donor
    server.get('/donors/:id', async (req, res, next) => {
        try {
            const donor = await Donor.findById(req.params.id)
            res.send(donor)
            next()
        } catch (error) {
            return next(new errors.ResourceNotFoundError(`Donor with id ${req.params.id} not found`))
        }
    })

    //Add donor
    server.post('/donors', rjwt({
        secret: config.JWT_SECRET
    }), async (req, res, next) => {
        //Check for content-type being json
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"))
        }

        const {
            name,
            email,
            contribution
        } = req.body

        const donor = new Donor({
            name,
            email,
            contribution
        })

        try {
            const newDonor = await donor.save()
            res.send(201)
            next()
        } catch (error) {
            return next(new errors.InternalError(error.message))
        }
    })

    //Update Donor
    server.put('/donors/:id', rjwt({
        secret: config.JWT_SECRET
    }), async (req, res, next) => {
        //Check for content-type being json
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"))
        }

        try {
            const donor = await Donor.findOneAndUpdate({
                    _id: req.params.id
                },
                req.body, {
                    new: true
                }
            )
            res.send(200)
            next()
        } catch (error) {
            return next(new errors.ResourceNotFoundError(`Donor with id ${req.params.id} not found`))
        }
    })

    //Delete Donor
    server.del('/donors/:id', rjwt({
        secret: config.JWT_SECRET
    }), async (req, res, next) => {
        try {
            const donor = await Donor.findOneAndDelete({
                _id: req.params.id
            })
            res.send(204)
            next()
        } catch (error) {
            return next(new errors.ResourceNotFoundError(`Donor with id ${req.params.id} not found`))
        }
    })
}