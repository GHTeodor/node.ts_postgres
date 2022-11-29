const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

const startOfDay = dayjs().startOf('day');
const startOfDayUtc = dayjs().utc().startOf('day');

console.log(startOfDay);
console.log(startOfDayUtc.format('dddd: MM - YYYY/MMM-DD A'));
console.log(startOfDay.toString());
console.log(startOfDayUtc.toString());
