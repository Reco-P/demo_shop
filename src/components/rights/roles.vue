<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区 -->
    <el-card class="box-card">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="权限列表" name="1">
          <div>用于分配用户权限以及查看现有权限；</div>
        </el-collapse-item>
        <el-collapse-item title="流程" name="2">
          <div>管理员；</div>
          <div>前台；</div>
        </el-collapse-item>
        <el-collapse-item title="Collapse 折叠面板" name="3">
          <div>通过折叠面板收纳内容区域</div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ['1']
    }
  },
  methods: {
    handleChange(val) {
      // console.log(val)
    }
  }
}
</script>

<style lang="less" scoped="scoped">
</style>
