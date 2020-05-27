import flatpickr from 'flatpickr';

export function asFlatpickr(node, options) {
  const fp = flatpickr(node, options);

  return {
    update(newOptions) {
      Object.keys(newOptions).forEach((key) => {
        if (options[key] !== newOptions[key]) {
          fp.set(key, newOptions[key]);
        }
      });
    },
    destroy() {
      fp.destroy();
    }
  };
}
