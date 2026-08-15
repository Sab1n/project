const express = require('express')
const router = express.Router()
const a = require('../controller/discountController')
const b = require('../middleware/authmiddleware')

router.route('/addCoupon').post(b.adminMiddleWare,a.addCoupon)
router.route('/displayCoupon').get(a.displayCoupon)
router.route('/verifyCoupon').post(a.verifyCoupon)

module.exports = router;