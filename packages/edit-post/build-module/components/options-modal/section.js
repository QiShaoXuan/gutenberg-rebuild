import { createElement } from "@wordpress/element";

var Section = function Section(_ref) {
  var title = _ref.title,
      children = _ref.children;
  return createElement("section", {
    className: "edit-post-options-modal__section"
  }, createElement("h2", {
    className: "edit-post-options-modal__section-title"
  }, title), children);
};

export default Section;
//# sourceMappingURL=section.js.map