/**
 * index.js
 * Camo
 *
 * Licensed under MIT (https://github.com/usecamo/camo/blob/master/LICENSE)
 */

import { setupDropdownToggleHandler } from './dropdown';
import { setupNavbarToggleHandler } from './navbar';

document.addEventListener('DOMContentLoaded', () => {
  setupNavbarToggleHandler(document);
  setupDropdownToggleHandler(document);
});
