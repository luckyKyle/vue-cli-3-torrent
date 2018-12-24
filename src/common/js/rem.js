const BASE_SIZE = 32 // 基准大小
const DEVICE_WIDTH = 750 // 设备宽度
const SCALE_SIZE = 2 // 分辨率缩放倍数

// 设置 rem 函数
const setRem = () => {
  const scale = document.documentElement.clientWidth / DEVICE_WIDTH
  document.documentElement.style.fontSize =
    BASE_SIZE * Math.min(scale, SCALE_SIZE) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = setRem
