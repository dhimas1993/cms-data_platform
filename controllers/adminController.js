const Admin = require('../models/admin.model')

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

    viewVenture : (req,res) => {
        try {
            const currentMenu = req.route.path.toString();
            res.render('admin/venture/view_venture',{currentMenu})
        } catch (error) {
            console.log(error.message)
        }
    },

    viewPortofolio : (req,res) => {
        try {
            const currentMenu = req.route.path.toString();
            res.render('admin/portofolio/view_portofolio',{currentMenu})
        } catch (error) {
            console.log(error.message)
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