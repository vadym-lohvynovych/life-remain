export function getPercent(number, percent) {
  return (number / 100) * percent;
}

export const setWidthToElement = (width) => (element) => {
  element.style.width = width;
};

export const toCapitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
