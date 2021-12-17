const express = require('express')
const router = express.Router()
const {user_already_exists,user_not_exists,all_element_exists,passwordHash} = require('../middleware/authentication')
const {login, register, isUserLoggedIn, signout} = require('../controllers/auth')


router.post('/register', [all_element_exists,user_already_exists, passwordHash],register)
router.post('/isUserLoggedIn', isUserLoggedIn)
router.post('/login', [user_not_exists],login)
router.post('/signout', signout)

module.exports = router