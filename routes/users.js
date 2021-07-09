const router = require('express').Router()
const userController = require('../controllers/usersController')

router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/confirmationCode/:id', userController.confirmationCode)
router.post('/getUser/', userController.getUser)
router.post('/database', userController.database)
router.post('/captable', userController.captable)
router.post('/request_connect', userController.requestConnect)
router.post('/subscribe', userController.subscribe)

module.exports = router
