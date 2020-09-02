import Wrapper from './Wrapper.svelte';

export default { title: 'CellsContainer' };

export const Count10 = () => ({
  Component: Wrapper,
  props: {
    count: 10
  }
});
export const Count500 = () => ({
  Component: Wrapper,
  props: {
    count: 500
  }
});
export const Count1000 = () => ({
  Component: Wrapper,
  props: {
    count: 1000
  }
});
