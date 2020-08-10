import Wrapper from './Wrapper.svelte';

export default { title: 'Cell' };

export const CustomizableCell = () => ({
  Component: Wrapper,
  props: {
    title: 'Сheck it out!',
    total: 1080
  }
});
