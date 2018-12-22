/*
 1. 处理 0.1 + 0.2 !== 0.3 等精度问题
 2. 进行多位数精度计算
 3. 进行数据格式化
 TODO 注意：包文件带.js后缀，webpack打包处理要小心，不要直接对所有.js后缀进行自动添加后缀等
 TODO 此处精度计算尽量在6位以内，超6位请慎用。
*/
import Decimal from 'decimal.js'

/**
 * 转换成Decimal实例，可使用decimal的内部方法
 * @param number String | Number
 * @return Number
 */
export const $d = number => {
  return Decimal.isDecimal(number) ? new Decimal(0) : new Decimal(number)
}

/**
 * 加法
 * @param a String | Number
 * @param b String | Number
 *
 * @return Number
 *
 * @example plus('0.1', 0.2) = 0.3
 */
export const plus = (a, b) => {
  return Decimal.add($d(a), $d(b)).toNumber()
}

/**
 * 减法
 * @param a String | Number
 * @param b String | Number
 *
 * @return Number
 *
 * @example minus('0.2', 0.1) = 0.1
 */
export const minus = (a, b) => {
  return Decimal.sub($d(a), $d(b)).toNumber()
}

/**
 * 乘法
 * @param a String | Number
 * @param b String | Number
 *
 * @return Number
 *
 * @example mul('12', 18) = 216
 */
export const mul = (a, b) => {
  return Decimal.mul($d(a), $d(b)).toNumber()
}

/**
 * 除法
 * @param a String | Number
 * @param b String | Number
 *
 * @return Number
 *
 * @example div(144, '12') = 12
 */
export const div = (a, b = 1) => {
  return Decimal.div($d(a), $d(b)).toNumber()
}

/**
 *  比较大小(大于)
 * @param a String | Number
 * @param b String | Number
 *
 * @return Boolean
 *
 * @example gt(1, 1) === fasle
 * @example gt(2, 1) === true
 * @example gt(1, 2) === fasle
 */
export const gt = (a, b) => {
  return $d(a).gt($d(b))
}

/**
 * 比较大小(大于等于)
 * @param a String | Number
 * @param b String | Number
 *
 * @return Boolean
 *
 * @example gte(1, 1) === true
 * @example gte(2, 1) === true
 * @example gte(1, 2) === fasle
 */
export const gte = (a, b) => {
  return $d(a).gte($d(b))
}

/**
 * 判断是否相等
 * @param a String | Number
 * @param b String | Number
 *
 * @return Boolean
 *
 * @example equals(1, 1) === true
 * @example equals(2, 1) === true
 * @example equals(0, '0') === fasle
 */
export const equals = (a, b = 0) => {
  return $d(a).equals($d(b))
}

/**
 * 格式化数字
 * @param number String | Number
 * @param decimals String | Number 默认保留两位
 * @param roundType String (defult '' 四折五入 | ceil 向上取整，进一法 | floor 向下取整，退一法）
 *
 * @return Number
 *
 * @example formatNum('1.1234562', 6, 'ceil') = 1.123457
 * @example formatNum('1.1234562', 5, 'floor') = 1.12345
 * @example formatNum('1.1234562', 4) = 1.1235
 */
export const formatNum = (number, decimals = 2, roundType = '') => {
  const num = $d(number)
  const pre = $d(decimals).toNumber()
  let n = num.toFixed(pre).valueOf()
  if (roundType === 'ceil') {
    n = num.toFixed(pre, Decimal.ROUND_UP).valueOf()
  }
  if (roundType === 'floor') {
    n = num.toFixed(pre, Decimal.ROUND_DOWN).valueOf()
  }
  return n.valueOf()
}

/**
 * 格式化千分位小数
 * @param number String | Number
 * @param decimals String | Number  默认保留两位
 * @param roundType String (defult '' 四折五入 | ceil 向上取整，进一法 | floor 向下取整，退一法）
 * @return String
 * @example formatMoney('1234567.12345') = '1,234,567.12'
 */
export const formatMoney = (number, decimals = 2, roundType = '') => {
  const num = `${number}`.replace(/[^0-9+-Ee.]|,/g, '') // 清除无效空格
  const n = formatNum(num, decimals, roundType)
  const s = n.split('.')
  const re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + ',' + '$2')
  }
  return s.join('.')
}

/**
 * 金额单位格式化
 * @param number String | Number
 * @param decimals String | Number  默认保留两位
 * @param roundType String (defult '' 四舍五入 | ceil 向上取整，进一法 | floor 向下取整，退一法）
 * @return String
 * @example formatMaxNum('12345678.12345') = '1,234.57万'
 * 若需要对小数点后进行千分位划分，请自行扩展，此处主要针对常用两位小数计量。
 * 此处仅放开【万】的转换，可以根据需求进行处理，同时可以对其进行单独拆分或扩展，以满足业务需求。
 * 可拓展多语言。
 */
export const formatMaxNum = (number, decimals = 2, roundType = '') => {
  const num = `${number}`.replace(/[^0-9+-Ee.]|,/g, '')
  const n = formatNum(num, decimals, roundType)
  // if (gt(n, 1e8)) {
  //   return `${formatMoney(div(n, 1e8), decimals, roundType)}亿`
  // }
  // if (gt(n, 1e7)) {
  //   return `${formatMoney(div(n, 1e7), decimals, roundType)}千万`
  // }
  // if (gt(n, 1e6)) {
  //   return `${formatMoney(div(n, 1e6), decimals, roundType)}百万`
  // }
  // if (gt(n, 1e5)) {
  //   return `${formatMoney(div(n, 1e5), decimals, roundType)}十万`
  // }
  if (gt(n, 1e4)) {
    return `${formatMoney(div(n, 1e4), decimals, roundType)}万`
  }
  return `${formatMoney(div(n, 1), decimals, roundType)}`
}
