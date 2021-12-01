const MAX_DAYS_IN_MONTH = 31;
const WEEKS_IN_MONTH = 4;
const MONTHES_IN_AN_YEAR = 12;

export const intervalType = {
  daily: Array.from({ length: MAX_DAYS_IN_MONTH }, (_, k) => k + 1),
  weekly: Array.from({ length: WEEKS_IN_MONTH }, (_, k) => k + 1),
  monthly: Array.from({ length: MONTHES_IN_AN_YEAR }, (_, k) => k + 1),
};

export const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const eventInDayOfWeek = [
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'sixth',
  'last',
];

export const recurrencePatterns = [
  'daily',
  'weekly',
  'on the same day of the month',
  'on the same day of the week in the month (example: "every second Wednesday of the month")',
];

export const initialVal = {
  patternType: '',
  interval: '',
  daysOfWeek: [],
  index: '',
  dates: '',
  startDate: '',
  finishDate: '',
  group: '',
  theme: '',
  mentor: '',
};