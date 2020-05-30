export function asSlider(node) {
  let x;

  function handleMousedown(e) {
    x = typeof e.clientX == 'number' ? e.clientX : e.touches[0].clientX;
    node.dispatchEvent(
      new CustomEvent('slideStart', {
        detail: { x }
      })
    );

    window.addEventListener('mousemove', handleMousemove);
    window.addEventListener('touchmove', handleMousemove);
    window.addEventListener('mouseup', handleMouseup);
    window.addEventListener('touchend', handleMouseup);
  }

  function handleMousemove(e) {
    const clientX =
      typeof e.clientX == 'number' ? e.clientX : e.touches[0].clientX;

    const dx = clientX - x;

    node.dispatchEvent(
      new CustomEvent('slideMove', {
        detail: { x, dx }
      })
    );
  }

  function handleMouseup(e) {
    x = typeof e.clientX == 'number' ? e.clientX : e.changedTouches[0].clientX;

    node.dispatchEvent(
      new CustomEvent('slideEnd', {
        detail: { x }
      })
    );

    window.removeEventListener('mousemove', handleMousemove);
    window.removeEventListener('touchmove', handleMousemove);
    window.removeEventListener('mouseup', handleMouseup);
    window.removeEventListener('touchend', handleMouseup);
  }

  node.addEventListener('mousedown', handleMousedown);
  node.addEventListener('touchstart', handleMousedown);

  return {
    destroy() {
      node.removeEventListener('mousedown', handleMousedown);
      node.removeEventListener('touchstart', handleMousedown);
    }
  };
}
