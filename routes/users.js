const router = require('express').Router()
const userController = require('../controllers/usersController')
const adminController = require('../controllers/adminController')

router.post('/login', userController.login)
router.post('/register', userController.register)
// router.post('/register', adminController.addUser)

module.exports = router
