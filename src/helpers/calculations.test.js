import { getLifeCount } from './calculations';

test('life count with current date returns correct years, months, weeks and lived values', () => {
  expect(getLifeCount(new Date())).toMatchObject({
    years: 90,
    months: 1080,
    weeks: 4696,
    lived: 0
  });
});

test("life count throwing TypeError if first parameter isn't date object", () => {
  let error = null;
  try {
    getLifeCount({});
  } catch (e) {
    error = e;
  }
  expect(error instanceof TypeError).toBe(true);
});

test('life count throwing Error if date is in the future', () => {
  let error = null;
  try {
    getLifeCount(new Date(Date.now() + 1));
  } catch (e) {
    error = e;
  }
  expect(error instanceof Error).toBe(true);
});
