require("dotenv").config()
const dns = require('dns');

const express = require('express')
const mongos = require('mongoose')
const cookieParser = require('cookie-parser')
const c = require('cors') 
const a = express()
dns.setServers(['8.8.8.8', '1.1.1.1']);
const forUser = require('./router/userRoute')
const forAdmin = require('./router/adminRoute')
const forProduct = require('./router/productRoute')
a.use(cookieParser())
a.use(express.json())
a.use(c({
    origin: "http://localhost:3000",
    methods: ['GET', 'DELETE', 'POST', 'PUT'],
    allowedHeaders:['Content-Type','Authorization'],
    credentials: true
  }));
a.use('/api/user',forUser)
a.use('/api/admin',forAdmin)
a.use('/api/product',forProduct)
mongos.connect(process.env.MONGODB_URI).then(()=>{console.log("successfully connected")}).catch((error)=>{console.log("connection error",error)})
a.listen(5000,()=>{
    console.log("server working")
})