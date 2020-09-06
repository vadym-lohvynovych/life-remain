import { writable, get } from 'svelte/store';

function createBirthDate() {
  const birthDate = writable(
    JSON.parse(localStorage.getItem('birthDate')) || null
  );

  birthDate.subscribe((val) =>
    localStorage.setItem('birthDate', JSON.stringify(val))
  );
  return {
    set: birthDate.set,
    subscribe: birthDate.subscribe,
    get: () => get(birthDate)
  };
}

export const birthDate = createBirthDate();
