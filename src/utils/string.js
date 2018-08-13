/***************************
处理Date相关的一些常规方法
***************************/

/*
 * 获取随机字符串，返回两种结果 （单个字符串或者指定长度的数组，内含随机数）
 * @param len  字符串长度(Number) 默认32
 * @param length 数组长度(Number)
 * @returns 'aAaa123'或者['aAa111','bBb111']
 * Example:getRadomString(5) -> 'PPXNw'
 * Example:getRadomString(5,3) -> ["th5PP", "MaTWd", "c6dAc"]
 */
export const getRadomString = (len = 6, length) => {
  let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  let pwd = ''

  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  if (length) { // 如果带二参，返回为数组
    let arr = []
    for (let j = 0; j < length; j++) {
      arr.push(getRadomString(len))
    }
    return arr
  }
  return pwd
}
