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
export const isBoolean = val => typeof val === 'boolean'

/**
 *  检查给定参数是否为函数
 * Example:  isFunction('x') -> false
 * Example:  isFunction(x => x) -> true
 */
export const isFunction = val => val && typeof val === 'function'

/**
 *  检查给定参数是否为函数
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
 * Example:  isSymbol('x') -> false
 * Example:  isSymbol(Symbol('x')) -> true
 */
export const isNan = val => isNaN(val)

/**
 *  检查给定参数是否为对象
 */
export const isObj = val => Object(val) === val

/**
 *  检查给定参数是否为日期
 */
export const isDate = val => toString.call(val) === '[object Date]'

/**
 *  检查给定参数是否为日期
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
export const vertical = () => window.orientation === 180 || window.orientation === 0

/**
 *  检查设备是否是横屏状态
 */
export const landscape = () => window.orientation === 90 || window.orientation === -90

/*****************************
 * ↓↓↓↓↓↓↓ 使用正则判断 ↓↓↓↓↓↓↓
 *****************************/

export const reg = {}

/**
 *  相应的正则码
 */
const regexes = {
  affirmative: /^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/,
  alphaNumeric: /^[A-Za-z0-9]+$/,
  caPostalCode: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]\s?[0-9][A-Z][0-9]$/,
  creditCard: /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
  eppPhone: /^\+[0-9]{1,3}\.[0-9]{4,14}(?:x.+)?$/,
  hexadecimal: /^(?:0x)?[0-9a-fA-F]+$/,
  hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
  ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
  ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i,
  nanpPhone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
  socialSecurityNumber: /^(?!000|666)[0-8][0-9]{2}-?(?!00)[0-9]{2}-?(?!0000)[0-9]{4}$/,
  timeString: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
  ukPostCode: /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/,
  url: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i,
  usZipCode: /^[0-9]{5}(?:-[0-9]{4})?$/
}

const regexpCheck = (regexp, regexes) => {
  reg[regexp] = (val) => !isNaN(val) && regexes[regexp].test(val)
}

for (let regexp in regexes) {
  if (regexes.hasOwnProperty(regexp)) {
    regexpCheck(regexp, regexes)
  }
}

/**
 *  检查给定参数是否为IP
 */
export const IP = val => reg.ipv4(val) || reg.ipv6(val)

/**
 *  检查给定参数是否为大写
 */
export const capitalized = string => {
  if (!isString(string)) return
  let words = string.split(' ')

  for (let i = 0; i < words.length; i++) {
    let word = words[i]
    if (word.length) {
      let chr = word.charAt(0)
      if (chr !== chr.toUpperCase()) {
        return false
      }
    }
  }
  return true
}
