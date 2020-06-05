var models = require('../db.js')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap.js')

var conn = mysql.createConnection(models.mysql)

var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.send('err');
    } else {
        console.log(ret);
        res.send(ret);
    }
}

// 商品--添加
router.post('/upload', (req, res) => {
  var sql = $sql.goods.add;
  var params = req.body;
  console.log(params)
  // console.log([params.name, params.url])
  conn.query(sql, [params.name, params.url], function(err, result) {
    if (err) {
      console.log('[INSERT ERROR] - ', err.message);
      return;
    }
    if (result) {
     jsonWrite(res, result);
    }
  })
})

module.exports = router
