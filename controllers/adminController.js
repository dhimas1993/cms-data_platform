const Admin = require('../models/admin.model')
const User = require('../models/user.model')
const Subscribe = require('../models/subscribe.model')
const Link = require('../models/link.model')
const RequestConnect = require('../models/request_connect')

module.exports = {
    viewDashboard : (req,res) => {
        try {
            const currentMenu = req.route.path.toString();
            res.render('admin/dashboard/view_dashboard', {currentMenu})
        } catch (error) {
            console.log(error.message)
        }
    },

    viewAdmin : async (req,res) => {
        try {
            const currentMenu = req.route.path.toString();
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            const admin = await Admin.find()

            res.render('admin/admin/view_admin', {
                currentMenu,
                alert,
                admin
            })
        } catch (error) {
            console.log(error.message)
        }
    },
    addAdmin: async (req,res) => {
        try {
            const {name, email, password} = req.body
            
            await Admin.create({
                name : name,
                password: password,
                email : email,
            })
            req.flash('alertMessage', 'Success add admin')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/admin')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/admin')
        }
    },
    editAdmin: async (req,res) => {
        try {
            const {id,name,email,password} = req.body
            const admin = await Admin.findOne({ _id : id });

            if(password === ''){
                admin.name = name
                admin.email = email
                await admin.save()
            } else {
                admin.name = name
                admin.email = email
                admin.password = password
                await admin.save()
            }

            req.flash('alertMessage', "SUCCESS EDIT")
            req.flash('alertStatus', 'success')
            res.redirect('/admin/admin')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/admin')
        }
    },
    deleteAdmin: async (req,res) => {
        try {
            const {id} = req.params
            const admin = await Admin.findOne({
                _id : id
            });
            
            await admin.remove()
            req.flash('alertMessage', "SUCCESS DELETE")
            req.flash('alertStatus', 'success')
            res.redirect('/admin/admin')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/admin')
        }
    },

    viewUser : async (req,res) => {
        try {
            const currentMenu = req.route.path.toString();
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            const user = await User.find()
            res.render('admin/user/view_user',{
                currentMenu,
                alert,
                user
            })
        } catch (error) {
            console.log(error.message)
        }
    },
    addUser: async (req,res) => {
        try {
            const {name, companyName, jobPosition, email, password} = req.body
            const user_exist = await User.find({ email : email })
            if(!user_exist[0]){
                await User.create({
                    name, companyName, jobPosition, email, password
                })
            } else {
                res.send('Email sudah ada')
            }
            req.flash('alertMessage', 'Success add admin')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/admin')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/admin')
        }
    },
    editUser: async (req,res) => {
        try {
            const {id,subscribe} = req.body
            const user = await User.findOne({ _id : id });
            
            user.subscribe = subscribe
            await user.save()
            // res.send(req.body)
            req.flash('alertMessage', "SUCCESS EDIT")
            req.flash('alertStatus', 'success')
            res.redirect('/admin/user')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/user')
        }
    },

    viewSubscribes : async (req,res) => {
        try {
            const currentMenu = req.route.path.toString();
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            const subscribe = await Subscribe.find()
            res.render('admin/subscribe/view_subscribe',{
                currentMenu,
                alert,
                subscribe
            })
        } catch (error) {
            console.log(error.message)
        }
    },
    addSubscribes: async (req,res) => {
        try {
            const {name} = req.body
            await Subscribe.create({
                name
            })
            req.flash('alertMessage', 'Success add admin')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/subscribe')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/subscribe')
        }
    },
    editSubscribes: async (req,res) => {
        try {
            const {id,name} = req.body
            const subscribe = await Subscribe.findOne({ _id : id });
            
            subscribe.name = name
            await subscribe.save()
            
            req.flash('alertMessage', "SUCCESS EDIT")
            req.flash('alertStatus', 'success')
            res.redirect('/admin/subscribe')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/subscribe')
        }
    },

    viewLink : async (req,res) => {
        try {
            const currentMenu = req.route.path.toString();
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            const subscribe = await Subscribe.find()
            const link = await Link.find().populate('subscribe')

            // console.log(link)
            res.render('admin/link/view_link',{
                currentMenu,
                alert,
                subscribe,
                link
            })
        } catch (error) {
            console.log(error.message)
        }
    },
    addLink : async (req,res) => {
        try {
            const {subscribe, name, link} = req.body

            await Link.create({
                name, link, subscribe
            })
            
            req.flash('alertMessage', "SUCCESS ADD")
            req.flash('alertStatus', 'success')
            res.redirect('/admin/link')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/link')
        }
    },
    editLink: async (req,res) => {
        try {
            const {id, name,link, subscribe} = req.body
            const _link = await Link.findOne({ _id : id });
            
            if(subscribe){
                _link.name = name
                _link.link = link
                _link.subscribe = subscribe
                await _link.save()
            } else {
                _link.name = name
                _link.link = link
                await _link.save()
            }
            
            req.flash('alertMessage', "SUCCESS EDIT")
            req.flash('alertStatus', 'success')
            res.redirect('/admin/link')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/link')
        }
    },
    deleteLink: async(req,res) => {
        try {
            const {id} = req.params
            const link = await Link.findOne({
                _id : id
            })
            await link.remove()
            req.flash('alertMessage', "SUCCESS EDIT")
            req.flash('alertStatus', 'success')
            res.redirect('/admin/link')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/link')
        }
    },

    viewRequestConnect : async (req,res) => {
        try {
            const currentMenu = req.route.path.toString();
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            const subscribe = await Subscribe.find()
            const link = await RequestConnect.find().populate('subscribe')

            // console.log(link)
            res.render('admin/request_connect/view_requestConnect',{
                currentMenu,
                alert,
                subscribe,
                link
            })
        } catch (error) {
            console.log(error.message)
        }
    },
    addRequestConnect : async (req,res) => {
        try {
            const {subscribe, name, link} = req.body

            await RequestConnect.create({
                name, link, subscribe
            })
            
            req.flash('alertMessage', "SUCCESS ADD")
            req.flash('alertStatus', 'success')
            res.redirect('/admin/request-connect')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/request-connect')
        }
    },
    editRequestConnect: async (req,res) => {
        try {
            const {id, name,link, subscribe} = req.body
            const _link = await RequestConnect.findOne({ _id : id });
            
            if(subscribe){
                _link.name = name
                _link.link = link
                _link.subscribe = subscribe
                await _link.save()
            } else {
                _link.name = name
                _link.link = link
                await _link.save()
            }
            
            req.flash('alertMessage', "SUCCESS EDIT")
            req.flash('alertStatus', 'success')
            res.redirect('/admin/request-connect')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/request-connect')
        }
    },
    deleteRequestConnect: async(req,res) => {
        try {
            const {id} = req.params
            const link = await RequestConnect.findOne({
                _id : id
            })
            await link.remove()
            req.flash('alertMessage', "SUCCESS EDIT")
            req.flash('alertStatus', 'success')
            res.redirect('/admin/request-connect')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/request-connect')
        }
    },

    viewMedia : (req,res) => {
        try {
            const currentMenu = req.route.path.toString();
            res.render('admin/media/view_media',{currentMenu})
        } catch (error) {
            console.log(error.message)
        }
    },
    
    viewCategoryMedia : (req,res) => {
        try {
            const currentMenu = req.route.path.toString();
            res.render('admin/category-media/view_category-media',{currentMenu})
        } catch (error) {
            console.log(error.message)
        }
    },
    
}