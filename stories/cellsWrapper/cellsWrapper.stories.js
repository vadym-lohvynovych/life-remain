import CellsWrapper from './CellsWrapper.svelte';
import { getCellProps } from '../../src/components/Cell/helpers';

export default { title: 'Cells Wrapper' };

export const Total90 = () => ({
  Component: CellsWrapper,
  props: {
    total: 90,
    getCellProps
  }
});

export const Total1080 = () => ({
  Component: CellsWrapper,
  props: {
    total: 1080,
    getCellProps
  }
});

export const Total4695 = () => ({
  Component: CellsWrapper,
  props: {
    total: 4695,
    getCellProps
  }
});
