import moment from 'moment'

export const displayCountMap = (countMap, shouldShowUrls = false) => {
  const countArray = Object.entries(countMap)
    .map(([key, value]) => ({
      name: key,
      count: value.count,
      urls: value.urls,
    }))
    .filter(({ name }) => name !== 'hera')
    .sort((a, b) => b.count - a.count)

  if (shouldShowUrls) {
    console.log(countArray) // eslint-disable-line
  } else {
    console.table(countArray, ['name', 'count']) // eslint-disable-line
  }
}

const oneWeekBefore = moment().subtract(7, 'days')

export const isLastOneWeek = createdAt =>
  moment(createdAt).isSameOrAfter(oneWeekBefore)
