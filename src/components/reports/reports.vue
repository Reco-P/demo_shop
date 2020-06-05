<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区 -->
    <el-card class="box-card">
      <!-- 2.为 ECharts 准备一个具备大小（宽高）的 DOM -->
      <div id="main" style="width: 600px;height:400px;"></div>
      <el-divider></el-divider>
      <div id="cir" style="width: 600px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
// 1.导入echarts
import echarts from 'echarts'
export default {
  data() {
    return {}
  },
  // 页面元素已渲染
  mounted() {
    // 3.基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))

    // 4.指定图表的配置项和数据
    var option = {
      title: {
        text: 'ECharts报表'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['ps3', 'Ps4', 'playStation', 'Switch', '红白机', 'sefuku']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }

    // 5.使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)

    var cirChart = echarts.init(document.getElementById('cir'))
    cirChart.setOption({
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          data: [
            { value: 235, name: '视频广告' },
            { value: 274, name: '联盟广告' },
            { value: 310, name: '邮件营销' },
            { value: 335, name: '直接访问' },
            { value: 400, name: '搜索引擎' }
          ]
        }
      ]
    })
  },
  methods: {}

}
</script>

<style lang="less" scoped="scoped">
</style>
