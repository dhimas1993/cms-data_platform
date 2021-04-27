const router = require('express').Router()
const adminController = require('../controllers/adminController')

router.get('/dashboard', adminController.viewDashboard)

router.get('/admin', adminController.viewAdmin)
router.post('/admin', adminController.addAdmin)
router.put('/admin', adminController.editAdmin)
router.delete('/admin/:id', adminController.deleteAdmin)

router.get('/venture', adminController.viewVenture)
router.get('/portofolio', adminController.viewPortofolio)
router.get('/media', adminController.viewMedia)
router.get('/category-media', adminController.viewCategoryMedia)

module.exports = router
