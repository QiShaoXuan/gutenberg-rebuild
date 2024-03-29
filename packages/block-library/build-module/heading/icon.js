import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Path, SVG } from '@wordpress/components';
export default createElement(SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, createElement(Path, {
  d: "M5 4v3h5.5v12h3V7H19V4z"
}), createElement(Path, {
  fill: "none",
  d: "M0 0h24v24H0V0z"
}));
//# sourceMappingURL=icon.js.map