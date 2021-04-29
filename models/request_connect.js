const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RequestConnectSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    },
    subscribe: {
        type: Schema.Types.ObjectId,
        ref: 'subscribe',
        require: true
    },
    date:{
        type: Date,
        required: true,
        default: new Date()
    },
})

module.exports = mongoose.model('request_connect', RequestConnectSchema)