<template>
  <el-container class='home_container'>
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/img2.svg" style="width:50px; background-color: #35B3EE;"/>
        <span>电商管理系统</span>
      </div>
      <el-tag type="success">{{ time | dateFormate }}</el-tag>
      <el-button type="info" @click='logout'>退出</el-button>
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="collapseFlag ? '64px' : '200px'">
        <!-- 点击按钮,切换菜单的折叠与展开 -->
        <div class="toggle_button" @click="collapseFlag=!collapseFlag">|||</div>
        <!-- 侧边栏 -->
        <!-- :unique-opened="true" 是否保持一个子菜单的展开 -->
        <!-- collapse 动态绑定布尔值实现菜单的折叠 -->
        <!-- router 是否开启路由模式 -->
         <el-menu background-color="#35B3EE"  text-color="#fff" active-text-color="#ffd04b" unique-opened :collapse='collapseFlag' :collapse-transition="false" router :default-active="activePath">
           <!-- 一级菜单 -->
           <!-- index属性为字符串 -->
              <el-submenu :index="  item.id + ''" v-for="item in menulist" :key="item.id">
                <template slot="title">
                  <i :class="iconObj[item.id]"></i>
                  <span>{{ item.authName }}</span>
                </template>
                <!-- 二级菜单 -->
                <el-menu-item :index="'/' + subItem.path " v-for="subItem in item.children" :key="subItem.id" @click="saveActivePath('/' + subItem.path )">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{ subItem.authName }}</span>
                  </template>
                </el-menu-item>
              </el-submenu>
            </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menulist: [
        { id: 125, authName: '用户管理', path: 'users', children: [{ id: 110, authName: '用户列表', path: 'users', children: [] }] },
        { id: 103, authName: '权限管理', path: 'rights', children: [{ id: 111, authName: '角色列表', path: 'charcters', children: [] }, { id: 112, authName: '权限列表', path: 'roles', children: [] }] },
        { id: 101, authName: '商品管理', path: 'goods', children: [{ id: 113, authName: '商品列表', path: 'goods', children: [] }, { id: 114, authName: '分类参数', path: 'lists', children: [] }, { id: 115, authName: '商品分类', path: 'goodLists', children: [] }] },
        { id: 102, authName: '订单管理', path: 'orders', children: [{ id: 116, authName: '订单列表', path: 'orders', children: [] }] },
        { id: 145, authName: '数据统计', path: 'reports', children: [{ id: 117, authName: '数据列表', path: 'reports', children: [] }] }
      ],
      iconObj: {
        '125': 'el-icon-user',
        '103': 'el-icon-picture-outline-round',
        '101': 'el-icon-goods',
        '102': 'el-icon-shopping-cart-2',
        '145': 'el-icon-pie-chart'
      },
      // 是否折叠
      collapseFlag: false,
      // 被激活的拦截地址
      activePath: '',
      time: '2020'
    }
  },
  mounted() {
    this.time = new Date()
  },
  created() {
    // this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      // 清空token
      window.sessionStorage.clear()
      // 跳转到登录页
      this.$router.push('/login')
    },
    // 获取所有菜单
    // async getMenuList() {
    //   const { data: res } = await this.$http.get('menus')
    //   if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
    //   this.menulist = res.data
    //   console.log(res)
    // }
    // 保存链接的状态
    saveActivePath(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang='less' scoped='scoped'>
.home_container {
  height: 100%;
}

.el-header {
  background-color: #35B3EE;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
}

.el-header div{
  display: flex;
  align-items: center;
  span {
    margin-left: 15px;
  }
}

.el-header div span{
   margin-left: 15px;
}

.el-aside {
  background-color: #35B3EE;
}

.el-aside .el-menu {
  border-right: none;
}

.el-main {
  background-color: #eaedf1;
}

.toggle_button {
  background-color: #39c1ff;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.el-tag {
  display: flex;
  margin-left: 900px;
}
</style>
