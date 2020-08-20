export function getPercent(number, percent) {
  return (number / 100) * percent;
}

export const setWidthToElement = (width) => (element) => {
  element.style.width = width;
};
