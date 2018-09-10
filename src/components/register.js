import Vue from 'vue'

// 首字母大写 a--> A
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// 获取components文件夹下以.vue命名的文件
const requireComponent = require.context(
  '.', false, /\.vue$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  // 获取组件名，这里我们去掉头和尾
  // 示例： 文件 ./baseButton.vue --> BaseButton
  const componentName = capitalizeFirstLetter(
    fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
  )

  // Vue组件全局注册方法
  Vue.component(componentName, componentConfig.default || componentConfig)
})
