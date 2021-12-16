const express = require('express')
const router = express.Router()

const {login, register, isUserLoggedIn, signout} = require('../controllers/auth')

router.post('/register', register)
router.post('/isUserLoggedIn', isUserLoggedIn)
router.post('/login', login)
router.post('/signout', signout)

module.exports = router