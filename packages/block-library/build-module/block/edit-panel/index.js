import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { Component, Fragment, createRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ESCAPE } from '@wordpress/keycodes';
import { withInstanceId } from '@wordpress/compose';

var ReusableBlockEditPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(ReusableBlockEditPanel, _Component);

  function ReusableBlockEditPanel() {
    var _this;

    _classCallCheck(this, ReusableBlockEditPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReusableBlockEditPanel).apply(this, arguments));
    _this.titleField = createRef();
    _this.editButton = createRef();
    _this.handleFormSubmit = _this.handleFormSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleTitleChange = _this.handleTitleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleTitleKeyDown = _this.handleTitleKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(ReusableBlockEditPanel, [{
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
      if (event.keyCode === ESCAPE) {
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
      return createElement(Fragment, null, !isEditing && !isSaving && createElement("div", {
        className: "reusable-block-edit-panel"
      }, createElement("b", {
        className: "reusable-block-edit-panel__info"
      }, title), createElement(Button, {
        ref: this.editButton,
        isLarge: true,
        className: "reusable-block-edit-panel__button",
        disabled: isEditDisabled,
        onClick: onEdit
      }, __('Edit'))), (isEditing || isSaving) && createElement("form", {
        className: "reusable-block-edit-panel",
        onSubmit: this.handleFormSubmit
      }, createElement("label", {
        htmlFor: "reusable-block-edit-panel__title-".concat(instanceId),
        className: "reusable-block-edit-panel__label"
      }, __('Name:')), createElement("input", {
        ref: this.titleField,
        type: "text",
        disabled: isSaving,
        className: "reusable-block-edit-panel__title",
        value: title,
        onChange: this.handleTitleChange,
        onKeyDown: this.handleTitleKeyDown,
        id: "reusable-block-edit-panel__title-".concat(instanceId)
      }), createElement(Button, {
        type: "submit",
        isLarge: true,
        isBusy: isSaving,
        disabled: !title || isSaving,
        className: "reusable-block-edit-panel__button"
      }, __('Save'))));
    }
  }]);

  return ReusableBlockEditPanel;
}(Component);

export default withInstanceId(ReusableBlockEditPanel);
//# sourceMappingURL=index.js.map