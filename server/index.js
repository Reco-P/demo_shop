// node 后端服务器
const userApi = require('./api/userApi.js')
const goodsApi = require('./api/goodsApi.js')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// 后端api路由
app.use('/api/user', userApi)
app.use('/api/goods', goodsApi)
// 监听端口
app.listen(3000)

console.log('success listen at port:3000......')
