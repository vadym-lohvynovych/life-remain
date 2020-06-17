import { getLifeCount } from './calculations';

const age = 25;
const ageMonths = age * 12;
const ageWeeks = Math.floor((age * 365.25) / 7);

test('life count with current date returns correct years, months, weeks and lived values', () => {
  expect(getLifeCount(new Date())).toMatchObject({
    totalYears: 90,
    totalMonths: 1080,
    totalWeeks: 4696,
    lived: 0
  });
});

test('life count returns correct object with 25 years max date', () => {
  expect(getLifeCount(new Date(), age)).toMatchObject({
    totalYears: age,
    totalMonths: ageMonths,
    totalWeeks: ageWeeks
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
  // expect(getLifeCount(new Date(Date.now() + 1))).toThrowError();
});
