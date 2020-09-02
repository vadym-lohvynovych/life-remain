import { create } from 'd3';

export function getCellSize(totalCellsCount) {
  switch (true) {
    case totalCellsCount < 100:
      return 38;

    case totalCellsCount < 500:
      return 20;

    case totalCellsCount < 1000:
      return 18;

    case totalCellsCount < 2000:
      return 16;

    default:
      return 11;
  }
}

export function getCellProps(index, itemsCount) {
  const [lived, total] = itemsCount;
  const color = index < lived ? 'IndianRed' : 'SteelBlue';

  return {
    color,
    tooltipText: 'Number: ' + ++index
  };
}

export function setAttributes(el, attrs) {
  Object.keys(attrs).forEach((attr) => {
    el.attr(attr, attrs[attr]);
  });
}

export const createSvg = (width, height) =>
  create('svg').attr('width', width).attr('height', height);

export const getId = (name, index) => `${name}-${index}`;

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
  const colsAmount = Math.floor(containerWidth / rectSize);
  const rowsAmount = Math.ceil(count / colsAmount);
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
