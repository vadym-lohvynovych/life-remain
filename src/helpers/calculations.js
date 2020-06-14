export function getLifeCount(date, maxAge = 90) {
  const toDays = 1000 * 3600 * 24;
  const milisecondsAge = Date.now() - date.getTime();
  const fullLifeInMilliseconds = maxAge * 365.25 * toDays;

  const weeks = Math.floor(milisecondsAge / (toDays * 7));
  const months = Math.floor(milisecondsAge / (toDays * (365.25 / 12)));
  const years = Math.floor(milisecondsAge / (toDays * 365.25));

  return {
    weeks,
    months,
    years,
    lived: (milisecondsAge / fullLifeInMilliseconds) * 100
  };
}
