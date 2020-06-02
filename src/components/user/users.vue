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
          <el-input placeholder="请输入姓名" v-model="searchData" clearable>
            <el-button slot="append" icon="el-icon-search" @click="getSearchData()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
          <el-button type="primary" @click="refrechFrom">刷新</el-button>
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
                  <el-input v-model.number="createFormData.mobile" autocomplete="off"></el-input>
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
                  <el-input v-model.number="modifyFormData.mobile" autocomplete="off"></el-input>
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
      <el-table :data="userlist" style="width: 100%" border v-loading="screenLoading">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <!-- 作用域插槽的使用 -->
          <!-- 作用域插槽  {{ scope.row }}可以获得当前行的数据-->
          <!-- 此处开关无法自由切换，会有联动bug，暂放置 -->
          <template slot-scope="scope">
            <el-switch v-model="trans_boolean[scope.row.mg_status]" @change="userStatusChanged(scope.row)" disabled></el-switch>
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
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      trans_boolean: {
        1: true,
        0: false
      },
      screenLoading: false,
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
          { type: 'number', message: '电话必须为数字值' }
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
    // 获取列表数据
    async getUserList() {
      const { data: res } = await this.$http.post('/api/user/user')
      if (res.length === 0) {
        return this.$message.error('获取用户列表失败！')
      }
      // 分组操作
      var list = []
      for (let i = 0, j = res.length; i < j; i += this.queryInfo.pagesize) {
        list.push(res.slice(i, i + this.queryInfo.pagesize))
      }
      this.userlist = list[this.queryInfo.pagenum - 1]
      this.total = res.length
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
    },
    // 监听 switch 开关改变的状态
    async userStatusChanged(userInfo) {
      // console.log(userInfo)
      // id type 是参数 user/:id/state/:type
      // const { data: res } = await this.$http.post('user/' + userInfo.id + '/state/' + userInfo.mg_status)
      // if (res.meta.status !== 200) {
      //   userInfo.mg_status = !userInfo.mg_status
      //   return this.$message.error('更新用户失败!')
      // }
      this.$message.success('更新用户状态成功')
    },
    // 搜索功能  也就是说有两种获取方式，一种是获取全部数据后，只需要过滤数据就可以，另外一种就是直接以搜索条件为索引请求数据
    // 这里是第一种方式
    async getSearchData() {
      // 这里还需要防止sql注入 以及XSS攻击
      // const { data: res } = await this.$http.post('user/' + this.searchData)
      // if (res.meta.status !== 200) {
      //   return this.$message.error('搜索用户失败!')
      // }
      // 未实现连续搜索
      const temp = this.searchData
      if (temp !== '') {
        this.userlist = this.userlist.filter(function(item) {
          // var reg = new RegExp(temp, 'g')
          // // test方法返回布尔值
          // return reg.test(item.username)
          return (item.username.indexOf(temp) > -1)
        })
        this.total = this.userlist.length
      } else {
        this.getUserList()
      }
    },
    // 新建--添加用户
    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 无法处理后台返回数据
          // 在此只做用户名唯一性校验
          if (this.userlist.includes(this.createFormData.username)) {
            return this.$message.error('此用户名已存在!')
          }
          this.$http.post('/api/user/add', this.createFormData)

          this.$message.success('添加用户成功')
          this.dialogFormVisible = false
          // 添加完成，刷新列表
          this.refrechFrom()
        }
      })
    },
    // 修改
    modifyForm(info) {
      this.modifyFormVisible = true
      this.modifyFormData.id = info.id
      this.modifyFormData.username = info.username
      this.modifyFormData.mobile = info.mobile
      this.modifyFormData.email = info.email
    },
    async saveModifyForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/api/user/update', this.modifyFormData)
          this.$message.success('修改用户成功')
          this.modifyFormVisible = false
          // 修改完成，刷新列表
          this.refrechFrom()
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
        this.$http.post('/api/user/delete', formName)
        // 删除完成，刷新列表
        this.refrechFrom()
        this.$message.success('删除成功!')
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    // 刷新
    refrechFrom() {
      // 指令方式加载loading
      this.screenLoading = true
      this.getUserList()
      setTimeout(() => {
        this.screenLoading = false
      }, 1000)
    },
    resetForm(formName) {
      this.dialogFormVisible = false
      this.modifyFormVisible = false
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped="scoped">
.el-form-item .el-input {
  width: 300px;
}
</style>
