<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 使用clearable属性即可得到一个可清空的输入框 -->
          <el-input placeholder="请输入商品名称" v-model="searchData" clearable>
            <el-button slot="append" icon="el-icon-search" @click="getSearchData()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="goAddPage">新建</el-button>
          <el-button type="primary" @click="refrechFrom">刷新</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <!-- border 边框属性 -->
      <!-- stripe 斑马纹 -->
      <el-table :data="goodslist" style="width: 100%" border v-loading="loading" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
        <el-table-column prop="price" label="价格" style="width:10%"></el-table-column>
        <el-table-column label="操作" style="width:10%">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="modifyForm(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteForm(scope.row)"></el-button>
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
      goodslist: [],
      total: 0,
      searchData: '',
      loading: false
    }
  },
  created() {
    this.getGoodslist()
  },
  methods: {
    async getGoodslist() {
      const res =
       [
         { id: 500, goodsName: 'PS4', price: '1100' },
         { id: 502, goodsName: 'PlayStation', price: '1200' },
         { id: 504, goodsName: 'Switch', price: '1300' }]
      // 分组操作
      var list = []
      for (let i = 0, j = res.length; i < j; i += this.queryInfo.pagesize) {
        list.push(res.slice(i, i + this.queryInfo.pagesize))
      }
      this.goodslist = list[this.queryInfo.pagenum - 1]
      this.total = 3
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodslist()
    },
    // 监控 pagenum 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getGoodslist()
    },
    // 刷新
    refrechFrom() {
      this.loading = true
      this.getGoodslist()
      setTimeout(() => {
        this.loading = false
      }, 2000)
    },
    // 跳转到新建页面
    goAddPage() {
      this.$router.push('/addGoods')
    }
  }
}
</script>

<style lang="less" scoped="scoped">
</style>
