import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { G, Path, SVG } from '@wordpress/components';
export default createElement(SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, createElement(G, null, createElement(Path, {
  d: "M13 4v2h3.59L6 16.59V13H4v7h7v-2H7.41L18 7.41V11h2V4h-7"
})));
//# sourceMappingURL=icon.js.map