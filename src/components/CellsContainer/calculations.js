import { cond } from 'lodash';

export const getCellSize = cond([
  [(v) => v < 100, () => 38],
  [(v) => v < 500, () => 20],
  [(v) => v < 1000, () => 18],
  [(v) => v < 2000, () => 16],
  [() => true, () => 11]
]);

export function getCellProps(index, itemsCount) {
  const [lived, total] = itemsCount;
  const color = index < lived ? 'IndianRed' : 'SteelBlue';

  return {
    color,
    tooltipText: 'Number 123 123 12 312 3 12: ' + ++index
  };
}

export const calculateSvgHeight = (rectSize, rowsAmount, margin) =>
  rectSize * rowsAmount + margin.top + margin.bottom;

export function getRectTableSize(size, width, count) {
  const colsAmount = Math.floor(width / size);
  return {
    colsAmount,
    rowsAmount: Math.ceil(count / colsAmount)
  };
}

export function createRectsData({
  containerWidth,
  count,
  size,
  gap,
  getAdditionalRectProps,
  color = 'SteelBlue',
  hoverColor = 'IndianRed'
}) {
  const emptyData = [...Array(count)];
  if (!containerWidth) return emptyData;

  const rectSize = size + gap * 2;
  const { colsAmount, rowsAmount } = getRectTableSize(
    rectSize,
    containerWidth,
    count
  );
  const xOffset = (containerWidth - rectSize * colsAmount) / 2 + gap;

  return emptyData.map((_, i) => {
    const additionalProps =
      typeof getAdditionalRectProps === 'function'
        ? getAdditionalRectProps(i)
        : {};

    return {
      x: getRectX(i, colsAmount, rectSize) + xOffset,
      y: getRectY(i, rowsAmount, rectSize, count, colsAmount),
      size,
      color,
      hoverColor,
      index: i,
      ...additionalProps
    };
  });
}

function getRectX(index, colsAmount, rectSize) {
  return (index % colsAmount) * rectSize;
}

function getRectY(index, rowsAmount, rectSize, count, colsAmount) {
  if (rowsAmount === 1 || count < colsAmount || index < colsAmount) return 0;

  return rectSize * getRow(index, colsAmount) - rectSize;
}

function getRow(index, colsAmount, possibleRow = 1) {
  return index < colsAmount * possibleRow
    ? possibleRow
    : getRow(index, colsAmount, possibleRow + 1);
}

export function getElementOuterInset(element, margin) {
  const outerLeft = Number(element.attr('x')) + Number(margin.left);

  return {
    outerLeft,
    outerRight: outerLeft + Number(element.attr('width')) - margin.right
  };
}
