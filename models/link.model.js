const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LinkSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    },
    subscribe: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true,
        default: new Date()
    },
})

module.exports = mongoose.model('link', LinkSchema)