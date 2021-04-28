const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    companyName:{
        type: String,
        required: true
    },
    jobPosition:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        default: 'not active'
    },
    subscribe:{
        type: String,
        required: true,
        default: 'free'
    },
    date:{
        type: Date,
        required: true,
        default: new Date()
    },
})

UserSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
})

module.exports = mongoose.model('user', UserSchema)