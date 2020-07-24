import Wrapper from './Wrapper.svelte';
import SimpleCell from '../../components/SimpleCell.svelte';

export default { title: 'Cell' };

export const CustomizableCell = () => ({
  Component: Wrapper,
  props: {
    title: 'Сheck it out!'
  }
});

export const Simple = () => ({
  Component: SimpleCell,
  props: {
    color: 'red'
  }
});
