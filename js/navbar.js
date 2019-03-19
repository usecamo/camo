/**
 * navbar.js
 * Camo
 *
 * Licensed under MIT (https://github.com/usecamo/camo/blob/master/LICENSE)
 */

import { Display, Manipulator } from './dom/manipulator';
import { Event, EventHandler } from './dom/eventHandler';
import { Dropdown } from './dropdown';

export class Navbar {

  constructor(element) {
    const toggle = element.querySelector('.navbar-toggle');

    if (toggle) {
      const targetAttribute = toggle.getAttribute('target');

      if (targetAttribute) {
        this.targetIds = targetAttribute.split(' ');
      }
    }

    const dropdownElements = element.getElementsByClassName('dropdown');

    this.dropdowns = Array.prototype.map.call(dropdownElements, element => new Dropdown(element));
  }

  targets(element) {
    if (this.targetIds) {
      return this.targetIds
        .map(targetId => element.getElementById(targetId))
        .filter(element => element);
    } else {
      return [];
    }
  }

  toggleTargets(element) {
    const target = this.targets(element)[0];

    if (!target) {
      return;
    }

    if (target.style.display === Display.BLOCK) {
      this.hideTargets(element);
    } else {
      this.displayTargets(element);
    }
  }

  hideTargets(element) {
    this.targets(element).forEach(target => Manipulator.hide(target));
    this.dropdowns.forEach(dropdown => dropdown.hideContent());
  }

  displayTargets(element) {
    this.targets(element).forEach(target => Manipulator.display(target, Display.BLOCK));
  }
}

export function setupNavbarToggleHandler(element) {
  EventHandler.on(element, Event.CLICK, event => {
    const toggle = event.target.closest('.navbar-toggle');

    if (!toggle) {
      return;
    }

    const navbarElement = toggle.closest('.navbar');

    if (!navbarElement) {
      return;
    }

    const navbar = new Navbar(navbarElement);

    navbar.toggleTargets(element);
  });
}
