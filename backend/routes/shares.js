const express = require('express')
const router = express.Router()

const {getAllNews, getShareDtl} = require('../controllers/shares')

// router.route('/').get(getAllNews).get(getShareDtl)

router.get('/getAllNews', getAllNews)

router.get('/getShareDtl', getShareDtl)

module.exports = router