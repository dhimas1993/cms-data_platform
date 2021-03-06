const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const Link = require('../models/link.model')
const Captable = require('../models/captable_model')
const RequestConnect = require('../models/request_connect')
const amountSubscribe = require('../models/amount_subscribe.model')

const nodemailer = require('nodemailer')

module.exports = {
    login : async (req,res) => {
        try {
            const { email, password } = req.body
            const users = await User.findOne({
                email: email,
                status: 'active',
            })
            // console.log(users)
            if(users === null){
                return res.send('FAILED')
            } else {
                const match = await bcrypt.compare(password, users.password)
                if(match){
                    return res.status(200).json(users)
                } else {
                    return res.status(500).json('PASSWORD NOT MATCH')
                }
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },
    register : async (req,res) => {
        try {
            const {name, companyName, jobPosition, email, password} = req.body
            const user_exist = await User.findOne({ email : email })

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    // user: 'support@bubu.com',
                    // pass: 'BubuSukses1'
                    user: 'startupindonesia@bubu.com',
                    pass: 'bubusid_!'
                }
            });

            const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

            let token = '';
            for (let i = 0; i < 25; i++) {
                token += characters[Math.floor(Math.random() * characters.length )];
            }

            let mailOptions = {
                from: 'startupindonesia@bubu.com',
                to: email,
                subject: 'Confirmation Email',
                html: `
                    <div>
                        <h3>Hi ${name}</h3>
                        <p>Thank you for signing up to SID! Please click the link below to confirm your email address and start your trial. Use our platform to see brand new data every week and help you unlock opportunities in the private sector. </p>
                        </br> 
                        <a href="${process.env.WEB_URI}/confirmation-email/${token}"> Click Here !! </a> 
                        </br>
                        <h4>To enjoy more benefits, switch over to our Pro plan to get</h4>
                        <ul>
                            <li>Unlimited Dealsourcing</li>
                            <li>Signalling</li>
                            <li>Quarterly Startup Report</li>
                        </ul>

                        <p>For further inquiries, please reach out our team at startupindonesia@bubu.com</p>
                        <p>We are #ConnectingWithImpact 
                        Follow us on Instagram (@startupindonesia_co), Facebook & LinkedIn Startup Indonesia</p>
                        <p>Best Regards,
                        StartupIndonesia.co Committee</p>
                    </div>
                `
            };
            if(!user_exist){
                await User.create({
                    name : name, 
                    companyName : companyName, 
                    jobPosition : jobPosition, 
                    email : email, 
                    password : password, 
                    token: token
                })
                
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err)
                        throw err
                    console.log('Email sent: ' + info.response)
                    res.send({
                        status: 200,
                        data: "SUCCEESS"
                    })
                });
                
            } else {
                res.status(200).json('FAIL')
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    forgetPassword : async (req,res) => {
        try {
            const {email} = req.body
            const response = await User.findOne({email : email}).populate('subscribe')

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'support@bubu.com',
                    pass: 'BubuSukses1'
                }
            });

            let mailOptions = {
                from: 'support@bubu.com',
                to: response.email,
                subject: 'SID_DATA Forget Password',
                html: `
                    <div>
                        <h4>Halo Team</h4>
                        <h4>Silehkan Klik link berikut untuk merubah password anda anda</h4>

                        </br>
                        
                        <p>Account dibawah ini menyatakan setuju dengan ingin menrubah password</p>
                        <h4> Link           : <a href="https://data.startupindonesia.co/confirmation-password/${response._id}" target"_blank">Click here !!</a> </h4>
                    </div>
                `
            };

            if(response){
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) throw err;
                    console.log('Email sent: ' + info.response);
                    res.send({
                        status : 200,
                        data : "SUCCEESS"
                    })
                });
            } else {
                res.status(500).json('FAIL')
            }
            // res.status(200).json(response.email)
        } catch (error) {
            res.status(201).json({"error" : error.message})
        }
    },
    confirmationPassword : async (req,res) => {
        try {
            const { id, password } = req.body
            const users = await User.findOne({
                _id : id,
            })
            users.password = password
            await users.save()
            res.status(200).json('SUCCESS')
        } catch (error) {
            res.status(404).json(error)
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
            const {id} = req.body
            const response = await User.findOne({ _id : id })
            .populate('subscribe')
            const subs = response.subscribe.name

            if(response){
                response.token = subs
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
            let enterprise = []

            for (let i = 0; i < link.length; i++) {
                const item = link[i].subscribe.name;
                const data = link[i]
                
                if(item == 'FREE'){
                    free.push(data)
                } else if(item == 'PRO'){
                    pro.push(data)
                } else if(item == 'ENTERPRISE'){
                    enterprise.push(data)
                }
            }

            if(response.subscribe.name === 'FREE'){
                res.status(200).json(free)
            } else if(response.subscribe.name === "PRO"){
                res.status(200).json(pro)
            } else {
                res.status(200).json(enterprise)
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    subscribe : async (req,res) => {
        try {
            const {id, email, name} = req.body
            const response = await User.findOne({_id : id}).populate('subscribe')

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'support@bubu.com',
                    pass: 'BubuSukses1'
                }
            });

            let mailOptions = {
                from: 'upport@bubu.com',
                to: 'startupindonesia@bubu.com',
                subject: 'SID_DATA Subscribe Request',
                html: `
                    <div>
                        <h4>Halo Team</h4>
                        <h4>Silehkan Klik link berikut untuk konfirmasi email anda</h4>

                        </br>
                        
                        <p>Account dibawah ini menyatakan setuju dengan ingin berlangganan</p>
                        <h4> Name           : ${response.name} </h4>
                        <h4> email          : ${response.email} </h4>
                        <h4> subscribe type : PRO </h4>
                    </div>
                `
            };

            if(response){
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) throw err;
                    console.log('Email sent: ' + info.response);
                    res.send({
                        status : 200,
                        data : "SUCCEESS"
                    })
                });
            } else {
                res.status(500).json('FAIL')
            }
        } catch (error) {
            res.status(201).json({"error" : error.message})
        }
    },
    captable : async (req,res) => {
        try {
            const {id} = req.body
            const response = await User.findOne({ _id : id }).populate('subscribe')
            const link = await Captable.find().populate('subscribe')
            
            let pro = []
            let free = []
            let enterprise = []

            for (let i = 0; i < link.length; i++) {
                const item = link[i].subscribe.name;
                const data = link[i]
                
                if(item == 'FREE'){
                    free.push(data)
                } else if(item == 'PRO'){
                    pro.push(data)
                } else if(item == 'ENTERPRISE'){
                    enterprise.push(data)
                }
            }

            if(response.subscribe.name == 'FREE'){
                res.status(200).json(free)
            } else if(response.subscribe.name == 'PRO'){
                res.status(200).json(pro)
            } else {
                res.status(200).json(enterprise)
            }
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
}