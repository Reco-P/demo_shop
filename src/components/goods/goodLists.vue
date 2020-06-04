<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区 -->
    <el-card class="box-card">
      <!-- 表格区域 -->
      <tree-table :data="userlist" :columns="columns" :selection-type="props.selectionType" :show-index="props.showIndex" :border="props.border" :stripe="props.stripe" :expand-type="props.expandType"></tree-table>
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
      // 为列表指定数据
      columns: [{
        label: '分类名称',
        prop: 'goodsName'
      }],
      props: {
        stripe: false,
        border: true,
        showIndex: true,
        expandType: false,
        selectionType: false
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const res =
       [
         { id: 500, goodsName: '大家电', children: [{ id: 501, goodsName: '冰箱' }] },
         { id: 502, goodsName: '热门推荐', children: [{ id: 503, goodsName: '空调' }] },
         { id: 504, goodsName: '海外购', children: [{ id: 505, goodsName: '扫地机器人' }, { id: 506, goodsName: '无人机' }] }]
      // 分组操作
      var list = []
      for (let i = 0, j = res.length; i < j; i += this.queryInfo.pagesize) {
        list.push(res.slice(i, i + this.queryInfo.pagesize))
      }
      this.userlist = list[this.queryInfo.pagenum - 1]
      this.total = 3
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
</style>
