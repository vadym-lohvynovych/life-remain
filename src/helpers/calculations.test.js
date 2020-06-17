import { getLifeCount } from './calculations';

const age = 25;

test('life counts returns 90 yeart without maxAge parameter', () => {
  expect(getLifeCount(new Date()).years).toBe(90);
});

test('life counts returns 1080 months without maxAge parameter', () => {
  expect(getLifeCount(new Date()).months).toBe(1080);
});

test('life count returns 4696 weeks without maxAge parameter', () => {
  expect(getLifeCount(new Date()).weeks).toBe(4696);
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
