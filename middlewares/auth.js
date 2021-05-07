const isLogin = (req,res,next) => {
    if(req.session.user == null || req.session.user == null){
        req.flash('alertMessage', `Silahkan login kembali`)
        req.flash('alertStatus', 'danger')
        res.redirect('/admin/signin')
    } else {
        next()
    }
}

module.exports = isLogin