import {
  intervalToDuration,
  formatDuration,
  differenceInYears,
  differenceInMonths,
  differenceInWeeks,
  differenceInDays,
  isFuture,
  isPast,
  isDate,
  addYears,
  endOfDay
} from 'date-fns';

const distanceFormatOptions = {
  format: ['years', 'months', 'weeks', 'days'],
  delimiter: ', '
};

export function getLifeCount(startLifeDate, maxAge = 90) {
  const now = new Date();
  const endLifeDate = endOfDay(addYears(startLifeDate, maxAge));

  if (!isDate(startLifeDate)) {
    throw new TypeError(
      'You should specify correct date object in first parameter'
    );
  } else if (isFuture(startLifeDate) || isPast(endLifeDate)) {
    throw new Error('Seems like you have a time machine');
  }

  const remainDuration = intervalToDuration({
    start: now,
    end: endLifeDate
  });

  const passedDuration = intervalToDuration({
    start: startLifeDate,
    end: now
  });

  const daysPassed = differenceInDays(now, startLifeDate);
  const daysTotal = differenceInDays(endLifeDate, startLifeDate) || 1;

  return {
    years: [
      differenceInYears(now, startLifeDate),
      differenceInYears(endLifeDate, startLifeDate)
    ],
    months: [
      differenceInMonths(now, startLifeDate),
      differenceInMonths(endLifeDate, startLifeDate)
    ],
    weeks: [
      differenceInWeeks(now, startLifeDate),
      differenceInWeeks(endLifeDate, startLifeDate)
    ],
    days: [
      differenceInDays(now, startLifeDate),
      differenceInDays(endLifeDate, startLifeDate)
    ],
    percent: Math.round((daysPassed / daysTotal) * 100 * 100) / 100,
    remain: formatDuration(remainDuration, distanceFormatOptions),
    passed: formatDuration(passedDuration, distanceFormatOptions)
  };
}
