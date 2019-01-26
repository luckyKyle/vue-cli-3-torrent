import Vue from 'vue'
import Component from './func-notification' // 实例

const NotificationConstructor = Vue.extend(Component)

const instances = [] // 队列
const space = 16 // 间距
let seed = 1

// 移除队列
const removeInstance = instance => {
  if (!instance) return
  const len = instances.length
  const index = instances.findIndex(item => item.id === instance.id)

  instances.splice(index, 1)

  if (len <= 1) return
  const removeHeight = instance.vm.height
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset =
      parseInt(instances[i].verticalOffset) - removeHeight - space
  }
}

const notify = options => {
  // 因为有dom操作，服务端渲染时返回
  if (Vue.prototype.$isServer) return

  const { autoClose = 3000, ...rest } = options
  const instance = new NotificationConstructor({
    propsData: {
      ...rest
    },
    data: {
      autoClose
    }
  })

  if (instances.length === 0) {
    seed = 0
  }

  const id = `notification_${seed++}`
  instance.id = id
  instance.vm = instance.$mount()
  instance.vm.visible = true
  document.body.appendChild(instance.vm.$el)

  console.log('id==>', id)

  // 距底部高度
  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + space
  })
  verticalOffset += space
  instance.verticalOffset = verticalOffset
  instances.push(instance)
  instance.vm.$on('closed', () => {
    // 移除虚拟dom
    removeInstance(instance)
    // 移除真实dom节点
    document.body.removeChild(instance.vm.$el)
    instance.vm.$destroy()
  })
  instance.vm.$on('close', () => {
    instance.vm.visible = false
  })
  return instance.vm
}

export default notify
