export function getCellSize(totalCellsCount) {
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
    class: `cell block cursor-pointer rounded transition-shadow duration-100
    hover:shadow-outline relative ${additionalClassName}`
  };
}
