const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubscribeSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    link: {
        type: Array,
        required: true
    }
})


module.exports = mongoose.model('subscribe', SubscribeSchema)