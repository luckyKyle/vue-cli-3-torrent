// 字号基准
const BASE_SIZE = 32
;(function(doc, win) {
  const scale = document.documentElement.clientWidth / 750
  const resizeEvt =
    'orientationchange' in window ? 'orientationchange' : 'resize'
  const setRem = () => {
    doc.documentElement.style.fontSize = BASE_SIZE * Math.min(scale, 2)
  }

  console.log(window.origin.includes('192.168.1.50'))

  win.addEventListener(resizeEvt, setRem, false)
  doc.addEventListener('DOMContentLoaded', setRem, false)
})(document, window)
