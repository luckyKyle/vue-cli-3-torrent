import Vue from 'vue'

// 首字母大写 a--> A
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// 获取components文件夹下以.vue命名的文件
// 语法如下：(directory, useSubdirectories = false, regExp = /^\.\//)
const requireComponent = require.context('./', true, /\.vue$/)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  // 获取组件名，这里我们去掉头和尾，利用正则匹配
  // 示例： 文件 ./Skeleton/index.vue --> Skeleton
  const tempName = fileName.match(/\/(\w+)\//i)[1]
  const componentName = capitalizeFirstLetter(tempName)
  // Vue组件全局注册方法
  Vue.component(componentName, componentConfig.default || componentConfig)
})
