const express = require('express')
const router = express.Router()
const a = require('../controller/productController')
const b = require('../middleware/authmiddleware')
const upload = require('../config/multerConfig')

router.route('/addProduct').post(b.adminMiddleWare,upload.single('picture'),a.addProduct)
router.route('/getProduct').get(a.displayProduct)

module.exports = router