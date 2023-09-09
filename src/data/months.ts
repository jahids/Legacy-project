export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'Jun',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const numberToMonths = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  Jun: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const startYear = 2010;
const endYear = new Date().getFullYear();
const years: number[] = [];
for (let year = startYear; year <= endYear; year++) {
  years.push(year);
}

export { years };
