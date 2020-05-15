<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 使用clearable属性即可得到一个可清空的输入框 -->
          <el-input placeholder="请输入内容" v-model="searchData" clearable>
            <el-button slot="append" icon="el-icon-search" @click="getSearchData()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary">添加</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <!-- border 边框属性 -->
      <!-- stripe 斑马纹 -->
      <el-table :data="userlist" style="width: 100%" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <!-- 作用域插槽的使用 -->
          <!-- 作用域插槽  {{ scope.row }}可以获得当前行的数据-->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_status" @change="userStatusChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
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
      total: 0,
      searchData: ''
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
         { id: 500, role_name: '超级管理员', username: 'admin', mobile: '123', email: '123@qq.com', mg_status: true },
         { id: 502, role_name: '测试角色2', username: 'testUser', mobile: '234', email: '234@qq.com', mg_status: false }
       ]
      this.total = 4
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监控 pagenum 改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    // 监听 switch 开关改变的状态
    async userStatusChanged(userInfo) {
      // console.log(userInfo)
      // id type 是参数 user/:id/state/:type
      const { data: res } = await this.$http.put('user/' + userInfo.id + '/state/' + userInfo.mg_status)
      if (res.meta.status !== 200) {
        userInfo.mg_status = !userInfo.mg_status
        return this.$message.error('更新用户失败!')
      }
      this.$message.success('更新用户状态成功')
    },
    // 搜索功能  也就是说有两种获取方式，一种是获取全部数据后，只需要过滤数据就可以，另外一种就是直接以搜索条件为索引请求数据
    // 这里是第二种方式
    async getSearchData() {
      // console.log(this.searchData)
      // 这里还需要防止sql注入 以及XSS攻击
      const { data: res } = await this.$http.put('user/' + this.searchData)
      if (res.meta.status !== 200) {
        return this.$message.error('搜索用户失败!')
      }
      // 获取数据后更新列表
      this.userlist = res.meta.users
      this.total = res.meta.total
    }
  }
}
</script>

<style lang="less" scoped="scoped">
</style>
