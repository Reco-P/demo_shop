//sqlMap.js
var sqlMap = {
  // 登录
  login: {
    login: 'select * from login where username = ? and password = ?;'
  }
}
module.exports = sqlMap;
