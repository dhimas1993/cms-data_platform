const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const AdminSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
    },
    status:{
        type: String,
        default: 'active'
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true,
        default: new Date()
    },
})

AdminSchema.pre('save', async function(next){
    const admin = this
    if(admin.isModified('password')){
        admin.password = await bcrypt.hash(admin.password, 8)
    }
})

module.exports = mongoose.model('admin', AdminSchema)