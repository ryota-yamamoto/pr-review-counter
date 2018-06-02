import moment from 'moment'

export const displayCountMap = countMap => {
  const displayArray = Object.entries(countMap)
    .map(([key, value]) => ({
      name: key,
      count: value,
    }))
    .filter(({ name }) => name !== 'hera')
    .sort((a, b) => b.count - a.count)

  console.table(displayArray) // eslint-disable-line
}

const oneWeekBefore = moment().subtract(7, 'days')

export const isLastOneWeek = createdAt =>
  moment(createdAt).isSameOrAfter(oneWeekBefore)
