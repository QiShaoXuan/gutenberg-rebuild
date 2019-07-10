"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _keycodes = require("@wordpress/keycodes");

var _compose = require("@wordpress/compose");

/**
 * WordPress dependencies
 */
var ReusableBlockEditPanel =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ReusableBlockEditPanel, _Component);

  function ReusableBlockEditPanel() {
    var _this;

    (0, _classCallCheck2.default)(this, ReusableBlockEditPanel);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ReusableBlockEditPanel).apply(this, arguments));
    _this.titleField = (0, _element.createRef)();
    _this.editButton = (0, _element.createRef)();
    _this.handleFormSubmit = _this.handleFormSubmit.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleTitleChange = _this.handleTitleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleTitleKeyDown = _this.handleTitleKeyDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(ReusableBlockEditPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // Select the input text when the form opens.
      if (this.props.isEditing && this.titleField.current) {
        this.titleField.current.select();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // Select the input text only once when the form opens.
      if (!prevProps.isEditing && this.props.isEditing) {
        this.titleField.current.select();
      } // Move focus back to the Edit button after pressing the Escape key or Save.


      if ((prevProps.isEditing || prevProps.isSaving) && !this.props.isEditing && !this.props.isSaving) {
        this.editButton.current.focus();
      }
    }
  }, {
    key: "handleFormSubmit",
    value: function handleFormSubmit(event) {
      event.preventDefault();
      this.props.onSave();
    }
  }, {
    key: "handleTitleChange",
    value: function handleTitleChange(event) {
      this.props.onChangeTitle(event.target.value);
    }
  }, {
    key: "handleTitleKeyDown",
    value: function handleTitleKeyDown(event) {
      if (event.keyCode === _keycodes.ESCAPE) {
        event.stopPropagation();
        this.props.onCancel();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isEditing = _this$props.isEditing,
          title = _this$props.title,
          isSaving = _this$props.isSaving,
          isEditDisabled = _this$props.isEditDisabled,
          onEdit = _this$props.onEdit,
          instanceId = _this$props.instanceId;
      return (0, _element.createElement)(_element.Fragment, null, !isEditing && !isSaving && (0, _element.createElement)("div", {
        className: "reusable-block-edit-panel"
      }, (0, _element.createElement)("b", {
        className: "reusable-block-edit-panel__info"
      }, title), (0, _element.createElement)(_components.Button, {
        ref: this.editButton,
        isLarge: true,
        className: "reusable-block-edit-panel__button",
        disabled: isEditDisabled,
        onClick: onEdit
      }, (0, _i18n.__)('Edit'))), (isEditing || isSaving) && (0, _element.createElement)("form", {
        className: "reusable-block-edit-panel",
        onSubmit: this.handleFormSubmit
      }, (0, _element.createElement)("label", {
        htmlFor: "reusable-block-edit-panel__title-".concat(instanceId),
        className: "reusable-block-edit-panel__label"
      }, (0, _i18n.__)('Name:')), (0, _element.createElement)("input", {
        ref: this.titleField,
        type: "text",
        disabled: isSaving,
        className: "reusable-block-edit-panel__title",
        value: title,
        onChange: this.handleTitleChange,
        onKeyDown: this.handleTitleKeyDown,
        id: "reusable-block-edit-panel__title-".concat(instanceId)
      }), (0, _element.createElement)(_components.Button, {
        type: "submit",
        isLarge: true,
        isBusy: isSaving,
        disabled: !title || isSaving,
        className: "reusable-block-edit-panel__button"
      }, (0, _i18n.__)('Save'))));
    }
  }]);
  return ReusableBlockEditPanel;
}(_element.Component);

var _default = (0, _compose.withInstanceId)(ReusableBlockEditPanel);

exports.default = _default;
//# sourceMappingURL=index.js.map