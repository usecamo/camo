/**
 * eventHandler.test.js
 * Camo
 *
 * Licensed under MIT (https://github.com/usecamo/camo/blob/master/LICENSE)
 */

import { Event, EventHandler } from '../../../js/dom/eventHandler';

describe('EventHandler', () => {

  it('adds event listener', () => {
    const element = { addEventListener: jest.fn() };
    const handler = () => {};

    EventHandler.on(element, Event.CLICK, handler);

    expect(element.addEventListener).toHaveBeenNthCalledWith(1, Event.CLICK, handler);
  });
});
