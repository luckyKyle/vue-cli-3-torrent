// import storage from 'good-storage'

// const SEARCH_KEY = '__search__'
// const SEARCH_MAX_LEN = 15

// // 插入值方法
// function insertArray(arr: any, val: any, compare: any, maxLen: any) {
//   const index = arr.findIndex(compare)
//   if (index === 0) {
//     return
//   }
//   if (index > 0) {
//     arr.splice(index, 1)
//   }
//   arr.unshift(val)
//   if (maxLen && arr.length > maxLen) {
//     arr.pop()
//   }
// }

// // 删除值方法
// function deleteFromArray(arr: any, compare: any) {
//   const index = arr.findIndex(compare)
//   if (index > -1) {
//     arr.splice(index, 1)
//   }
// }

// // 保存
// export function saveSearch(query: any) {
//   let searches = storage.get(SEARCH_KEY, [])
//   insertArray(
//     searches,
//     query,
//     (item: any) => {
//       return item === query
//     },
//     SEARCH_MAX_LEN
//   )
//   storage.set(SEARCH_KEY, searches)
//   return searches
// }

// // 初始化
// export function loadSearch() {
//   return storage.get(SEARCH_KEY, [])
// }

// // 删除
// export function deleteSearch(query: any) {
//   let searches = storage.get(SEARCH_KEY, [])
//   deleteFromArray(searches, (item: any) => {
//     return item === query
//   })
//   storage.set(SEARCH_KEY, searches)
//   return searches
// }

// // 清空
// export function clearSearch() {
//   storage.remove(SEARCH_KEY)
//   return []
// }
