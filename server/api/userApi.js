//userApi.js
var models = require('../db.js')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap.js')

var conn = mysql.createConnection(models.mysql)
// 连接数据库
conn.connect()

// 测试数据
// var sql = 'select * from login;'
// conn.query(sql, function (err, res) {
//   if (err) {
//     console.log('[ERROR] - ', err.message)
//     return
//   }
//   console.log("数据库操作结果：")
//   console.log(res)
// });

var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.send('err');
    } else {
        console.log(ret);
        res.send(ret);
    }
}
//登录
router.post('/login', (req, res) => {
  var sql = $sql.login.login;
  var params = req.body;
  conn.query(sql, [params.username, params.password], function(err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
    if (result) {
     jsonWrite(res, result);
    }
  })
})
//查询用户
router.post('/user', (req, res) => {
  var sql = $sql.user.select;
  var params = req.body;
  conn.query(sql, function(err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
    if (result) {
     jsonWrite(res, result);
    }
  })
})
// 用户--添加
router.post('/add', (req, res) => {
  var sql = $sql.user.add;
  var params = req.body;
  conn.query(sql, [params.role_name, params.username, params.mobile, params.email], function(err, result) {
    if (err) {
      console.log('[INSERT ERROR] - ', err.message);
      return;
    }
    if (result) {
     jsonWrite(res, result);
    }
  })
})
// 用户--删除
router.post('/delete', (req, res) => {
  var sql = $sql.user.data_delete;
  var params = req.body;
  conn.query(sql, [params.id], function(err, result) {
    if (err) {
      console.log('[DELETE ERROR] - ', err.message);
      return;
    }
    if (result) {
     jsonWrite(res, result);
    }
  })
})
// 用户--修改
router.post('/update', (req, res) => {
  var sql = $sql.user.update;
  var params = req.body;
  conn.query(sql, [params.mobile, params.email, params.id], function(err, result) {
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message);
      return;
    }
    if (result) {
     jsonWrite(res, result);
    }
  })
})

module.exports = router
