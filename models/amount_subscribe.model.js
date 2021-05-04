const mongoose = require('mongoose')
const Schema = mongoose.Schema

const amountSubscribeSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    subscribe: {
        type: Schema.Types.ObjectId,
        ref: 'subscribe',
        require: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        required: true,
        default: new Date()
    }
})


module.exports = mongoose.model('subscribe_amount', amountSubscribeSchema)