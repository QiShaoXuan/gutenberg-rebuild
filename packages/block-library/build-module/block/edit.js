import _extends from "@babel/runtime/helpers/esm/extends";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { noop, partial } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component, Fragment } from '@wordpress/element';
import { Placeholder, Spinner, Disabled } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { BlockEdit } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import ReusableBlockEditPanel from './edit-panel';
import ReusableBlockIndicator from './indicator';

var ReusableBlockEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(ReusableBlockEdit, _Component);

  function ReusableBlockEdit(_ref) {
    var _this;

    var reusableBlock = _ref.reusableBlock;

    _classCallCheck(this, ReusableBlockEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReusableBlockEdit).apply(this, arguments));
    _this.startEditing = _this.startEditing.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.stopEditing = _this.stopEditing.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setAttributes = _this.setAttributes.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setTitle = _this.setTitle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.save = _this.save.bind(_assertThisInitialized(_assertThisInitialized(_this)));

    if (reusableBlock && reusableBlock.isTemporary) {
      // Start in edit mode when we're working with a newly created reusable block
      _this.state = {
        isEditing: true,
        title: reusableBlock.title,
        changedAttributes: {}
      };
    } else {
      // Start in preview mode when we're working with an existing reusable block
      _this.state = {
        isEditing: false,
        title: null,
        changedAttributes: null
      };
    }

    return _this;
  }

  _createClass(ReusableBlockEdit, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.reusableBlock) {
        this.props.fetchReusableBlock();
      }
    }
  }, {
    key: "startEditing",
    value: function startEditing() {
      var reusableBlock = this.props.reusableBlock;
      this.setState({
        isEditing: true,
        title: reusableBlock.title,
        changedAttributes: {}
      });
    }
  }, {
    key: "stopEditing",
    value: function stopEditing() {
      this.setState({
        isEditing: false,
        title: null,
        changedAttributes: null
      });
    }
  }, {
    key: "setAttributes",
    value: function setAttributes(attributes) {
      this.setState(function (prevState) {
        if (prevState.changedAttributes !== null) {
          return {
            changedAttributes: _objectSpread({}, prevState.changedAttributes, attributes)
          };
        }
      });
    }
  }, {
    key: "setTitle",
    value: function setTitle(title) {
      this.setState({
        title: title
      });
    }
  }, {
    key: "save",
    value: function save() {
      var _this$props = this.props,
          reusableBlock = _this$props.reusableBlock,
          onUpdateTitle = _this$props.onUpdateTitle,
          updateAttributes = _this$props.updateAttributes,
          block = _this$props.block,
          onSave = _this$props.onSave;
      var _this$state = this.state,
          title = _this$state.title,
          changedAttributes = _this$state.changedAttributes;

      if (title !== reusableBlock.title) {
        onUpdateTitle(title);
      }

      updateAttributes(block.clientId, changedAttributes);
      onSave();
      this.stopEditing();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          isSelected = _this$props2.isSelected,
          reusableBlock = _this$props2.reusableBlock,
          block = _this$props2.block,
          isFetching = _this$props2.isFetching,
          isSaving = _this$props2.isSaving,
          canUpdateBlock = _this$props2.canUpdateBlock;
      var _this$state2 = this.state,
          isEditing = _this$state2.isEditing,
          title = _this$state2.title,
          changedAttributes = _this$state2.changedAttributes;

      if (!reusableBlock && isFetching) {
        return createElement(Placeholder, null, createElement(Spinner, null));
      }

      if (!reusableBlock || !block) {
        return createElement(Placeholder, null, __('Block has been deleted or is unavailable.'));
      }

      var element = createElement(BlockEdit, _extends({}, this.props, {
        isSelected: isEditing && isSelected,
        clientId: block.clientId,
        name: block.name,
        attributes: _objectSpread({}, block.attributes, changedAttributes),
        setAttributes: isEditing ? this.setAttributes : noop
      }));

      if (!isEditing) {
        element = createElement(Disabled, null, element);
      }

      return createElement(Fragment, null, (isSelected || isEditing) && createElement(ReusableBlockEditPanel, {
        isEditing: isEditing,
        title: title !== null ? title : reusableBlock.title,
        isSaving: isSaving && !reusableBlock.isTemporary,
        isEditDisabled: !canUpdateBlock,
        onEdit: this.startEditing,
        onChangeTitle: this.setTitle,
        onSave: this.save,
        onCancel: this.stopEditing
      }), !isSelected && !isEditing && createElement(ReusableBlockIndicator, {
        title: reusableBlock.title
      }), element);
    }
  }]);

  return ReusableBlockEdit;
}(Component);

export default compose([withSelect(function (select, ownProps) {
  var _select = select('core/editor'),
      getReusableBlock = _select.__experimentalGetReusableBlock,
      isFetchingReusableBlock = _select.__experimentalIsFetchingReusableBlock,
      isSavingReusableBlock = _select.__experimentalIsSavingReusableBlock;

  var _select2 = select('core'),
      canUser = _select2.canUser;

  var _select3 = select('core/block-editor'),
      getBlock = _select3.getBlock;

  var ref = ownProps.attributes.ref;
  var reusableBlock = getReusableBlock(ref);
  return {
    reusableBlock: reusableBlock,
    isFetching: isFetchingReusableBlock(ref),
    isSaving: isSavingReusableBlock(ref),
    block: reusableBlock ? getBlock(reusableBlock.clientId) : null,
    canUpdateBlock: !!reusableBlock && !reusableBlock.isTemporary && !!canUser('update', 'blocks', ref)
  };
}), withDispatch(function (dispatch, ownProps) {
  var _dispatch = dispatch('core/editor'),
      fetchReusableBlocks = _dispatch.__experimentalFetchReusableBlocks,
      updateReusableBlockTitle = _dispatch.__experimentalUpdateReusableBlockTitle,
      saveReusableBlock = _dispatch.__experimentalSaveReusableBlock;

  var _dispatch2 = dispatch('core/block-editor'),
      updateBlockAttributes = _dispatch2.updateBlockAttributes;

  var ref = ownProps.attributes.ref;
  return {
    fetchReusableBlock: partial(fetchReusableBlocks, ref),
    updateAttributes: updateBlockAttributes,
    onUpdateTitle: partial(updateReusableBlockTitle, ref),
    onSave: partial(saveReusableBlock, ref)
  };
})])(ReusableBlockEdit);
//# sourceMappingURL=edit.js.map