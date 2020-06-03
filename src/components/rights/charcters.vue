<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区 -->
    <el-card class="box-card">
      <!-- 用户列表区 -->
      <!-- border 边框属性 -->
      <!-- stripe 斑马纹 -->
      <el-table :data="userlist"  tyle="width: 100%" border>
         <el-table-column type="expand">
              <template slot-scope="scope">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="姓名">
                    <span>{{ scope.row.username }}</span>
                  </el-form-item>
                  <el-form-item label="邮箱">
                    <span>{{ scope.row.email }}</span>
                  </el-form-item>
                  <el-form-item label="电话">
                    <span>{{ scope.row.mobile }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 获取用户列表对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userlist: [],
      total: 0
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      /*
      const { data: res } = await this.$http.get('users', { param: {} })
      // console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      this.userlist = res.meta.users
      this.total = res.meta.total
      */
      this.userlist =
       [
         { id: 500, role_name: '超级管理员', username: 'admin', mobile: '123', email: '123@qq.com' },
         { id: 502, role_name: '测试角色2', username: 'testUser', mobile: '234', email: '234@qq.com' }
       ]
      this.total = 2
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监控 pagenum 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    }
  }
}
</script>
<style lang="less" scoped="scoped">
// 展开行的格式为什么一直不对？
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
