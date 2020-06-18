import { formatDuration, isAfter } from 'date-fns';

export function getLifeCount(date, maxAge = 90) {
  if (!(date instanceof Date)) {
    throw new TypeError('You should specify a date object in first parameter');
  } else if (isAfter(date, new Date())) {
    throw new Error('Seems like you have a time machine');
  }

  const ageMiliseconds = Date.now() - date.getTime();
  const lifeMiliseconds = maxAge * 365.25 * 1000 * 3600 * 24 + 1000 * 3600 * 24;

  const ageValues = parseTime(ageMiliseconds);
  const lifeValues = parseTime(lifeMiliseconds);

  const remainedDuration = getDuration(
    lifeValues.years - ageValues.years,
    lifeValues.months - ageValues.months
  );

  const livedDuration = getDuration(ageValues.years, ageValues.months);

  return {
    years: [Math.floor(ageValues.years), Math.floor(lifeValues.years)],
    months: [Math.floor(ageValues.months), Math.floor(lifeValues.months)],
    weeks: [Math.floor(ageValues.weeks), Math.floor(lifeValues.weeks)],
    days: [Math.floor(ageValues.days), Math.floor(lifeValues.days)],
    percent: (ageValues.days / lifeValues.days) * 100,
    remain: formatDuration(remainedDuration, { delimiter: ', ' }),
    lived: formatDuration(livedDuration, { delimiter: ', ' })
  };
}

function getDuration(years, months) {
  const now = new Date();
  const daysInMonth =
    32 - new Date(now.getFullYear(), now.getMonth(), 32).getDate();

  const monthsDuration = (12 / 100) * (years % 1) * 100;
  const daysDuration = (daysInMonth / 100) * (months % 1) * 100;
  const weeksDuration = daysDuration > 7 ? daysDuration / 7 : 0;

  return {
    years: Math.floor(years),
    months: Math.floor(monthsDuration),
    weeks: Math.floor(weeksDuration),
    days: Math.floor(weeksDuration) ? 0 : Math.floor(daysDuration)
  };
}

function parseTime(time) {
  const toDaysCoef = 1000 * 3600 * 24;
  const toWeeksCoef = toDaysCoef * 7;
  const toMonthsCoef = toDaysCoef * (365.25 / 12);

  return {
    days: time / toDaysCoef,
    weeks: time / toWeeksCoef,
    months: time / toMonthsCoef,
    years: time / (365.25 * toDaysCoef)
  };
}
