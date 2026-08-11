const express = require('express')
const router = express.Router()
const a = require('../controller/orderController')
const b = require('../middleware/authmiddleware')

router.route('/order').post(b.userMiddleWare,a.addOrder)

module.exports = router