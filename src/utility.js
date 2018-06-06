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
    const tmp = countArray.find(a => a.name === 'ryota-yamamoto')
    tmp.urls.forEach(element => console.log(element)) // eslint-disable-line
  } else {
    console.table(countArray, ['name', 'count']) // eslint-disable-line
  }
}

const oneWeekBefore = moment().subtract(7, 'days')

export const isLastOneWeek = createdAt =>
  moment(createdAt).isSameOrAfter(oneWeekBefore)

export const range = num => [...Array(num).keys()]
