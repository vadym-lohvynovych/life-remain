export function getLifeCount(date, maxAge = 90) {
  if (!(date instanceof Date))
    throw new TypeError('You should specify a date object in first parameter');

  const toDays = 1000 * 3600 * 24;

  const ageMiliseconds = Date.now() - date.getTime();
  const lifeMiliseconds = maxAge * 365.25 * toDays;
  const lived = (ageMiliseconds / lifeMiliseconds) * 100;

  if (lived < 0) {
    throw new Error('Seems like you have a time machine');
  }

  const totalWeeks = Math.floor(lifeMiliseconds / (toDays * 7));
  const totalMonths = Math.floor(lifeMiliseconds / (toDays * (365.25 / 12)));

  const livedYears = (maxAge / 100) * lived;
  const monthsRemindPercent = (livedYears % 1) * 100;
  const livedMonths = (12 / 100) * monthsRemindPercent;
  const daysRemindPercent = (livedMonths % 1) * 100;
  const livedDays = (29.4167 / 100) * daysRemindPercent;

  return {
    totalYears: maxAge,
    totalMonths,
    totalWeeks,
    lived,
    stringValue: `${Math.floor(livedYears)} years, ${Math.floor(
      livedMonths
    )} months, ${Math.floor(livedDays)} days.`
  };
}
