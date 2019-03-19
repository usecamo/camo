/**
 * eventHandler.js
 * Camo
 *
 * Licensed under MIT (https://github.com/usecamo/camo/blob/master/LICENSE)
 */

export const Event = {
  CLICK: 'click'
};

export const EventHandler = {
  on(element, event, handler) {
    element.addEventListener(event, handler);
  }
};
