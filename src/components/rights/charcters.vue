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
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 使用clearable属性即可得到一个可清空的输入框 -->
          <el-input placeholder="请输入内容" v-model="searchData" clearable>
            <el-button slot="append" icon="el-icon-search" @click="getSearchData()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
          <!-- 新建用户 -->
          <el-dialog title="新建用户" :visible.sync="dialogFormVisible">
            <el-form :model="createFormData" :rules="rules" ref="fromRef">
                <el-form-item label="姓名" prop="username" :label-width="formLabelWidth">
                  <el-input v-model="createFormData.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
                  <el-input v-model="createFormData.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="mobile" :label-width="formLabelWidth">
                  <el-input v-model="createFormData.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="role_name" :label-width="formLabelWidth">
                  <el-input v-model="createFormData.role_name" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button  @click="resetForm('fromRef')">取 消</el-button>
              <el-button type="primary" @click="submitForm('fromRef')">确 定</el-button>
            </div>
          </el-dialog>
          <!-- 修改用户 -->
          <el-dialog title="修改用户" :visible.sync="modifyFormVisible">
            <el-form :model="modifyFormData" :rules="rules" ref="modifyFromRef">
                <el-form-item  label="姓名" prop="username" :label-width="formLabelWidth" >
                  <el-input v-model="modifyFormData.username" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
                  <el-input v-model="modifyFormData.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="mobile" :label-width="formLabelWidth">
                  <el-input v-model="modifyFormData.mobile" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button  @click="resetForm('modifyFromRef')">取 消</el-button>
              <el-button type="primary" @click="saveModifyForm('modifyFromRef')">确 定</el-button>
            </div>
          </el-dialog>
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <!-- border 边框属性 -->
      <!-- stripe 斑马纹 -->
      <el-table :data="userlist" style="width: 100%" border>
         <el-table-column type="expand">
              <template slot-scope="scope">
                <el-form label-position="left" class="demo-table-expand" inline>
                  <el-form-item label="商品名称">
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
        <el-table-column label="状态">
          <!-- 作用域插槽的使用 -->
          <!-- 作用域插槽  {{ scope.row }}可以获得当前行的数据-->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_status" @change="userStatusChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="modifyForm(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteForm(scope.row)"></el-button>
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
    // 自定义表单验证
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (value.indexOf('@') > -1) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 1000)
    }
    return {
      // 获取用户列表对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userlist: [],
      total: 0,
      searchData: '',
      // 用户管理 添加弹框  新建
      dialogFormVisible: false,
      // 添加弹框，修改
      modifyFormVisible: false,
      formLabelWidth: '120px',
      // form 表单验证
      createFormData: {
        username: '',
        email: '',
        mobile: '',
        role_name: ''
      },
      // 修改
      modifyFormData: {
        username: '',
        email: '',
        mobile: ''
      },
      // 定义规则
      // 是否为必填项请在规则处填写
      rules: {
        username: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在1-15个字符', trigger: 'blur' }
        ],
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '电话不能为空', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在3-15个字符', trigger: 'blur' }
        ],
        role_name: [
          { required: true, message: '角色不能为空', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在1-15个字符', trigger: 'blur' }
        ]
      }
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
    },
    // 新建
    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // const { data: res } = await this.$http.put(...)
          // if (res.meta.status !== 200) {
          //   return this.$message.error('添加用户失败!')
          // }
          // this.$message.success('添加用户成功')
          this.$message.success('添加用户成功')
          this.dialogFormVisible = false
        } else {
          return false
        }
      })
    },
    // 修改
    modifyForm(info) {
      this.modifyFormVisible = true
      this.modifyFormData.username = info.username
      this.modifyFormData.mobile = info.mobile
      this.modifyFormData.email = info.email
    },
    async saveModifyForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // const { data: res } = await this.$http.put(...)
          // if (res.meta.status !== 200) {
          //   return this.$message.error('修改用户失败!')
          // }
          // this.$message.success('修改用户成功')
          this.$message.success('修改用户成功')
          this.modifyFormVisible = false
        } else {
          return false
        }
      })
    },
    // 删除操作
    async deleteForm(formName) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // const { data: res } = await this.$http.put(...)
        // if (res.meta.status !== 200) {
        //   return this.$message.error('删除用户失败!')
        // }
        this.$message.success('删除成功!')
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    resetForm(formName) {
      this.dialogFormVisible = false
      this.modifyFormVisible = false
      // this.$refs.fromRef.resetFields()
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped="scoped">
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #a268bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
