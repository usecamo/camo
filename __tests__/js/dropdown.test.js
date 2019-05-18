/**
 * dropdown.test.js
 * Camo
 *
 * Licensed under MIT (https://github.com/usecamo/camo/blob/master/LICENSE)
 */

import { Dropdown, setupDropdownToggleHandler } from '../../js/dropdown';
import { JSDOM } from 'jsdom';

describe('Dropdown', () => {

  test('constructor', () => {
    const dom = new JSDOM(`
      <li class="dropdown">
        <button class="dropdown-toggle"></button>
        <div class="dropdown-content"></div>
      </li>
    `);
    const document = dom.window.document;
    const dropdownElement = document.querySelector('.dropdown');
    const dropdown = new Dropdown(dropdownElement);
    const toggleElement = document.querySelector('.dropdown-toggle');
    const contentElement = document.querySelector('.dropdown-content');

    expect(dropdown.toggle).toBe(toggleElement);
    expect(dropdown.content).toBe(contentElement);
  });

  describe('opened', () => {

    it('returns true when value of display style is block', () => {
      const dom = new JSDOM(`
        <li class="dropdown">
          <div class="dropdown-content" style="display: block;"></div>
        </li>
      `);
      const document = dom.window.document;
      const dropdownElement = document.querySelector('.dropdown');
      const dropdown = new Dropdown(dropdownElement);

      expect(dropdown.opened).toBeTruthy();
    });

    it('returns false when display style does not exist', () => {
      const dom = new JSDOM(`
        <li class="dropdown">
          <div class="dropdown-content" style=""></div>
        </li>
      `);
      const document = dom.window.document;
      const dropdownElement = document.querySelector('.dropdown');
      const dropdown = new Dropdown(dropdownElement);

      expect(dropdown.opened).toBeFalsy();
    });

    it('returns false when value of display style is not block', () => {
      const dom = new JSDOM(`
        <li class="dropdown">
          <div class="dropdown-content" style="display: none;"></div>
        </li>
      `);
      const document = dom.window.document;
      const dropdownElement = document.querySelector('.dropdown');
      const dropdown = new Dropdown(dropdownElement);

      expect(dropdown.opened).toBeFalsy();
    });
  });

  describe('hideContent', () => {

    it('does not throw error without toggle', () => {
      const dom = new JSDOM(`
        <li class="dropdown">
          <div class="dropdown-content"></div>
        </li>
      `);
      const document = dom.window.document;
      const dropdownElement = document.querySelector('.dropdown');
      const dropdown = new Dropdown(dropdownElement);

      expect(() => dropdown.hideContent()).not.toThrow(TypeError);
    });

    it('does not throw error without content', () => {
      const dom = new JSDOM(`
        <li class="dropdown">
          <button class="dropdown-toggle"></button>
        </li>
      `);
      const document = dom.window.document;
      const dropdownElement = document.querySelector('.dropdown');
      const dropdown = new Dropdown(dropdownElement);

      expect(() => dropdown.hideContent()).not.toThrow(TypeError);
    });

    it('sets value of aria-expanded attribute to false', () => {
      const dom = new JSDOM(`
        <li class="dropdown">
          <button class="dropdown-toggle"></button>
        </li>
      `);
      const document = dom.window.document;
      const dropdownElement = document.querySelector('.dropdown');
      const dropdown = new Dropdown(dropdownElement);
      const dropdownToggleElement = dropdownElement.querySelector('.dropdown-toggle');

      dropdown.hideContent();

      expect(dropdownToggleElement.getAttribute('aria-expanded')).toEqual('false');
    });

    it('sets value of display style to none', () => {
      const dom = new JSDOM(`
        <li class="dropdown">
          <div class="dropdown-content"></div>
        </li>
      `);
      const document = dom.window.document;
      const dropdownElement = document.querySelector('.dropdown');
      const dropdown = new Dropdown(dropdownElement);
      const dropdownContentElement = dropdownElement.querySelector('.dropdown-content');

      dropdown.hideContent();

      expect(dropdownContentElement.style.display).toEqual('none');
    });

    it('overrides value of display style with none', () => {
      const dom = new JSDOM(`
        <li class="dropdown">
          <div class="dropdown-content" style="display: block;"></div>
        </li>
      `);
      const document = dom.window.document;
      const dropdownElement = document.querySelector('.dropdown');
      const dropdown = new Dropdown(dropdownElement);
      const dropdownContentElement = dropdownElement.querySelector('.dropdown-content');

      dropdown.hideContent();

      expect(dropdownContentElement.style.display).toEqual('none');
    });
  });

  describe('displayContent', () => {

    it('does not throw error without toggle', () => {
      const dom = new JSDOM(`
        <li class="dropdown">
          <div class="dropdown-content"></div>
        </li>
      `);
      const document = dom.window.document;
      const dropdownElement = document.querySelector('.dropdown');
      const dropdown = new Dropdown(dropdownElement);

      expect(() => dropdown.displayContent()).not.toThrow(TypeError);
    });

    it('does not throw error without content', () => {
      const dom = new JSDOM(`
        <li class="dropdown">
          <button class="dropdown-toggle"></button>
        </li>
      `);
      const document = dom.window.document;
      const dropdownElement = document.querySelector('.dropdown');
      const dropdown = new Dropdown(dropdownElement);

      expect(() => dropdown.displayContent()).not.toThrow(TypeError);
    });

    it('sets value of aria-expanded attribute to true', () => {
      const dom = new JSDOM(`
        <li class="dropdown">
          <button class="dropdown-toggle"></button>
        </li>
      `);
      const document = dom.window.document;
      const dropdownElement = document.querySelector('.dropdown');
      const dropdown = new Dropdown(dropdownElement);
      const dropdownToggleElement = dropdownElement.querySelector('.dropdown-toggle');

      dropdown.displayContent();

      expect(dropdownToggleElement.getAttribute('aria-expanded')).toEqual('true');
    });

    it('sets value of display style to block', () => {
      const dom = new JSDOM(`
        <li class="dropdown">
          <div class="dropdown-content"></div>
        </li>
      `);
      const document = dom.window.document;
      const dropdownElement = document.querySelector('.dropdown');
      const dropdown = new Dropdown(dropdownElement);
      const dropdownContentElement = dropdownElement.querySelector('.dropdown-content');

      dropdown.displayContent();

      expect(dropdownContentElement.style.display).toEqual('block');
    });

    it('overrides value of display style with block', () => {
      const dom = new JSDOM(`
        <li class="dropdown">
          <div class="dropdown-content" style="display: none;"></div>
        </li>
      `);
      const document = dom.window.document;
      const dropdownElement = document.querySelector('.dropdown');
      const dropdown = new Dropdown(dropdownElement);
      const dropdownContentElement = dropdownElement.querySelector('.dropdown-content');

      dropdown.displayContent();

      expect(dropdownContentElement.style.display).toEqual('block');
    });
  });
});

describe('setupDropdownToggleHandler', () => {

  let document;
  let clickEvent;
  let content1;
  let content2;
  let content3;

  beforeEach(() => {
    const dom = new JSDOM(`
      <li id="dropdown-1" class="dropdown">
        <button class="dropdown-toggle"></button>
        <div class="dropdown-content"></div>
      </li>
      <li id="dropdown-2" class="dropdown">
        <button class="dropdown-toggle"></button>
        <div class="dropdown-content"></div>
      </li>
      <li id="dropdown-3" class="dropdown">
        <button class="dropdown-toggle"></button>
        <div class="dropdown-content"></div>
      </li>
    `);

    document = dom.window.document;
    clickEvent = new dom.window.Event('click', { bubbles: true });
    content1 = document.querySelector('#dropdown-1 .dropdown-content');
    content2 = document.querySelector('#dropdown-2 .dropdown-content');
    content3 = document.querySelector('#dropdown-3 .dropdown-content');
  });

  test('click dropdown toggle to open', () => {
    const toggle = document.querySelector('#dropdown-1 .dropdown-toggle');

    content2.style.display = 'block';

    setupDropdownToggleHandler(document);
    toggle.dispatchEvent(clickEvent);

    expect(content1.style.display).toEqual('block');
    expect(content2.style.display).toEqual('none');
    expect(content3.style.display).toBeFalsy();
  });

  test('click dropdown toggle to close', () => {
    const toggle = document.querySelector('#dropdown-1 .dropdown-toggle');

    content1.style.display = 'block';
    content2.style.display = 'none';

    setupDropdownToggleHandler(document);
    toggle.dispatchEvent(clickEvent);

    expect(content1.style.display).toEqual('none');
    expect(content2.style.display).toEqual('none');
    expect(content3.style.display).toBeFalsy();
  });

  test('click document to hide dropdowns', () => {
    content1.style.display = 'block';
    content2.style.display = 'none';

    setupDropdownToggleHandler(document);
    document.body.dispatchEvent(clickEvent);

    expect(content1.style.display).toEqual('none');
    expect(content2.style.display).toEqual('none');
    expect(content3.style.display).toBeFalsy();
  });
});
