const express = require('express')
const router = express.Router()
const upload = require('../config/multerConfig')
const a = require('../controller/userController')
router.route('/signup').post(upload.single('picture'),a.Signup)
router.route('/login').post(a.Login)

module.exports = router;