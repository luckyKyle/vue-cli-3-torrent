/***************************
处理Date相关的一些常规方法
***************************/

/**
 *  时间格式的快速获取 HH:MM:SS
 * @param {传入日期对象} str
 * Example: getColonTimeFromDate(new Date()) -> "18:04:00"
 */
export const getColonTimeFromDate = (date = new Date()) => date.toTimeString().slice(0, 8)

/**
 *  返回两个日期之间的差异 (以天为值)。
 * "计算Date对象之间的差异 (以天为单位)。"
 * @param {传入日期对象} obj
 * Example: getDaysDiffBetweenDates('2018-05-05', '2018-05-14') -> 9
 */
export const getDaysDiffBetweenDates = (dateInitial, dateFinal) => (new Date(dateFinal) - new Date(dateInitial)) / (1000 * 3600 * 24)

/**
 * 十位补零
 * @param num (Number)
 * @returns padTime(0) -> '00'
 */
export const padTime = (num) => num < 10 ? '0' + num : num

/**
 *  将时间戳转换为日期
 * "使用Date(), 将时间戳转换转换为可读格式)."
 * @param {传入的时间戳} timestamp
 * @param {布尔值是否需要时钟} needTime
 * @param {返回的格式 (1:yyyy-mm-dd或者2: dd/mm/yyyy )} format
 * Example1: timestampToTime(1489525200000, true) -> "2017-03-15 05:00:00"
 * Example2: timestampToTime(1489525200000, false) -> "2017-03-15"
 * Example3: timestampToTime(1489525200000, true,2) -> "2017/03/15 05:00:00"
 * Example4: timestampToTime(1489525200000, false,2) -> "2017/03/15"
 */
export const timestampToTime = (timestamp, needTime = false, format = 1) => {
  let date = new Date(timestamp)
  let Y = date.getFullYear()
  let M = padTime(date.getMonth() + 1)
  let D = padTime(date.getDate())
  let h = padTime(date.getHours())
  let m = padTime(date.getMinutes())
  let s = padTime(date.getSeconds())

  switch (format) {
  case 1:
    return needTime ? `${Y}-${M}-${D} ${h}:${m}:${s}` : `${Y}-${M}-${D}`
  case 2:
    return needTime ? `${D}/${M}/${Y} ${h}:${m}:${s}` : `${D}/${M}/${Y}`
  }
}

/**
 *  将为日期转换时间戳
 */
export const timeTotimestamp = date => Date.parse(date)

/**
 *  根据日期返回星期几
 * @param {传入的日期} dateString
 * Example: dateToWeek('2018-05-04') -> "星期五"
 */
export const dateToWeek = dateString => {
  let date
  if (dateString !== null || typeof dateString !== 'undefined') {
    date = new Date()
  } else {
    let dateArray = dateString.split('-')
    date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2])
  }
  return '星期' + '日一二三四五六'.charAt(date.getDay())
}

/**
 * 比较两个日期大小,如果1参早于2参则为true,否则为false
 * @param {any} d1  较晚的日期 "2007-2-2 7:30"
 * @param {any} d2  较早的日期"2007-1-31 8:30"
 * @returns Boolean
 * Example: compareDate('2007-2-2 7:30', '2007-1-31 8:30') -> true
 */
export const compareDate = (d1, d2) => {
  d1 = new Date(d1.replace(/-/g, '\'/'))
  d2 = new Date(d2.replace(/-/g, '\'/'))
  return d1 > d2
}

/**
 * 获取今天的日期
 * @returns '2018-05-04'
 * Example: getToday() -> '2018-05-04'
 */
export const getToday = () => {
  let day = new Date()
  day.setTime(day.getTime())
  return day.getFullYear() + '-' + padTime((day.getMonth() + 1)) + '-' + padTime(day.getDate())
}

/**
 * 获取上一周的日期,默认前7天的
 * @param {前几天的} pre
 * @returns '2018-05-04'
 * Example: getPreWeekDay() -> '2018-04-27'
 */
export const getPreWeekDay = (pre = 7) => {
  let now = new Date()
  let oneWeekTime = pre * 24 * 60 * 60 * 1000
  let lastWeekDay = new Date(now - oneWeekTime)
  return lastWeekDay.getFullYear() + '-' + padTime((lastWeekDay.getMonth() + 1)) + '-' + padTime(lastWeekDay.getDate())
}

/**
 * 获取两个日期范围
 * @param start: 开始时间(string:“2018-11-11”)
 * @param end: 结束时间(string:“2018-11-15”)
 * @returns 返回包含起止日期之间的所有日期的数组
 * Example: getBetweenDateScope('2018-04-27','2018-04-29') -> ["2018-04-27", "2018-04-28", "2018-04-29"]
 */
export const getBetweenDateScope = (start, end) => {
  start = timeTotimestamp(start) // 将日期转为时间戳
  end = timeTotimestamp(end) // 将日期转为时间戳
  let oneDay = 24 * 60 * 60 * 1000
  let arr = []

  if (start > end) throw Error('1参日期晚于2参日期')
  for (let i = start; i <= end;) {
    arr.push(timestampToTime(i))
    i += oneDay
  }
  return arr
}

/**
 * 获取倒推两个时间段的日期
 * @param count  指定几天之间, 默认是2，返回昨天和今天
 * @param startDate  开始日期，默认是“今天”
 * @returns targetDay:"2018-01-01", today:"2018-01-12"
 *  Example:getDateRange(2) ->{today: "2018-05-05", targetDay: "2018-05-04"}
 */
export const getDateRange = (count = 2, start = getToday()) => {
  let today = new Date(start)
  let targetDay = new Date()
  let oneDay = 24 * 60 * 60 * 1000
  today.setTime(today.getTime())
  targetDay.setTime(targetDay.getTime() - (oneDay * (count - 1)))
  today = timestampToTime(today)
  targetDay = timestampToTime(targetDay)
  return { today, targetDay }
}

/**
 * [ 获取指定之前几个月的跨度，根据传入的参数Number，返回一个包含每个月所有日期的二维数组]
 * @param  {[Number]} number [数字]
 * @param  {[String]} date   [可选，日期（'2018-02-20'）]
 * @return {[Array]}
 *  Example:getPreMontAllDate(2) ->[ ["2018-04-01", ...., "2018-04-30"],["2018-03-01", ...."2018-03-31"]]
 */
export const getPreMontAllDate = (number = 0, date) => {
  let result = []
  let tempDate = date || timestampToTime(new Date())

  for (let i = 0; i <= number; i++) {
    let newDate = new Date(tempDate.replace(/\d+$/g, '1'))
    let unixTemp = newDate.setMonth(newDate.getMonth() - i)
    let tempArr = getMonthStartEnd(timestampToTime(new Date(unixTemp)))
    const { firstDay, lastDay } = tempArr
    result.push(getBetweenDateScope(firstDay, lastDay))
  }

  if (number > 0) {
    result.shift()
  }
  return result
}

/**
 * 获取倒推几周的每个礼拜一和礼拜日
 * @param count 传入几周就返回几周，默认是上一周
 * @returns 返回数组
 * Example:getPreWeeks(2)->[{monday: "2018-04-23", sunday: "2018-04-29"},{monday: "2018-04-16", sunday: "2018-04-22"}]
 */
export const getPreWeeks = (count = 1) => {
  let thisWeek = 8 // 因为包含"今天"，所以第一周算8天
  let days = []
  let lastWeekDays = []

  for (let i = 0; i < count; i++) {
    days.push(thisWeek + 7 * i)
  }
  lastWeekDays = days.map(item => getDateRange(item).targetDay)
  return lastWeekDays.map(item => {
    const { monday, sunday } = getWeekStartEnd(item)
    return { monday, sunday }
  })
}

/**
 * 获取当前日期所在星期的的礼拜一和礼拜日
 * @param {string} [date='2018-01-01']  传入日期
 * @returns  { monday, sunday } 礼拜一和礼拜日
 * Example:getWeekStartEnd('2018-05-05')->{monday: "2018-04-30", sunday: "2018-05-06"}
 */
export const getWeekStartEnd = (date = '2018-01-01') => {
  if (!date) return
  let now = new Date(date)
  let nowTime = now.getTime()
  let day = now.getDay()
  let oneDayTime = 24 * 60 * 60 * 1000
  let MondayTime = nowTime - (day - 1) * oneDayTime
  let SundayTime = nowTime + (7 - day) * oneDayTime
  let monday = new Date(MondayTime) // 礼拜一
  let sunday = new Date(SundayTime) // 礼拜日
  monday.setTime(monday.getTime())
  sunday.setTime(sunday.getTime())

  monday = timestampToTime(monday)
  sunday = timestampToTime(sunday)
  return { monday, sunday }
}

/**
 * 获取当月的第一天和最后一天
 * @param {string} [date='2018-01-01']  传入日期
 * @returns {firstDay, lastDay}  第一天和最后一天
 * Example: getMonthStartEnd('2018-05-05')->{firstDay: "2018-05-01", lastDay: "2018-05-31"}
 */
export const getMonthStartEnd = (date = '2018-01-01') => {
  let firstDay = new Date(date) // 第一天
  let lastDay = new Date(date) // 最后一天

  firstDay.setDate(1)
  lastDay.setMonth(lastDay.getMonth() + 1)
  lastDay.setDate(0)

  firstDay.setTime(firstDay.getTime())
  lastDay.setTime(lastDay.getTime())

  firstDay = timestampToTime(firstDay)
  lastDay = timestampToTime(lastDay)
  return { firstDay, lastDay }
}
