const Admin = require('../models/admin.model')
const User = require('../models/user.model')
const Subscribe = require('../models/subscribe.model')
const Link = require('../models/link.model')
const RequestConnect = require('../models/request_connect')

const nodemailer = require('nodemailer')

module.exports = {
    login : async (req,res) => {
        try {
            const {email} = req.body
            const response = await User.find({ email : email })

            if(response[0]){
                res.status(200).json(response)
            } else {
                res.status(201).json('FAIL')
            }
        } catch (error) {
            res.status(200).json(error.message)
        }
    },

    register : async (req,res) => {
        try {
            const {name, companyName, jobPosition, email, password} = req.body
            const user_exist = await User.findOne({ email : email })

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'support@bubu.com',
                    pass: 'BubuSukses1'
                }
            });

            const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

            let token = '';
            for (let i = 0; i < 25; i++) {
                token += characters[Math.floor(Math.random() * characters.length )];
            }

            let mailOptions = {
                from: 'support@bubu.com',
                to: email,
                subject: 'Confirmation Email',
                html: `
                    <div>
                        <h3>Halo ${name}</h3>
                        <h3>Silehkan Klik link berikut untuk konfirmasi email anda</h3>
                        </br> 
                        <a href="${process.env.WEB_URI}/confirmationCode/${token}">Click Here !!</a> 
                    </div>
                `
            };            
            
            if(user_exist == null){
                const post = await User.create({
                    name : name, 
                    companyName : companyName, 
                    jobPosition : jobPosition, 
                    email : email, 
                    password : password, 
                    token: token
                })

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) throw err;
                    console.log('Email sent: ' + info.response);
                    res.send({
                        status : 200,
                        data : "SUCCEESS"
                    })
                });
            } else {
                res.status(200).json('FAIL')
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}