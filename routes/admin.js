const router = require('express').Router()
const adminController = require('../controllers/adminController')

router.get('/dashboard', adminController.viewDashboard)

router.get('/admin', adminController.viewAdmin)
router.post('/admin', adminController.addAdmin)
router.put('/admin', adminController.editAdmin)
router.delete('/admin/:id', adminController.deleteAdmin)

router.get('/user', adminController.viewUser)
router.post('/user', adminController.addUser)
router.put('/user', adminController.editUser)

router.get('/portofolio', adminController.viewPortofolio)
router.get('/media', adminController.viewMedia)
router.get('/category-media', adminController.viewCategoryMedia)

module.exports = router
