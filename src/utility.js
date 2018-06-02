export const displayCountMap = countMap => {
  const displayArray = Object.entries(countMap)
    .map(([key, value]) => ({
      name: key,
      count: value,
    }))
    .sort((a, b) => b.count - a.count)

  console.table(displayArray) // eslint-disable-line
}

export const gomi = ''
