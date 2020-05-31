export function asSlider(node) {
  let x;

  function handleMousedown(e) {
    x = typeof e.clientX == 'number' ? e.clientX : e.touches[0].clientX;
    node.dispatchEvent(
      new CustomEvent('slideStart', {
        detail: { x }
      })
    );

    document.body.addEventListener('mousemove', handleMousemove);
    document.body.addEventListener('touchmove', handleMousemove);
    document.body.addEventListener('mouseup', handleMouseup);
    document.body.addEventListener('touchend', handleMouseup);
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

    document.body.removeEventListener('mousemove', handleMousemove);
    document.body.removeEventListener('touchmove', handleMousemove);
    document.body.removeEventListener('mouseup', handleMouseup);
    document.body.removeEventListener('touchend', handleMouseup);
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
