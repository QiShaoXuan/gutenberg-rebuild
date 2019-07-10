"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var Section = function Section(_ref) {
  var title = _ref.title,
      children = _ref.children;
  return (0, _element.createElement)("section", {
    className: "edit-post-options-modal__section"
  }, (0, _element.createElement)("h2", {
    className: "edit-post-options-modal__section-title"
  }, title), children);
};

var _default = Section;
exports.default = _default;
//# sourceMappingURL=section.js.map