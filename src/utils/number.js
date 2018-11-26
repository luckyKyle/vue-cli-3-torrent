/**
 * Created by fighterzhou on 2018/4/11.
 * Modify by fighterzhou on 2018/9/17.
 */

/**
 * num.js 进行数据计算
 * 1. 处理 0.1 + 0.2 !== 0.3 等精度问题
 * 2. 进行多位数精度计算
 * 3. 进行数据格式化
 */

/** ==== 此处精度计算尽量在6位以内，超6位请慎用。 ==== **/

// 引入包 decimal.js
// 注意：包文件带.js后缀，webpack打包处理要小心，不要直接对所有.js后缀进行自动添加后缀等
import { Decimal } from 'decimal.js'

/**
 * @method getCelNum 获取decimal数据
 *
 * @param number String | Number
 *
 * @returns Number
 */
export function getCelNum(number) {
  const num = number || 0
  return Decimal.isDecimal(num) ? new Decimal(0) : new Decimal(num)
}

/**
 * @method plus 加法
 *
 * @param a String | Number
 * @param b String | Number
 *
 * @returns Number
 *
 * @example plus('0.1', 0.2) = 0.3
 *
 * @todo 此处精度计算尽量在6位以内，超6位请慎用。
 */
export function plus(a, b) {
  return Decimal.add(getCelNum(a), getCelNum(b)).toNumber()
}

/**
 * @method minus 减法
 *
 * @param a String | Number
 * @param b String | Number
 *
 * @returns Number
 *
 * @example minus('0.2', 0.1) = 0.1
 *
 * @todo 此处精度计算尽量在6位以内，超6位请慎用。
 */
export function minus(a, b) {
  return getCelNum(a)
    .minus(getCelNum(b))
    .toNumber()
}

/**
 * @method mul 乘法
 *
 * @param a String | Number
 * @param b String | Number
 *
 * @returns Number
 *
 * @example mul('12', 18) = 216
 *
 * @todo 此处精度计算尽量在6位以内，超6位请慎用。
 */
export function mul(a, b) {
  return Decimal.mul(getCelNum(a), getCelNum(b)).toNumber()
}

/**
 * @method div 除法
 *
 * @param a String | Number
 * @param b String | Number
 *
 * @returns Number
 *
 * @example div(144, '12') = 12
 *
 * @todo 此处精度计算尽量在6位以内，超6位请慎用。
 */
export function div(a, b = 1) {
  return Decimal.div(getCelNum(a), getCelNum(b)).toNumber()
}

/**
 * @method gt 比较大小(大于)
 *
 * @param a String | Number
 * @param b String | Number
 *
 * @returns Boolean
 *
 * @example gt(1, 1) === fasle
 * @example gt(2, 1) === true
 * @example gt(1, 2) === fasle
 */
export function gt(a, b) {
  return getCelNum(a).gt(getCelNum(b))
}

/**
 * @method gte 比较大小(大于等于)
 *
 * @param a String | Number
 * @param b String | Number
 *
 * @returns Boolean
 *
 * @example gte(1, 1) === true
 * @example gte(2, 1) === true
 * @example gte(1, 2) === fasle
 */
export function gte(a, b) {
  return getCelNum(a).gte(getCelNum(b))
}

/**
 * @method equals 判断相等
 *
 * @param a String | Number
 * @param b String | Number
 *
 * @returns Boolean
 *
 * @example equals(1, 1) === true
 * @example equals(2, 1) === true
 * @example equals(0, '0') === fasle
 */
export function equals(a, b = 0) {
  return getCelNum(a).equals(getCelNum(b))
}

/**
 * @method formatNum 格式化数字
 *
 * @param number String | Number
 * @param decimals String | Number
 * @param roundType String (defult '' 四折五入 | ceil 向上取整，进一法 | floor 向下取整，退一法）
 *
 * @returns Number
 *
 * @example formatNum('1.1234562', 6, 'ceil') = 1.123457
 * @example formatNum('1.1234562', 5, 'floor') = 1.12345
 * @example formatNum('1.1234562', 4) = 1.1235
 *
 * @todo 此处精度计算尽量在6位以内，超6位请慎用。
 */
export function formatNum(number, decimals = 2, roundType = '') {
  const num = getCelNum(number)
  const pre = getCelNum(decimals).toNumber()

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
 * @method formatMoney 格式化金额 （对小数位前进行千分位划分）
 *
 * @param number String | Number
 * @param decimals String | Number
 * @param roundType String (defult '' 四折五入 | ceil 向上取整，进一法 | floor 向下取整，退一法）
 *
 * @returns String
 *
 * @example formatMoney('1234567.12345') = '1,234,567.12'
 *
 * @todo 此处精度计算尽量在6位以内，超6位请慎用。
 * @todo 若需要对小数点后进行千分位划分，请自行扩展，此处主要针对常用两位小数计量。
 */
export function formatMoney(number, decimals = 2, roundType = '') {
  const num = `${number}`.replace(/[^0-9+-Ee.]|,/g, '')

  const n = formatNum(num, decimals, roundType)

  const s = n.split('.')
  const re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + ',' + '$2') // eslint-disable-line
  }

  return s.join('.')
}

/**
 * @method formatMaxNum 金额单位格式化
 *
 * @param number String | Number
 * @param decimals String | Number
 * @param roundType String (defult '' 四舍五入 | ceil 向上取整，进一法 | floor 向下取整，退一法）
 *
 * @returns String
 *
 * @example formatMaxNum('12345678.12345') = '1,234.57万'
 *
 * @todo 此处精度计算尽量在6位以内，超6位请慎用。
 * @todo 若需要对小数点后进行千分位划分，请自行扩展，此处主要针对常用两位小数计量。
 * @todo 此处仅放开【万】的转换，可以根据需求进行处理，同时可以对其进行扩展，以满足基本需求。
 * @todo 可拓展多语言。
 *
 */
export function formatMaxNum(number, decimals = 2, roundType = '') {
  const num = `${number}`.replace(/[^0-9+-Ee.]|,/g, '')

  const n = formatNum(num, decimals, roundType)

  // if (gt(n, 100000000)) {
  //   return `${formatMoney(div(n, 100000000), decimals, roundType)}亿`
  // }

  // if (gt(n, 10000000)) {
  //   return `${formatMoney(div(n, 10000000), decimals, roundType)}千万`
  // }

  // if (gt(n, 1000000)) {
  //   return `${formatMoney(div(n, 1000000), decimals, roundType)}百万`
  // }

  // if (gt(n, 100000)) {
  //   return `${formatMoney(div(n, 100000), decimals, roundType)}十万`
  // }

  if (gt(n, 10000)) {
    return `${formatMoney(div(n, 10000), decimals, roundType)}万`
  }
  // if (gt(n, 1000)) {
  //   return `${formatMoney(div(n, 1000), decimals, roundType)}千`
  // }

  return `${formatMoney(div(n, 1), decimals, roundType)}`
}
