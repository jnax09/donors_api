const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const Schema = mongoose.Schema

const DonorSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    contribution: {
        type: Number,
        default: 0
    },
})

DonorSchema.plugin(timestamp)

const Donor = mongoose.model('Donor', DonorSchema)

module.exports = Donor