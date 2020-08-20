export function asSlider(node) {
  let x;

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

    dispatchCustomEvent(node, 'slideStart', { x });

    handleListeners(motionListenersModel, 'add');
  }

  function handleMousemove(e) {
    const clientX = getClientXFromEvent(e);

    const dx = clientX - x;

    dispatchCustomEvent(node, 'slideMove', { x, dx });
  }

  function handleMouseup(e) {
    x = getClientXFromEvent(e, true);

    dispatchCustomEvent(node, 'slideEnd', { x });

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

function getTouchPropertyName(isMouseUp) {
  return isMouseUp ? 'changedTouches' : 'touches';
}
