//sqlMap.js
var sqlMap = {
  // 登录
  login: {
    login: 'select username from login where username = ? and password = ?;'
  },
  user: {
    select: 'select * from user;',
    add: 'insert into user (role_name,username,mobile,email,mg_status) VALUES (?,?,?,?,0);',
    update_status: 'update user set mg_status = 0 where id = 520;',
    update: 'update user set mobile = ?, email = ? where id = ?;',
    data_delete: 'delete from user where id = ?;'
  },
  goods:{
    add: 'insert into picture (name,url) VALUES (?,?);'
  }
}
module.exports = sqlMap;
