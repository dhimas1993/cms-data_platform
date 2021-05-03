const User = require('../models/user.model')
const Link = require('../models/link.model')
const RequestConnect = require('../models/request_connect')

const nodemailer = require('nodemailer')

module.exports = {
    login : async (req,res) => {
        try {
            const {email} = req.body
            const response = await User.findOne({ email : email })
            
            if(response !== null ){
                res.status(200).json('SUCCESS')
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
    },
    confirmationCode : async (req,res) => {
        try {
            const {id} = req.params
            const response = await User.findOne({token : id})
            if(response){
                response.status = 'active'
                response.save()
                
                res.status(200).json('SUCCESS')
            } else {
                res.status(201).json('FAIL')
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    getUser : async (req,res) => {
        try {
            const {id} = req.params
            const response = await User.findOne({ _id : id })
            .populate('subscribe')

            if(response){
                res.status(200).json(response)
            } else {
                res.status(200).json('FAIL')
            }

        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    database : async (req,res) => {
        try {
            const {id} = req.body
            const response = await User.findOne({ _id : id }).populate('subscribe')
            const link = await Link.find().populate('subscribe')
            
            let pro = []
            let free = []

            for (let i = 0; i < link.length; i++) {
                const item = link[i].subscribe.name;
                const data = link[i]
                
                if(item == 'FREE'){
                    free.push(data)
                } else if(item == 'PRO'){
                    pro.push(data)
                }
            }

            if(response.subscribe.name == 'FREE'){
                res.status(200).json(free)
            } else {
                res.status(200).json(pro)
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    requestConnect : async (req,res) => {
        try {
            const {id} = req.body
            const response = await User.findOne({ _id : id }).populate('subscribe')
            const link = await RequestConnect.find().populate('subscribe')
            
            let pro = []
            let free = []

            for (let i = 0; i < link.length; i++) {
                const item = link[i].subscribe.name;
                const data = link[i]
                
                if(item == 'FREE'){
                    free.push(data)
                } else if(item == 'PRO'){
                    pro.push(data)
                }
            }

            if(response.subscribe.name == 'FREE'){
                res.status(200).json(free)
            } else {
                res.status(200).json(pro)
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}