/**
 * manipulator.test.js
 * Camo
 *
 * Licensed under MIT (https://github.com/usecamo/camo/blob/master/LICENSE)
 */

import { Display, Manipulator } from '../../../js/dom/manipulator';

describe('Manipulator', () => {

  describe('hide element', () => {

    it('does not throw error without element', () => {
      expect(() => Manipulator.hide(null)).not.toThrow(TypeError);
    });

    it('sets value of display style to none', () => {
      const element = { style: {} };

      Manipulator.hide(element);

      expect(element.style.display).toEqual('none');
    });
  });

  describe('display element', () => {

    it('does not throw error without element', () => {
      expect(() => Manipulator.display(null)).not.toThrow(TypeError);
    });

    it('sets value of display style to block', () => {
      const element = { style: {} };

      Manipulator.display(element, Display.BLOCK);

      expect(element.style.display).toEqual('block');
    });
  });
});
