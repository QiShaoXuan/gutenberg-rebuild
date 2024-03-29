/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
/**
 * Internal dependencies
 */

import addContainer from './addContainer';
import clear from './clear';
import filterMessage from './filterMessage';
/**
 * Create the live regions.
 */

export var setup = function setup() {
  var containerPolite = document.getElementById('a11y-speak-polite');
  var containerAssertive = document.getElementById('a11y-speak-assertive');

  if (containerPolite === null) {
    containerPolite = addContainer('polite');
  }

  if (containerAssertive === null) {
    containerAssertive = addContainer('assertive');
  }
};
/**
 * Run setup on domReady.
 */

domReady(setup);
/**
 * Allows you to easily announce dynamic interface updates to screen readers using ARIA live regions.
 * This module is inspired by the `speak` function in wp-a11y.js
 *
 * @param {string} message  The message to be announced by Assistive Technologies.
 * @param {string} ariaLive Optional. The politeness level for aria-live. Possible values:
 *                          polite or assertive. Default polite.
 *
 * @example
 * ```js
 * import { speak } from '@wordpress/a11y';
 *
 * // For polite messages that shouldn't interrupt what screen readers are currently announcing.
 * speak( 'The message you want to send to the ARIA live region' );
 *
 * // For assertive messages that should interrupt what screen readers are currently announcing.
 * speak( 'The message you want to send to the ARIA live region', 'assertive' );
 * ```
 */

export var speak = function speak(message, ariaLive) {
  // Clear previous messages to allow repeated strings being read out.
  clear();
  message = filterMessage(message);
  var containerPolite = document.getElementById('a11y-speak-polite');
  var containerAssertive = document.getElementById('a11y-speak-assertive');

  if (containerAssertive && 'assertive' === ariaLive) {
    containerAssertive.textContent = message;
  } else if (containerPolite) {
    containerPolite.textContent = message;
  }
};
//# sourceMappingURL=index.js.map