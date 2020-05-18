import Test from './Test.svelte';

import './tailwind.css';

export default { title: 'Test' };

export const Blue = () => ({
  Component: Test,
  props: {
    type: 'blue',
  },
});

export const Red = () => ({
  Component: Test,
  props: {
    type: 'red',
  },
});
