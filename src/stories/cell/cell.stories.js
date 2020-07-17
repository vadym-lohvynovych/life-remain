import Wrapper from './Wrapper.svelte';
import SimpleCell from '../../components/SimpleCell.svelte';

export default { title: 'Cell' };

export const CustomizableCell = () => ({
  Component: Wrapper,
  props: {
    title: 'Сheck it out!',
    cellProps: {
      additionalClassName: 'mx-auto mt-8'
    }
  }
});

export const Simple = () => ({
  Component: SimpleCell,
  props: {
    additionalClassName: 'mx-auto mt-5',
    color: 'red'
  }
});
