<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区 -->
    <el-card class="box-card" style="height: auto;">
        <el-alert title="添加商品信息" type="info" center show-icon></el-alert>
        <el-steps :space="200" :active="activeIndex - 0 " finish-status="success" align-center>
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <el-form ref="form" :model="form" label-width="100px" label-position="top">
          <el-tabs v-model="activeIndex" :tab-position="'left'" style="height: 200px;" :before-leave="beforeTabLeave">
            <el-tab-pane label="基本信息" name="0">
              <el-form-item label="商品名称" prop="goodName">
                <el-input v-model="form.goodName"></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品参数" name="1">
              <el-form-item label="商品参数" prop="goodStyle">
                <el-input v-model="form.style"></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品属性" name="2">
              <el-form-item label="商品属性" prop="goodProp">
                <el-input v-model="form.prop"></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品图片" name="3">
              <el-upload :action="url" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture" :on-success="handSuccess">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-tab-pane>
            <el-tab-pane label="商品内容" name="4">
              <!-- 富文本编辑器 -->
              <quill-editor v-model="form.introduce"></quill-editor>
              <el-button type="primary" style="margin-top: 15px;" @click="addForm">添加商品</el-button>
            </el-tab-pane>
          </el-tabs>
        </el-form>
    </el-card>

    <!-- 图片预览 -->
    <el-dialog title="提示" :visible.sync="previewVisible" width="50%">
      <img :src="previewPath"/>
    </el-dialog>
  </div>

</template>

<script>
export default {
  data() {
    return {
      activeIndex: '0',
      // 添加表单数据对象
      form: {
        goodName: '',
        style: '',
        prop: '',
        introduce: '<p>123<span style="color: rgb(230, 0, 0);">123</span><em style="color: rgb(230, 0, 0);">123</em></p>'
      },
      fileList: [{ name: 'logo.png', url: 'http://localhost:8080/93795c48-152a-415c-b2ac-141b7ecaa151' }],
      url: 'http://localhost:8080/api/goods/upload',
      previewPath: '',
      previewVisible: false
    }
  },
  methods: {
    beforeTabLeave(activeName, objActiveName) {
      if (objActiveName === '0' && this.form.goodName === '') {
        this.$message.error('请填写商品名称')
        return false
      }
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {
      this.previewPath = file.url
      this.previewVisible = true
    },
    handSuccess(response) {
    },
    addForm() {
      // this.$http.post('/api/goods/add')
      this.$message.success('添加商品成功')
      this.$router.push('/goods')
    }
  }
}
</script>

<style>
</style>
