import moment from 'moment';
import Table from 'cli-table';

export const range = num => [...Array(num).keys()];

export const sortCountMap = countMap =>
  Object.entries(countMap)
    .map(([key, value]) => ({
      name: key,
      count: value.count,
      urls: value.urls,
    }))
    .filter(({ name }) => name !== 'hera')
    .sort((a, b) => b.count - a.count);

export const createCountTable = countMap => {
  const countArray = sortCountMap(countMap);
  const table = new Table({
    head: ['name', 'review count'],
    style: { compact: true },
    colAligns: ['left', 'right'],
  });

  countArray.forEach(count => {
    table.push([count.name, count.count]);
  });

  return table.toString().replace(/\[90m|\[39m|\[31m/g, '');
};

export const oneWeekBefore = moment().subtract(7, 'days');

export const isLastOneWeek = createdAt =>
  moment(createdAt).isSameOrAfter(oneWeekBefore);
