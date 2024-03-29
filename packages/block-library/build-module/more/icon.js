import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { G, Path, SVG } from '@wordpress/components';
export default createElement(SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, createElement(Path, {
  fill: "none",
  d: "M0 0h24v24H0V0z"
}), createElement(G, null, createElement(Path, {
  d: "M2 9v2h19V9H2zm0 6h5v-2H2v2zm7 0h5v-2H9v2zm7 0h5v-2h-5v2z"
})));
//# sourceMappingURL=icon.js.map