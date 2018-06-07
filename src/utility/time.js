import moment from 'moment';

export const oneWeekBefore = moment()
  .subtract(7, 'days')
  .startOf('day');

export const yesterday = moment()
  .subtract(1, 'days')
  .startOf('day');

export const today = moment().startOf('day');

export const isLastOneWeek = createdAt =>
  moment(createdAt).isBetween(oneWeekBefore, today, null, '[]');
