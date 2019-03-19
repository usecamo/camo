/**
 * dropdown.js
 * Camo
 *
 * Licensed under MIT (https://github.com/usecamo/camo/blob/master/LICENSE)
 */

import { Display, Manipulator } from './dom/manipulator';
import { Event, EventHandler } from './dom/eventHandler';

export class Dropdown {

  constructor(element) {
    this.content = element.querySelector('.dropdown-content');
  }

  toggleContent() {
    if (!this.content) {
      return;
    }

    if (this.content.style.display === Display.BLOCK) {
      this.hideContent();
    } else {
      this.displayContent();
    }
  }

  hideContent() {
    Manipulator.hide(this.content);
  }

  displayContent() {
    Manipulator.display(this.content, Display.BLOCK);
  }
}

export function setupDropdownToggleHandler(element) {
  EventHandler.on(element, Event.CLICK, event => {
    const toggle = event.target.closest('.dropdown-toggle');

    if (toggle) {
      const dropdownElement = toggle.closest('.dropdown');

      if (!dropdownElement) {
        return;
      }

      const dropdown = new Dropdown(dropdownElement);

      dropdown.toggleContent();
    } else {
      const dropdownElements = element.getElementsByClassName('dropdown');
      const dropdowns = Array.prototype.map.call(dropdownElements, element => new Dropdown(element));

      dropdowns.forEach(dropdown => dropdown.hideContent());
    }
  });
}
