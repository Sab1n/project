const express = require('express')
const router = express.Router()
const upload = require('../config/multerConfig')
const a = require('../controller/userController')
const b = require('../middleware/authmiddleware')
router.route('/signup').post(upload.single('picture'),a.Signup)
router.route('/login').post(a.Login)
router.route('/verifyUser').get(b.userMiddleWare,a.verifyUser)

module.exports = router;