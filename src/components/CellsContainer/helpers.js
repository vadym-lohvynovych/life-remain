import { create } from 'd3';

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

  return emptyData.map((_, i) => {
    const additionalProps =
      typeof getAdditionalRectProps === 'function'
        ? getAdditionalRectProps(i)
        : {};

    return {
      x: getRectX(i, colsAmount, rectSize),
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

  for (let i = 1; i <= rowsAmount; i++) {
    if (index < colsAmount * i) {
      return rectSize * i - rectSize;
    }
  }
}
