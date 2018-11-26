/***************************
 * 处理Array相关的一些常规方法
 ***************************/

/**
 * 从指定数组里拿到每个对象的指定属性，返回数组
 * @param arr  一个数组(Array)   [{key1:'aaa',key2:'bbb'},{key1:'AAA',key2:'BBB'}]
 * @param prop  指定属性(String) ['key1']
 * @returns (Array)  ['aaa','AAA']
 * Example: getProperties([{  key1: 'aaa',  key2: 'bbb'}, { key1: 'AAA', key2: 'BBB'}], 'key1') ->["aaa", "AAA"]
 */
export const getProperties = (arr, prop) => arr.map(item => item[prop])

/**
 * 将数组各项转为大写
 * @param  arr 数组(Array)  ['aaa','bbbb','cc']
 * @returns 转换为大写['AAA','BBBB','CC']
 */
export const arrToUpper = arr => {
  if (!Array.isArray(arr) || !arr.every(item => typeof item === 'string'))
    return
  return arr.map(item => item.toUpperCase())
}

/**
 * 将数组各项转为小数
 * @param  arr 数组(Array)  [11,123,4345]
 * @param  keepCount(Number) 保留小数点位数
 * @returns 转换为大写['11.00%','123.00%','434.00%']
 */
export const arrToFloat = (arr, keepCount = 2) => {
  if (!Array.isArray(arr) || !arr.every(item => !isNaN(item))) return
  return arr.map(item => item.toFixed(keepCount) + '%')
}

/**
 * 生成指定范围随机数，返回数组
 * @param min 最小数(Number)
 * @param max 最大数(Number)
 * @param length 数组长度 (Array)
 * @returns  [11,2562,133,11142]
 */
export const getRadomNum = (min, max, length) => {
  let arr = []
  let num = 0
  let i = 0
  while (i < length) {
    num = Math.floor(Math.random() * (max - min + 1)) + min
    arr.push(num)
    i++
  }
  return arr
}

// 升降序切换
export const compare = (key, flag) => {
  return (a, b) => (flag ? b[key] - a[key] : a[key] - b[key])
}
/**
 * 数组内根据对象大小升降序切换
 * @param arr 数组
 * @param key 根据某个key来排序
 * @param flag 正反序 ，默认降序
 * @returns  sortObj([{index:1},{index:5},{index:4},{index:3}],'index',true)
 */
export const sortObj = (arr, key, flag = true) => {
  if (!arr.length) return
  return arr.sort(compare(key, flag))
}
