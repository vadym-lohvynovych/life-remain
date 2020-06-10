import { circIn } from 'svelte/easing';

export function expandableAnimation(node, { duration = 500, parent }) {
  const { top, left, height, width } = parent.getBoundingClientRect();

  return {
    duration,
    css: (t) => {
      const circ = circIn(t);

      return `
        transform-origin: ${left + width / 2}px ${top + height / 2}px;
        transform: scaleX(${Math.min(circ * 4, 1)}) scaleY(${circ});
        opacity: ${t};
        border-radius: ${30 * (1 - circ)}px;
      `;
    }
  };
}
