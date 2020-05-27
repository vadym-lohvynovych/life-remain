import { birthDate } from './birthDate';

const testDate = 'testDate';

test('store returns null on empty local storage', () => {
  expect(birthDate.get()).toBeNull();
})

test('store set value', () => {
  birthDate.set(testDate);
  expect(birthDate.get()).toBe(testDate);
})

test('store returns date from local storage', () => {
  localStorage.setItem('birthDate', testDate);
  expect(birthDate.get()).toBe(testDate);
})

test('local storage returns date from store', () => {
  birthDate.set(testDate);
  expect(localStorage.getItem('birthDate')).toBe(testDate);
})
