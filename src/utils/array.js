/***************************
 * 处理Array相关的一些常规方法
 ***************************/

/**
 *  返回数组中的最大值
 * “将Math.max()与扩展运算符 (...) 结合使用以获取数组中的最大值。”
 * @param {需要传入的数组} arr
 * Example:  max([10, 1, 5]) -> 10
 */
export const max = arr => Math.max(...arr)

/**
 *  返回数组中的最小值
 * “将Math.min()与扩展运算符 (...) 结合使用以获取数组中的最小值。”
 * @param {需要传入的数组} arr
 * Example: min([10, 1, 5]) arrayMin([10, 1, 5]) -> 1
 */
export const min = arr => Math.min(...arr)

/**
 *  将数组块划分为指定大小的较小数组。
 * “使用Array.from()创建新的数组, 这符合将生成的区块数。使用Array.slice()将新数组的每个元素映射到size长度的区块。如果原始数组不能均匀拆分, 则最终的块将包含剩余的元素。”
 * @param {需要传入的数组} arr
 * @param {返回的数组粒度大小} size
 * Example: chunk([1,2,3,4,5], 2) -> [[1,2],[3,4],[5]]
 */
export const chunk = (arr, size) => Array.from({
  length: Math.ceil(arr.length / size)
}, (v, i) => arr.slice(i * size, i * size + size))

/**
 *  从数组中移除falsey值
 * “使用Array.filter()筛选出 falsey 值 (false、null、 0、 ""、undefined和NaN).”
 * @param {需要传入的数组} arr
 * Example:  compact([0, 1, false, 2, '', 3, 'a', 'e'*23, NaN, 's', 34]) -> [ 1, 2, 3, 'a', 's', 34 ]
 */
export const compact = arr => arr.filter(Boolean)

/**
 *  计算数组中值的出现次数
 * “使用Array.reduce()在每次遇到数组中的特定值时递增计数器。”
 * @param {需要传入的数组} arr
 * @param {需要传入的数组} value
 * Example:   countOccurrences([1,1,2,1,2,3], 1)  -> 3
 */
export const countOccurrences = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0)

/**
 * 深拼合数组
 * “使用递归。使用Array.concat()与空数组 ([]) 和跨页运算符 (...) 来拼合数组。递归拼合作为数组的每个元素。”
 * @param {需要传入的数组} arr
 * Example: deepFlatten([1,[2],[[3],4],5]) -> [1,2,3,4,5]
 */
export const deepFlatten = arr => [].concat(...arr.map(v => Array.isArray(v) ? deepFlatten(v) : v))

/**
 * 返回两个数组之间的差异
 * “从b创建Set , 然后使用Array.filter() on 只保留a b中不包含的值.”
 * @param {需要传入的数组a} a
 * @param {需要传入的数组b} b
 * @return 返回一个数组，包含差异值
 * Example: difference([1,2,3], [1,2,4]) -> [3]
 */
export const difference = (a, b) => {
  const s = new Set(b)
  return a.filter(x => !s.has(x))
}

/**
 *  数组去重，返回数组的所有不同值
 * “使用 ES6 Set和...rest运算符放弃所有重复的值。”
 * @param {需要传入的数组a} arr
 * @return 返回一个数组，包含去重结果
 * Example: distinctValuesOfArray([1,2,2,3,4,4,5]) -> [1,2,3,4,5]
 */
export const distinctValuesOfArray = arr => [...new Set(arr)]

/**
 *  数组筛选，返回满足某个指定条件
 * “移除数组中的元素, 直到传递的函数返回true。返回数组中的其余元素。在数组中循环, 使用Array.shift()将数组的第一个元素除去, 直到函数的返回值为true。返回其余元素。”
 * @param {需要传入的数组} arr
 * @param {需要满足的条件} func
 * @return 返回一个数组，包含满足指定条件的条件
 * Example:  dropElements([1, 2, 3, 4], n => n >= 3) -> [3,4]
 */
export const dropElements = (arr, func) => arr.filter(func)

/**
 *  返回数组中的每个第 n 个元素
 * “使用Array.filter()创建一个包含给定数组的每个第 n 个元素的新数组。”
 * @param {需要传入的数组} arr
 * @param {指定的除数} nth
 * @return 返回一个数组，包含满足被二参整除
 * Example:  everyNth([1,2,3,4,5,6], 2) -> [ 1, 3, 5 ]
 */
export const everyNth = (arr, nth) => arr.filter((e, i) => i % nth === 0)

/**
 *  筛选出数组中的唯一值。
 * “对于只包含唯一值的数组, 请使用Array.filter() 。”
 * @param {需要传入的数组} arr
 * @return 返回一个数组，包含满足指定条件的条件
 * Example: filterNonUnique([1,2,2,3,4,4,5]) -> [1,3,5]
 */
export const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i))

/**
 *  拼合数组
 * “使用Array.reduce()获取数组中的所有元素和concat()以拼合它们。”
 * @param {需要传入的数组} arr
 * @return 返回一个一维数组
 * Example:flatten([1,[2],3,4]) -> [1,2,3,4]
 */
export const flatten = arr => arr.reduce((a, v) => a.concat(v), [])

/**
 *  将数组向上拼合到指定深度。
 * “使用递归, 递减depth, 每层深度为1。使用Array.reduce()和Array.concat()来合并元素或数组。基本情况下, 对于等于1的depth停止递归。省略第二个元素,depth仅拼合到1的深度 (单个拼合)。”
 * @param {需要传入的数组} arr
 * @param {指定深（维）度} depth
 * @return 返回一个数组，包含满足指定条件的条件
 * Example: flattenDepth([1,[2],[[[3],4],5]], 2) -> [1,2,[3],4,5]
 */
export const flattenDepth = (arr, depth = 1) => depth !== 1 ? arr.reduce((a, v) => a.concat(Array.isArray(v) ? flattenDepth(v, depth - 1) : v), []) : arr.reduce((a, v) => a.concat(v), [])

/**
 *  根据给定函数对数组元素进行分组。
 * “使用Array.map()将数组的值映射到函数或属性名。使用Array.reduce()创建一个对象, 其中的键是从映射的结果生成的。”
 * @param {需要传入的数组} arr
 * @param {需要传入的函数} func
 * @return 返回一个对象，
 * Example_1: groupBy([6.1, 4.2, 6.3], Math.floor) -> {4: [4.2], 6: [6.1, 6.3]}
 * Example_2: groupBy(['one', 'two', 'three'], 'length') -> {3: ['one', 'two'], 5: ['three']}
 */
export const groupBy = (arr, func) => arr.map(typeof func === 'function' ? func : val => val[func]).reduce((acc, val, i) => {
  acc[val] = (acc[val] || []).concat(arr[i])
  return acc
}, {})

/**
 *  返回列表的首位
 * “使用arr[0]可返回传递的数组的第一个元素。”
 * @param {需要传入的数组} arr
 * Example: head([1,2,3]) -> 1
 */
export const head = arr => arr[0]

/**
 *  返回数组中的最后一个元素。
 * “使用arr.length - 1可计算给定数组的最后一个元素的索引并返回它。”
 * @param {需要传入的数组}
 * @return last([1,2,3]) -> 3
 */
export const last = arr => arr[arr.length - 1]

/**
 *  返回除最后一个数组之外的所有元素。
 * “使用 " arr.slice(0,-1)" 返回数组的最后一个元素。”
 * @param {需要传入的数组} arr
 * Example: initial([1,2,3]) -> [1,2]
 */
export const initial = arr => arr.slice(0, -1)

/**
 *  初始化包含指定范围内的数字的数组。
 * “使用Array(end-start)创建所需长度的数组Array.map()以填充区域中所需的值。可以省略start以使用默认值0.”
 * @param {返回的数组长度} end
 * @param {起始值} start
 * Example:  initializeArrayWithValues(5, 2) -> [2,2,2,2,2]
 */
export const initializeArrayWithRange = (end, start = 0) => Array.from({ length: end - start }).map((v, i) => i + start)

/**
 *  初始化并填充具有指定值的数组。
 * “使用Array(n)创建所需长度的数组, fill(v)以填充所需的值。可以省略value以使用默认值0.”
 * @param {返回的数组长度} n
 * @param {填充所需的值} value
 * Example:  initializeArrayWithValues(5, 2) -> [2,2,2,2,2]
 */
export const initializeArrayWithValues = (n, value = 0) => Array(n).fill(value)

/**
 *  返回两个数组中存在的元素的列表。
 * “从b创建Set , 然后使用Array.filter() on a只保留b中包含的值.”
 * @param {需要传入的一数组} a
 * @param {需要传入的二数组} b
 * Example: intersection([1,2,3], [4,3,2]) -> [2,3]
 */
export const intersection = (a, b) => {
  const s = new Set(b)
  return a.filter(x => s.has(x))
}

/**
 *  返回数组的第 n 个元素。
 * “使用Array.slice()可获取包含第 n 个元素的数组。如果索引超出界限, 则返回[]。省略第二个参数n, 以获取数组的第一个元素。”
 * @param {需要传入的数组} arr
 * @param {需要传入的索引} n
 * Example:  nthElement(['a','b','c'],1) -> 'b'
 */
export const nthElement = (arr, n = 0) => (n > 0 ? arr.slice(n, n + 1) : arr.slice(n))[0]

/**
 *  从对象中选取对应于给定键的键值对
 * “使用Array.reduce()将筛选/选取的密钥转换回具有相应键值对的对象 (如果在 obj 中存在该键)。”
 * @param {需要传入的对象} obj
 * @param {需要传入的数组} arr
 * Example: pick({ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c']) -> { 'a': 1, 'c': 3 }
 */
export const pick = (obj, arr) => arr.reduce((acc, curr) => (curr in obj && ((acc[curr] = obj[curr]), acc)), {})

/**
 * 对原始数组进行变异, 以筛选出指定的值。
 * “使用Array.filter()和Array.includes()来拉出不需要的值。使用Array.length = 0可将传入的数组中的长度重置为零, 并将其设置为Array.push() , 以便仅使用所提取的值填充它。”
 * @param {需要传入的对象} obj
 * @param {需要传入的数组} arr
 * Example:    let myArray = ['a', 'b', 'c', 'a', 'b', 'c']
 *             pull(myArray, 'a', 'c');
 *             console.log(myArray) -> [ 'b', 'b' ]
 */
export const pull = (arr, ...args) => {
  let pulled = arr.filter((v, i) => !args.includes(v))
  arr.length = 0
  pulled.forEach(v => arr.push(v))
}

/**
 *  从数组中移除给定函数返回false的元素.
 * “使用Array.filter()查找返回 truthy 值的数组元素和Array.reduce()以使用Array.splice()删除元素。使用三参数 ( func value, index, array调用函数).”
 * @param {需要传入的数组} arr
 * @param {需要传入的规则} func
 * Example: remove([1, 2, 3, 4], n => n % 2 == 0) -> [2, 4]
 */
export const remove = (arr, func) =>
  Array.isArray(arr) ? arr.filter(func).reduce((acc, val) => {
    arr.splice(arr.indexOf(val), 1)
    return acc.concat(val)
  }, []) : []

/**
 *  返回数组中的随机元素。
 * “使用Math.random()生成一个随机数, 将它与length相乘, 并使用数学将其舍入到最接近的整数Math.floor()。此方法也适用于字符串。”
 * @param {需要传入的数组} arr
 * Example: sample([3, 7, 9, 11]) -> 9
 */
export const sample = arr => arr[Math.floor(Math.random() * arr.length)]

/**
 *  返回数组的乱序
 * “使用Array.sort()可在比较器中使用Math.random()重新排序元素。”
 * @param {需要传入的数组} arr
 * Example: shuffle([1,2,3]) -> [2,3,1]
 */
export const shuffle = arr => arr.sort(() => Math.random() - 0.5)

/**
 *  返回两个数组中都显示的元素的数组。
 * “使用filter()可删除不属于values的值, 使用includes()确定.”
 * @param {需要传入的数组} arr
 * Example: similarity([1,2,3], [1,2,4]) -> [1,2]
 */
export const similarity = (arr, values) => arr.filter(v => values.includes(v))

/**
 *  返回两个数组之间的对称差。
 * “从每个数组创建一个Set , 然后对它们中的每一个都使用Array.filter() , 以便只保留其他值中不包含的数值。”
 * @param {需要传入的一数组} a
 * @param {需要传入的二数组} b
 * Example: symmetricDifference([1,2,3], [1,2,4]) -> [3,4]
 */
export const symmetricDifference = (a, b) => {
  const sA = new Set(a)
  const sB = new Set(b)
  return [...a.filter(x => !sB.has(x)), ...b.filter(x => !sA.has(x))]
}

/**
 *  返回数组中除第一个的所有元素。
 * “如果数组的length大于1, 则返回arr.slice(1) , 否则返回整个数组。”
 * @param {需要传入的一数组} arr
 * Example: tail([1,2,3]) -> [2,3]
 */
export const tail = arr => arr.length > 1 ? arr.slice(1) : arr

/**
 *  返回一个数组, 其中 n 个元素从开始处移除。
 * “使用Array.slice()创建数组的切片, 其中包含从开始处取出的n元素。”
 * @param {需要传入的一数组} arr
 * @param {保留个数} n
 * Example: take([1, 2, 3], 5) -> [1, 2, 3]
 * Example: take([1, 2, 3], 0) -> []
 */
export const take = (arr, n = 1) => arr.slice(0, n)

/**
 *  返回一个数组, 其中 n 个元素从开始处移除。
 * “使用Array.slice()创建数组的切片, 其中包含从末尾取出的n元素。”
 * @param {需要传入的数组} arr
 * @param {保留个数} n
 * Example: takeRight([1, 2, 3], 2) -> [ 2, 3 ]
 * Example: takeRight([1, 2, 3]) -> [3]
 */
export const takeRight = (arr, n = 1) => arr.slice(arr.length - n, arr.length)

/**
 *  返回在两个数组中的任意一个中存在的每个元素。
 * “创建一个Set , 其中包含a和b的所有值, 并将其转换为数组。”
 * @param {需要传入的一数组} a
 * @param {需要传入的二数组} b
 * Example: union([1,2,3], [4,3,2]) -> [1,2,3,4]
 */
export const union = (a, b) => Array.from(new Set([...a, ...b]))

/**
 *  返回在两个数组中的任意一个中存在的每个元素。
 * “使用Array.filter()创建不包括的数组 (使用!Array.includes()) 所有给定值。”
 * @param {需要传入的一数组} a
 * @param {需要传入的二数组} b
 * Example:without([2, 1, 2, 3], 1, 2) -> [3]
 */
export const without = (arr, ...args) => arr.filter(v => !args.includes(v))

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
export const arrToUpper = (arr) => {
  if (!Array.isArray(arr) || !arr.every(item => typeof item === 'string')) return
  return arr.map(item => item.toUpperCase())
}

/**
 * 将数组各项转为小数
 * @param  arr 数组(Array)  [11,123,4345]
 * @param  keepCount(Number) 保留小数点位数
 * @returns 转换为大写['11.00%','123.00%','434.00%']
 */
export const arrToFloat = (arr, keepCount = 2) => {
  if (!Array.isArray(arr) || !arr.every((item) => !isNaN(item))) return
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
