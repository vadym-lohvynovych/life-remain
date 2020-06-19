import { getLifeCount } from './calculations';
import { sub } from 'date-fns';

const now = new Date();
const date25years = sub(now, { years: 25 });
const customDate = sub(now, { years: 42, months: 3, days: 7 });

test('life count with current date returns correct object', () => {
  expect(getLifeCount(now, 90)).toMatchObject({
    years: [0, 90],
    months: [0, 1080],
    weeks: [0, 4695],
    days: [0, 32871],
    percent: 0,
    remain: '90 years',
    passed: ''
  });
});

test('life count returns correct object with 25 years date', () => {
  expect(getLifeCount(date25years, 90)).toMatchObject({
    years: [25, 90],
    months: [300, 1080],
    weeks: [1304, 4696],
    days: [9132, 32873],
    percent: 27.78,
    remain: '65 years',
    passed: '25 years'
  });
});

test('life count returns correct object for custom date', () => {
  expect(getLifeCount(customDate, 90)).toMatchObject({
    years: [42, 90],
    months: [507, 1080],
    weeks: [2205, 4696],
    days: [15440, 32873],
    percent: 46.97,
    remain: '47 years, 8 months, 22 days',
    passed: '42 years, 3 months, 7 days'
  });
});

test("life count throwing TypeError if first parameter isn't date object", () => {
  expect(() => {
    getLifeCount({});
  }).toThrowError();
});

test('life count throwing Error if date is in the future', () => {
  expect(() => {
    getLifeCount(new Date(Date.now() + 100));
  }).toThrowError();
});

test('life count throwing Error if date age is bigger than max age', () => {
  expect(() => {
    getLifeCount(new Date('1995'), 20);
  }).toThrowError();
});

test('life count throwing Error with invalid date', () => {
  expect(() => {
    getLifeCount(new Date('bad'));
  }).toThrowError();
});
