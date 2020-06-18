import { getLifeCount } from './calculations';
import { add } from 'date-fns';

const date25years = add(new Date(), { years: -25 });

test('life count with current date returns correct object', () => {
  expect(getLifeCount(new Date(), 90)).toMatchObject({
    years: [0, 90],
    months: [0, 1080],
    weeks: [0, 4696],
    days: [0, 32873],
    percent: 0,
    remain: '90 years',
    lived: ''
  });
});

test('life count returns correct object with 25 years date', () => {
  expect(getLifeCount(date25years, 90)).toMatchObject({
    years: [25, 90],
    months: [300, 1080],
    weeks: [1304, 4696],
    days: [9132, 32873],
    percent: (9132 / 32873) * 100,
    remain: '65 years',
    lived: '25 years'
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
