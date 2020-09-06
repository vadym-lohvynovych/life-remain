export function asSlider(node) {
  let x;
  let y;

  const motionListenersModel = {
    mousemove: handleMousemove,
    touchmove: handleMousemove,
    mouseup: handleMouseup,
    touchend: handleMouseup
  };

  const beginningListenersModel = {
    mousedown: handleMousedown,
    touchstart: handleMousedown
  };

  function handleMousedown(e) {
    x = getClientXFromEvent(e);
    y = getClientYFromEvent(e);

    dispatchCustomEvent(node, 'slideStart', { x, y });

    handleListeners(motionListenersModel, 'add');
  }

  function handleMousemove(e) {
    const clientX = getClientXFromEvent(e);
    const clientY = getClientYFromEvent(e);

    const dx = clientX - x;
    const dy = clientY - y;

    dispatchCustomEvent(node, 'slideMove', { x, dx, dy });
  }

  function handleMouseup(e) {
    x = getClientXFromEvent(e, true);
    y = getClientYFromEvent(e, true);

    dispatchCustomEvent(node, 'slideEnd', { x, y });

    handleListeners(motionListenersModel, 'remove');
  }

  handleListeners(beginningListenersModel, 'add', node);

  return {
    destroy() {
      handleListeners(beginningListenersModel, 'remove', node);
    }
  };
}

function handleListeners(listenersModel, handler, node = document.body) {
  const listeners = {
    add: node.addEventListener.bind(node),
    remove: node.removeEventListener.bind(node)
  };

  Object.keys(listenersModel).forEach((type) => {
    listeners[handler](type, listenersModel[type]);
  });
}

function dispatchCustomEvent(node, name, detail) {
  node.dispatchEvent(new CustomEvent(name, { detail }));
}

function getClientXFromEvent(event, isMouseUp) {
  return typeof event.clientX == 'number'
    ? event.clientX
    : event[getTouchPropertyName(isMouseUp)][0].clientX;
}

function getClientYFromEvent(event, isMouseUp) {
  return typeof event.clientY == 'number'
    ? event.clientY
    : event[getTouchPropertyName(isMouseUp)][0].clientY;
}

function getTouchPropertyName(isMouseUp) {
  return isMouseUp ? 'changedTouches' : 'touches';
}
