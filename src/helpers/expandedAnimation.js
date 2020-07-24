import { circIn } from 'svelte/easing';

export function expandAnimation(
  node,
  { duration = 400, parent, easing = circIn }
) {
  const {
    top,
    right,
    left,
    bottom,
    height,
    width
  } = parent.getBoundingClientRect();

  return {
    duration,
    css: (t) => {
      const circ = easing(t);

      const windowWidth = window?.visualViewport?.width
        ? window.visualViewport.width
        : window.innerWidth;

      const absoluteRight = windowWidth - right;
      const absoluteBottom = window.innerHeight - bottom;

      const coef = 3.5; // how fast sides of block will touch sides of screen

      let finalLeft = left - left * circ * coef;
      let finalRight = absoluteRight - absoluteRight * circ * coef;

      return `
        top: ${top - top * circ}px;
        left: ${finalLeft < 0 ? 0 : finalLeft}px;
        right: ${finalRight < 0 ? 0 : finalRight}px;
        bottom: ${absoluteBottom - absoluteBottom * circ}px;
        transform-origin: ${left + width / 2}px ${top + height / 2}px;
        opacity: ${0.1 + t};
        border-radius: ${20 * (1 - circ)}px;
      `;
    }
  };
}
