export function getLifeCount(date, maxAge = 90) {
  const toDays = 1000 * 3600 * 24;
  const ageMiliseconds = Date.now() - date.getTime();
  const lifeMiliseconds = maxAge * 365.25 * toDays;

  const weeks = Math.floor(lifeMiliseconds / (toDays * 7));
  const months = Math.floor(lifeMiliseconds / (toDays * (365.25 / 12)));
  const years = Math.floor(lifeMiliseconds / (toDays * 365.25));

  return {
    weeks,
    months,
    years,
    lived: (ageMiliseconds / lifeMiliseconds) * 100
  };
}
