import CellsWrapper from '../../components/CellsWrapper.svelte';

export default { title: 'Cells Wrapper' };

const getCellProps = (index, total) => {
  const color =
    Math.random() > 0.8
      ? '#' + Math.floor(Math.random() * 16777215).toString(16)
      : 'steelblue';

  return {
    index,
    color,
    popupText: index
  };
};

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
