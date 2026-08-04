const express = require('express')
const router = express.Router()
const upload = require('../config/multerConfig')
const a = require('../controller/adminController')
const b = require('../middleware/authmiddleware')

router.route('/adminSignup').post(upload.single('picture'),a.adminSignup)
router.route('/adminLogin').post(a.adminLogin)
router.route('/verifyAdmin').get(b.adminMiddleWare,a.verifyAdmin)
router.route('/logoutAdmin').get(b.adminMiddleWare,a.logoutAdmin)

module.exports = router