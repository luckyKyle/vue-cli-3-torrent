/***************************
 * 处理类型参数判断的方法
 ***************************/

const toString = Object.prototype.toString

/**
 *  检查给定参数是否为数组
 * “使用Array.isArray()检查某个值是否属于数组。”
 * Example:  isArray([10, 1, 5]) -> true
 */
export const isArray = val => !!val && Array.isArray(val)

/**
 *  检查给定参数是否为布尔元素
 * Example:  isBoolean(null) -> false
 * Example:  isBoolean(false) -> true
 */
export const isBool = val => typeof val === 'boolean'

/**
 *  检查给定参数是否为函数
 * Example:  isFunction('x') -> false
 * Example:  isFunction(x => x) -> true
 */
export const isFunction = val => val && typeof val === 'function'

/**
 *  检查给定参数是否为数字
 * Example:  isNumber('1') -> false
 * Example:  isNumber(1) -> true
 */
export const isNumber = val => typeof val === 'number'

/**
 *  检查给定参数是否为字符串
 * Example:  isString(10) -> false
 * Example:  isString('10') -> true
 */
export const isString = val => typeof val === 'string'

/**
 *  检查给定参数是否为Symbol类型
 * Example:  isSymbol('x') -> false
 * Example:  isSymbol(Symbol('x')) -> true
 */
export const isSymbol = val => typeof val === 'symbol'

/**
 *  检查给定参数是否为NaN
 * Example:  isNaN('x') -> false
 * Example:  isNan(NaN) -> true
 */
export const isNan = val => Object.is(val, NaN)
/**
 *  检查给定参数是否为对象
 */
export const isObj = val => Object(val) === val

/**
 *  检查给定参数是否为日期
 */
export const isDate = val => toString.call(val) === '[object Date]'

/**
 *  检查给定参数是DOM节点
 */
export const isDomNode = object => isObj(object) && object.nodeType > 0

/**
 *  检查给定参数是否为falsy值
 */
export const isFalsy = val => !val

/**
 *  检查给定参数是否为truthy值
 */
export const isTruthy = val => !!val

/**
 *  检查给定参数是否为奇数
 */
export const isEven = n => isNumber(n) && n % 2 === 0

/**
 *  检查给定参数是否为偶数
 */
export const isOdd = n => isNumber(n) && (n % 2 === 1 || n % 2 === -1)

/**
 *  检查设备是否是竖屏状态
 */
export const isVertical = () =>
  window.orientation === 180 || window.orientation === 0

/**
 *  检查设备是否是横屏状态
 */
export const isLandscape = () =>
  window.orientation === 90 || window.orientation === -90

/*****************************
 * ↓↓↓↓↓↓↓ 使用正则判断 ↓↓↓↓↓↓↓
 *****************************/

export const reg = {}

// 匹配相应的正则码
const regexes = {
  // 仅中文
  chinese: /[\u4e00-\u9fa5]/gm,
  // 仅英文
  english: /^[a-z]+$/i,
  // 仅大写英文
  capitalized: /^[A-Z]+$/,
  // 仅数字
  number: /^\d+$/,
  // 邮箱
  email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
  // 邮编
  postCode: /^[1-9]\d{5}(?!\d)$/,

  // 仅英文加数字
  alphaNumeric: /^[A-Za-z0-9]+$/,
  // IP
  ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
  ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i,
  // 电话号码
  telephone: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
  // 身份证
  idCard: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
  // URL
  url: /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i,
  // 日期(yy-MM-dd)
  date: /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/
}

const regexpCheck = regexp => {
  reg[regexp] = val => val !== null && regexes[regexp].test(val)
}

for (let reg in regexes) {
  regexes.hasOwnProperty(reg) && regexpCheck(reg)
}
