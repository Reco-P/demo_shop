//sqlMap.js
var sqlMap = {
  // 登录
  login: {
    login: 'select username from login where username = ? and password = ?;'
  },
  user: {
    select: 'select * from user;',
    add: 'insert into user (role_name,username,mobile,email,mg_status) VALUES (?,?,?,?,0);'
  }
}
module.exports = sqlMap;
