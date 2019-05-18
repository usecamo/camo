/**
 * navbar.test.js
 * Camo
 *
 * Licensed under MIT (https://github.com/usecamo/camo/blob/master/LICENSE)
 */

import { Navbar, setupNavbarToggleHandler } from '../../js/navbar';
import { Dropdown } from '../../js/dropdown';
import { JSDOM } from 'jsdom';

describe('Navbar', () => {

  test('constructor', () => {
    const dom = new JSDOM(`
      <nav class="navbar">
        <button class="navbar-toggle" target="target-1 target-2"></button>
        <div class="navbar-body">
          <ul class="menu navbar-menu">
            <li id="dropdown-1" class="menu-item dropdown">
              <button class="menu-link dropdown-toggle"></button>
              <div class="dropdown-content"></div>
            </li>
            <li id="dropdown-2" class="menu-item dropdown">
              <button class="menu-link dropdown-toggle"></button>
              <div class="dropdown-content"></div>
            </li>
          </ul>
        </div>
      </nav>
    `);
    const document = dom.window.document;
    const navbarElement = document.querySelector('.navbar');
    const navbar = new Navbar(navbarElement);
    const toggleElement = document.querySelector('.navbar-toggle');
    const dropdown1Element = document.getElementById('dropdown-1');
    const dropdown1 = new Dropdown(dropdown1Element);
    const dropdown2Element = document.getElementById('dropdown-2');
    const dropdown2 = new Dropdown(dropdown2Element);

    expect(navbar.toggle).toBe(toggleElement);
    expect(navbar.targetIds).toEqual(['target-1', 'target-2']);
    expect(navbar.dropdowns).toEqual([dropdown1, dropdown2]);
  });

  describe('targets', () => {

    it('returns empty array if there is no toggle', () => {
      const dom = new JSDOM(`
        <nav class="navbar"></nav>
      `);
      const document = dom.window.document;
      const navbarElement = document.querySelector('.navbar');
      const navbar = new Navbar(navbarElement);

      expect(navbar.targets(document)).toStrictEqual([]);
    });

    it('returns empty array if there is no target attribute', () => {
      const dom = new JSDOM(`
        <nav class="navbar">
          <button class="navbar-toggle"></button>
        </nav>
      `);
      const document = dom.window.document;
      const navbarElement = document.querySelector('.navbar');
      const navbar = new Navbar(navbarElement);

      expect(navbar.targets(document)).toStrictEqual([]);
    });

    it('returns array of existing elements for the target ids', () => {
      const dom = new JSDOM(`
        <nav class="navbar">
          <button class="navbar-toggle" target="target-1 target-2"></button>
          <div id="target-2"></div>
        </nav>
      `);
      const document = dom.window.document;
      const navbarElement = document.querySelector('.navbar');
      const navbar = new Navbar(navbarElement);
      const target2Element = document.getElementById('target-2');

      expect(navbar.targets(document)).toEqual([target2Element]);
    });
  });

  describe('toggleTargets', () => {

    it('does not throw error without targets', () => {
      const dom = new JSDOM(`
        <nav class="navbar">
          <button class="navbar-toggle"></button>
        </nav>
      `);
      const document = dom.window.document;
      const navbarElement = document.querySelector('.navbar');
      const navbar = new Navbar(navbarElement);

      expect(() => navbar.toggleTargets()).not.toThrow(TypeError);
    });

    it('hides targets if first target is displayed', () => {
      const dom = new JSDOM(`
        <nav class="navbar">
          <button class="navbar-toggle" target="target-1 target-2 target-3"></button>
          <div id="target-1" style="display: block;"></div>
        </nav>
        <div id="target-2" style="display: none;"></div>
        <div id="target-3"></div>
      `);
      const document = dom.window.document;
      const navbarElement = document.querySelector('.navbar');
      const navbar = new Navbar(navbarElement);
      const target1Element = document.getElementById('target-1');
      const target2Element = document.getElementById('target-2');
      const target3Element = document.getElementById('target-3');

      navbar.toggleTargets(document);

      expect(target1Element.style.display).toEqual('none');
      expect(target2Element.style.display).toEqual('none');
      expect(target3Element.style.display).toEqual('none');
    });

    it('displays targets if first target is hidden', () => {
      const dom = new JSDOM(`
        <nav class="navbar">
          <button class="navbar-toggle" target="target-1 target-2 target-3"></button>
          <div id="target-1" style="display: none;"></div>
        </nav>
        <div id="target-2" style="display: block;"></div>
        <div id="target-3"></div>
      `);
      const document = dom.window.document;
      const navbarElement = document.querySelector('.navbar');
      const navbar = new Navbar(navbarElement);
      const target1Element = document.getElementById('target-1');
      const target2Element = document.getElementById('target-2');
      const target3Element = document.getElementById('target-3');

      navbar.toggleTargets(document);

      expect(target1Element.style.display).toEqual('block');
      expect(target2Element.style.display).toEqual('block');
      expect(target3Element.style.display).toEqual('block');
    });
  });

  describe('hideTargets', () => {

    it('does not throw error without toggle', () => {
      const dom = new JSDOM('<nav class="navbar"></nav>');
      const document = dom.window.document;
      const navbarElement = document.querySelector('.navbar');
      const navbar = new Navbar(navbarElement);

      expect(() => navbar.hideTargets()).not.toThrow(TypeError);
    });

    it('does not throw error without targets', () => {
      const dom = new JSDOM(`
        <nav class="navbar">
          <button class="navbar-toggle"></button>
        </nav>
      `);
      const document = dom.window.document;
      const navbarElement = document.querySelector('.navbar');
      const navbar = new Navbar(navbarElement);

      expect(() => navbar.hideTargets()).not.toThrow(TypeError);
    });

    it('sets value of aria-expanded attribute to false', () => {
      const dom = new JSDOM(`
        <nav class="navbar">
          <button class="navbar-toggle"></button>
        </nav>
      `);
      const document = dom.window.document;
      const navbarElement = document.querySelector('.navbar');
      const navbar = new Navbar(navbarElement);
      const navbarToggleElement = document.querySelector('.navbar-toggle');

      navbar.hideTargets();

      expect(navbarToggleElement.getAttribute('aria-expanded')).toEqual('false');
    });

    it('hides targets and dropdowns', () => {
      const dom = new JSDOM(`
        <nav class="navbar">
          <button class="navbar-toggle" target="target-1 target-3"></button>
          <div class="navbar-body">
            <ul class="menu navbar-menu">
              <li class="menu-item dropdown">
                <div id="dropdown-content-1" class="dropdown-content"></div>
              </li>
              <li class="menu-item dropdown">
                <div id="dropdown-content-2" class="dropdown-content"></div>
              </li>
            </ul>
          </div>
          <div id="target-1" style="display: none;"></div>
        </nav>
        <div id="target-2" style="display: block;"></div>
        <div id="target-3"></div>
      `);
      const document = dom.window.document;
      const navbarElement = document.querySelector('.navbar');
      const navbar = new Navbar(navbarElement);
      const dropdownContent1Element = document.getElementById('dropdown-content-1');
      const dropdownContent2Element = document.getElementById('dropdown-content-2');
      const target1Element = document.getElementById('target-1');
      const target2Element = document.getElementById('target-2');
      const target3Element = document.getElementById('target-3');

      navbar.hideTargets(document);

      expect(dropdownContent1Element.style.display).toEqual('none');
      expect(dropdownContent2Element.style.display).toEqual('none');
      expect(target1Element.style.display).toEqual('none');
      expect(target2Element.style.display).toEqual('block');
      expect(target3Element.style.display).toEqual('none');
    });
  });

  describe('displayTargets', () => {

    it('does not throw error without toggle', () => {
      const dom = new JSDOM('<nav class="navbar"></nav>');
      const document = dom.window.document;
      const navbarElement = document.querySelector('.navbar');
      const navbar = new Navbar(navbarElement);

      expect(() => navbar.displayTargets()).not.toThrow(TypeError);
    });

    it('does not throw error without targets', () => {
      const dom = new JSDOM(`
        <nav class="navbar">
          <button class="navbar-toggle"></button>
        </nav>
      `);
      const document = dom.window.document;
      const navbarElement = document.querySelector('.navbar');
      const navbar = new Navbar(navbarElement);

      expect(() => navbar.displayTargets()).not.toThrow(TypeError);
    });

    it('sets value of aria-expanded attribute to true', () => {
      const dom = new JSDOM(`
        <nav class="navbar">
          <button class="navbar-toggle"></button>
        </nav>
      `);
      const document = dom.window.document;
      const navbarElement = document.querySelector('.navbar');
      const navbar = new Navbar(navbarElement);
      const navbarToggleElement = document.querySelector('.navbar-toggle');

      navbar.displayTargets();

      expect(navbarToggleElement.getAttribute('aria-expanded')).toEqual('true');
    });

    it('displays targets', () => {
      const dom = new JSDOM(`
        <nav class="navbar">
          <button class="navbar-toggle" target="target-1 target-2"></button>
          <div id="target-1" style="display: none;"></div>
        </nav>
        <div id="target-2" style="display: block;"></div>
        <div id="target-3"></div>
      `);
      const document = dom.window.document;
      const navbarElement = document.querySelector('.navbar');
      const navbar = new Navbar(navbarElement);
      const target1Element = document.getElementById('target-1');
      const target2Element = document.getElementById('target-2');
      const target3Element = document.getElementById('target-3');

      navbar.displayTargets(document);

      expect(target1Element.style.display).toEqual('block');
      expect(target2Element.style.display).toEqual('block');
      expect(target3Element.style.display).toBeFalsy();
    });
  });
});

describe('setupNavbarToggleHandler', () => {

  test('click navbar toggle', () => {
    const dom = new JSDOM(`
      <nav class="navbar">
        <button class="navbar-toggle" target="target-1 target-2"></button>
        <div id="target-1" class="navbar-body" style="display: block;">
          <ul class="menu navbar-menu">
            <li class="menu-item dropdown">
              <div id="dropdown-content-1" class="dropdown-content" style="display: block;"></div>
            </li>
            <li class="menu-item dropdown">
              <div id="dropdown-content-2" class="dropdown-content"></div>
            </li>
          </ul>
        </div>
      </nav>
      <div id="target-2"></div>
    `);
    const document = dom.window.document;
    const click = new dom.window.Event('click', { bubbles: true });
    const toggle = document.querySelector('.navbar .navbar-toggle');
    const dropdownContent1Element = document.getElementById('dropdown-content-1');
    const dropdownContent2Element = document.getElementById('dropdown-content-2');
    const target1Element = document.getElementById('target-1');
    const target2Element = document.getElementById('target-2');

    setupNavbarToggleHandler(document);
    toggle.dispatchEvent(click);

    expect(dropdownContent1Element.style.display).toEqual('none');
    expect(dropdownContent2Element.style.display).toEqual('none');
    expect(target1Element.style.display).toEqual('none');
    expect(target2Element.style.display).toEqual('none');
  });
});
