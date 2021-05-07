const router = require('express').Router()
const adminController = require('../controllers/adminController')
const auth = require('../middlewares/auth')

router.get('/signin', adminController.viewSignin)
router.post('/signin', adminController.actionSignin)
router.use(auth)
router.get('/logout', adminController.actionLogout)
router.get('/dashboard', adminController.viewDashboard)

router.get('/admin', adminController.viewAdmin) 
router.post('/admin', adminController.addAdmin)
router.put('/admin', adminController.editAdmin)
router.delete('/admin/:id', adminController.deleteAdmin)

router.get('/user', adminController.viewUser)
router.post('/user', adminController.addUser)
router.put('/user', adminController.editUser)

router.get('/subscribe', adminController.viewSubscribes)
router.post('/subscribe', adminController.addSubscribes)
router.put('/subscribe', adminController.editSubscribes)

router.get('/link', adminController.viewLink)
router.post('/link', adminController.addLink)
router.put('/link', adminController.editLink)
router.delete('/link/:id', adminController.deleteLink)

router.get('/request-connect', adminController.viewRequestConnect)
router.post('/request-connect', adminController.addRequestConnect)
router.put('/request-connect', adminController.editRequestConnect)
router.delete('/request-connect/:id', adminController.deleteRequestConnect)

router.get('/media', adminController.viewMedia)
router.get('/category-media', adminController.viewCategoryMedia)

module.exports = router
