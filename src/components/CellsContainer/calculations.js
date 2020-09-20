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
    tooltipText: 'Number ' + ++index
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

export function getTooltipElementsBounding({
  innerWidth,
  rect,
  text,
  xPadding,
  yPadding,
  margin
}) {
  const bgWidth = text.width + xPadding * 2;

  let textX = text.x;
  let textY = text.y;
  let bgX = rect.x;
  let bgY = textY - text.height + yPadding;
  let trianglePath = `M ${rect.x + rect.size / 2} ${rect.y} l 3 -3 l -6 0 z`;

  if (Number(bgY) + Number(margin.top) < 0) {
    //outside top
    const yMargin = rect.y + rect.size + 2;
    bgY = yMargin;
    textY = yMargin + text.height - yPadding;
    trianglePath = `M ${rect.x + rect.size / 2} ${
      rect.y + rect.size
    } l -3 3 l 6 0 z`;
  }

  // centrating
  if (bgWidth > rect.size) {
    const offset = (bgWidth - rect.size) / 2;
    bgX = rect.x - offset;
    textX = textX - offset;
  } else if (bgWidth < rect.size) {
    const offset = (rect.size - bgWidth) / 2;
    bgX = rect.x + offset;
    textX = textX + offset;
  }

  const { outerLeft, outerRight } = getElementOuterInset(bgX, bgWidth, margin);

  if (outerRight > innerWidth + margin.right) {
    //outside right
    const offset = outerRight - innerWidth + xPadding * 2 - margin.right;
    bgX -= offset;
    textX -= offset;
  } else if (outerLeft < 0) {
    //outside left
    bgX = -margin.left;
    textX = xPadding - margin.left;
  }

  return {
    textBounding: {
      x: textX,
      y: textY
    },
    bgBounding: {
      x: bgX,
      y: bgY,
      width: bgWidth,
      height: text.height + yPadding * 2
    },
    trianglePath
  };
}

export const createDomain = (rowsAmount, colsAmount) =>
  [...Array(rowsAmount)].map((r, i) => i * colsAmount + 1);

export const createRange = (height, margin, rectSize) => [
  margin.top + rectSize / 2,
  height - margin.bottom - rectSize / 2
];

function getElementOuterInset(elementX, elementWidth, margin) {
  const outerLeft = Number(elementX) + Number(margin.left);

  return {
    outerLeft,
    outerRight: outerLeft + Number(elementWidth) - margin.right
  };
}
