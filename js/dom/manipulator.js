/**
 * manipulator.js
 * Camo
 *
 * Licensed under MIT (https://github.com/usecamo/camo/blob/master/LICENSE)
 */

export const Display = {
  BLOCK: 'block'
};

export const Manipulator = {
  hide(element) {
    if (element) {
      element.style.display = 'none';
    }
  },
  display(element, display) {
    if (element) {
      element.style.display = display;
    }
  }
};
