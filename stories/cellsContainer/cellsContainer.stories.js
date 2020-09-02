import Wrapper from './Wrapper.svelte';

export default { title: 'CellsContainer' };

export const CustomizableCells = () => ({
  Component: Wrapper,
  props: {
    count: 10
  }
});
