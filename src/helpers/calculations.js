export function getLifeCount(date, maxAge = 90) {
  if (!(date instanceof Date))
    throw new TypeError('You should specify a date object in first parameter');

  const toDays = 1000 * 3600 * 24;

  const ageMiliseconds = Date.now() - date.getTime();
  const lifeMiliseconds = maxAge * 365.25 * toDays;

  const weeks = Math.floor(lifeMiliseconds / (toDays * 7));
  const months = Math.floor(lifeMiliseconds / (toDays * (365.25 / 12)));
  const lived = (ageMiliseconds / lifeMiliseconds) * 100;

  if (lived < 0) {
    throw new Error('Seems like you have a time machine');
  }

  return {
    weeks,
    months,
    years: maxAge,
    lived: (ageMiliseconds / lifeMiliseconds) * 100
  };
}
