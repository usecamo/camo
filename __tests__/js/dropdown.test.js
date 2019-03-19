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
        <div class="dropdown-content"></div>
      </li>
    `);
    const document = dom.window.document;
    const dropdownElement = document.querySelector('.dropdown');
    const dropdown = new Dropdown(dropdownElement);

    expect(dropdown.content).toBeTruthy();
  });

  describe('toggleContent', () => {

    it('does not throw error without content', () => {
      const dom = new JSDOM(`
        <li class="dropdown"></li>
      `);
      const document = dom.window.document;
      const dropdownElement = document.querySelector('.dropdown');
      const dropdown = new Dropdown(dropdownElement);

      expect(() => dropdown.toggleContent()).not.toThrow(TypeError);
    });

    it('sets block for display style when it does not exists', () => {
      const dom = new JSDOM(`
        <li class="dropdown">
          <div class="dropdown-content"></div>
        </li>
      `);
      const document = dom.window.document;
      const dropdownElement = document.querySelector('.dropdown');
      const dropdown = new Dropdown(dropdownElement);

      dropdown.toggleContent();

      expect(dropdown.content.style.display).toEqual('block');
    });

    it('sets block for display style when it is none', () => {
      const dom = new JSDOM(`
        <li class="dropdown">
          <div class="dropdown-content" style="display: none;"></div>
        </li>
      `);
      const document = dom.window.document;
      const dropdownElement = document.querySelector('.dropdown');
      const dropdown = new Dropdown(dropdownElement);

      dropdown.toggleContent();

      expect(dropdown.content.style.display).toEqual('block');
    });

    it('sets none for display style when it is block', () => {
      const dom = new JSDOM(`
        <li class="dropdown">
          <div class="dropdown-content" style="display: block;"></div>
        </li>
      `);
      const document = dom.window.document;
      const dropdownElement = document.querySelector('.dropdown');
      const dropdown = new Dropdown(dropdownElement);

      dropdown.toggleContent();

      expect(dropdown.content.style.display).toEqual('none');
    });
  });

  describe('hideContent', () => {

    it('does not throw error without content', () => {
      const dom = new JSDOM(`
        <li class="dropdown"></li>
      `);
      const document = dom.window.document;
      const dropdownElement = document.querySelector('.dropdown');
      const dropdown = new Dropdown(dropdownElement);

      expect(() => dropdown.hideContent()).not.toThrow(TypeError);
    });

    it('sets none for display style', () => {
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

    it('overrides display style with none', () => {
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

    it('does not throw error without content', () => {
      const dom = new JSDOM(`
        <li class="dropdown"></li>
      `);
      const document = dom.window.document;
      const dropdownElement = document.querySelector('.dropdown');
      const dropdown = new Dropdown(dropdownElement);

      expect(() => dropdown.displayContent()).not.toThrow(TypeError);
    });

    it('sets block for display style', () => {
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

    it('overrides display style with block', () => {
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

  test('click dropdown toggle', () => {
    const toggle = document.querySelector('#dropdown-1 .dropdown-toggle');

    setupDropdownToggleHandler(document);
    toggle.dispatchEvent(clickEvent);

    expect(content1.style.display).toEqual('block');
    expect(content2.style.display).toBeFalsy();
    expect(content3.style.display).toBeFalsy();
  });

  test('click document to hide dropdowns', () => {
    content1.style.display = 'block';
    content2.style.display = 'none';

    setupDropdownToggleHandler(document);
    document.body.dispatchEvent(clickEvent);

    expect(content1.style.display).toEqual('none');
    expect(content2.style.display).toEqual('none');
    expect(content3.style.display).toEqual('none');
  });
});
