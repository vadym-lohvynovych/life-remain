function getCellSize(totalCellsCount) {
  switch (true) {
    case totalCellsCount < 100:
      return 38;

    case totalCellsCount < 500:
      return 18;

    case totalCellsCount < 1000:
      return 16;

    case totalCellsCount < 2000:
      return 14;

    default:
      return 11;
  }
}

export function getCellDefaultProps(color, size, additionalClassName) {
  return {
    style: `background-color: ${color}; width: ${size}px; height: ${size}px`,
    class: `cell ${additionalClassName}`
  };
}

export function getCellProps(index, itemsCount) {
  const [lived, total] = itemsCount;
  const color = index < lived ? 'IndianRed' : 'steelblue';

  return {
    color,
    tooltipText: index + 1,
    size: getCellSize(total),
    gap: total < 500 ? 3 : 1
  };
}
