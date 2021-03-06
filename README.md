# demo_shop

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 优化项
```
1.生成打包报告
2.第三方库启用CDN ( 通过externals 加载外部CDN资源)
3.element-ui启用懒加载
4.路由懒加载
5.首页内容定制
```

### CDN资源引用
```
<!-- nprogress 的样式表文件 -->
<link rel="stylesheet" href="https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.css" />
<!-- 富文本编辑器 的样式表文件 -->
<link rel="stylesheet" href="https://cdn.staticfile.org/quill/1.3.4/quill.core.min.css" />
<link rel="stylesheet" href="https://cdn.staticfile.org/quill/1.3.4/quill.snow.min.css" />
<link rel="stylesheet" href="https://cdn.staticfile.org/quill/1.3.4/quill.bubble.min.css" />
<script src="https//cdn.staticfile.org/vue/2.5.22/vue.min.js"></script>
<script src="https//cdn.staticfile.org/vue-router/3.0.1/vue-router.min.js"></script>
<script src="https//cdn.staticfile.org/axios/0.18.0/axios.min.js"></script>
<script src="https//cdn.staticfile.org/lodash.js/4.17.11/lodash.min.js"></script>
<script src="https//cdn.staticfile.org/echarts/4.1.0/echarts.min.js"></script>
<script src="https//cdn.staticfile.org/nprogress/0.2.0/nprogress.min.js"></script>
<!-- 富文本编辑器的 js 文件 -->
<script src="https//cdn.staticfile.org/quill/1.3.4/quill.min.js"></script>
<script src="https//cdn.jsdeliver.net/vue-quill-editor@3.0.4/dist/vue-quill-editor.js"></script>
<!-- element-ui样式表 -->
<link rel="stylesheet" href="https://cdn.staticfile.org/element-ui/2.8.2/theme-chalk/index.css" />
<!-- element-ui js -->
<script src="https//cdn.jsdeliver.net/element-ui/2.8.2/index.js"></script>
```
