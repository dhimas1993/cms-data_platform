const router = require('express').Router()
const userController = require('../controllers/usersController')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/confirmationCode/:id', userController.confirmationCode)
router.get('/getUser/:id', userController.getUser)
router.post('/database', userController.database)
router.post('/request_connect', userController.requestConnect)

module.exports = router
