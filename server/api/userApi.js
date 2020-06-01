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

module.exports = router
