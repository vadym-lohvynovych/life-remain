import CellsWrapper from '../../components/CellsWrapper.svelte';
import DemoCell from './DemoCell';

export default { title: 'Cells Wrapper' };

const getCellProps = (index, total) => {
  const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  let size = null;

  // switch (true) {
  //   case total < 100:
  //     size = 25;
  //     break;

  //   case total < 500:
  //     size = 18;
  //     break;

  //   case total < 1000:
  //     size = 16;
  //     break;

  //   case total < 2000:
  //     size = 14;
  //     break;

  //   default:
  //     size = 10;
  // }

  return {
    index,
    total,
    color
    // size
  };
};

export const Total90 = () => ({
  Component: CellsWrapper,
  props: {
    component: DemoCell,
    total: 90,
    getCellProps
  }
});

export const Total1080 = () => ({
  Component: CellsWrapper,
  props: {
    component: DemoCell,
    total: 1080,
    getCellProps
  }
});

export const Total4695 = () => ({
  Component: CellsWrapper,
  props: {
    component: DemoCell,
    total: 4695,
    getCellProps
  }
});
