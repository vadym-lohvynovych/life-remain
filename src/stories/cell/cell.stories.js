import Wrapper from './Wrapper.svelte';

export default { title: 'Cell' };

export const CustomizableCell = () => ({
  Component: Wrapper,
  props: {
    title: 'Cell',
    withRange: true,
    cellProps: {
      additionalClassName: 'mx-auto mt-8'
    }
  }
});
