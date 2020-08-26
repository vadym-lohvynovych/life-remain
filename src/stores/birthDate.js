import { writable, get } from 'svelte/store';

function createBirthDate() {
  const birthDate = writable(localStorage.getItem('birthDate') || null);

  birthDate.subscribe((val) => localStorage.setItem('birthDate', val));

  return {
    set: birthDate.set,
    subscribe: birthDate.subscribe,
    get: () => get(birthDate)
  };
}

export const birthDate = createBirthDate();
