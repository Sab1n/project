const express = require('express')
const router = express.Router()
const a = require('../controller/orderController')

router.route('/order').post(a.addOrder)

module.exports = router