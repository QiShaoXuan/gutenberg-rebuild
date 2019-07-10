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

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _url = require("@wordpress/url");

var _label = _interopRequireDefault(require("../post-schedule/label"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var PostPublishPanelPostpublish =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PostPublishPanelPostpublish, _Component);

  function PostPublishPanelPostpublish() {
    var _this;

    (0, _classCallCheck2.default)(this, PostPublishPanelPostpublish);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PostPublishPanelPostpublish).apply(this, arguments));
    _this.state = {
      showCopyConfirmation: false
    };
    _this.onCopy = _this.onCopy.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onSelectInput = _this.onSelectInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.postLink = (0, _element.createRef)();
    return _this;
  }

  (0, _createClass2.default)(PostPublishPanelPostpublish, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.focusOnMount) {
        this.postLink.current.focus();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.dismissCopyConfirmation);
    }
  }, {
    key: "onCopy",
    value: function onCopy() {
      var _this2 = this;

      this.setState({
        showCopyConfirmation: true
      });
      clearTimeout(this.dismissCopyConfirmation);
      this.dismissCopyConfirmation = setTimeout(function () {
        _this2.setState({
          showCopyConfirmation: false
        });
      }, 4000);
    }
  }, {
    key: "onSelectInput",
    value: function onSelectInput(event) {
      event.target.select();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          isScheduled = _this$props.isScheduled,
          post = _this$props.post,
          postType = _this$props.postType;
      var postLabel = (0, _lodash.get)(postType, ['labels', 'singular_name']);
      var viewPostLabel = (0, _lodash.get)(postType, ['labels', 'view_item']);
      var postPublishNonLinkHeader = isScheduled ? (0, _element.createElement)(_element.Fragment, null, (0, _i18n.__)('is now scheduled. It will go live on'), " ", (0, _element.createElement)(_label.default, null), ".") : (0, _i18n.__)('is now live.');
      return (0, _element.createElement)("div", {
        className: "post-publish-panel__postpublish"
      }, (0, _element.createElement)(_components.PanelBody, {
        className: "post-publish-panel__postpublish-header"
      }, (0, _element.createElement)("a", {
        ref: this.postLink,
        href: post.link
      }, post.title || (0, _i18n.__)('(no title)')), " ", postPublishNonLinkHeader), (0, _element.createElement)(_components.PanelBody, null, (0, _element.createElement)("p", {
        className: "post-publish-panel__postpublish-subheader"
      }, (0, _element.createElement)("strong", null, (0, _i18n.__)('What’s next?'))), (0, _element.createElement)(_components.TextControl, {
        className: "post-publish-panel__postpublish-post-address",
        readOnly: true,
        label: (0, _i18n.sprintf)(
        /* translators: %s: post type singular name */
        (0, _i18n.__)('%s address'), postLabel),
        value: (0, _url.safeDecodeURIComponent)(post.link),
        onFocus: this.onSelectInput
      }), (0, _element.createElement)("div", {
        className: "post-publish-panel__postpublish-buttons"
      }, !isScheduled && (0, _element.createElement)(_components.Button, {
        isDefault: true,
        href: post.link
      }, viewPostLabel), (0, _element.createElement)(_components.ClipboardButton, {
        isDefault: true,
        text: post.link,
        onCopy: this.onCopy
      }, this.state.showCopyConfirmation ? (0, _i18n.__)('Copied!') : (0, _i18n.__)('Copy Link')))), children);
    }
  }]);
  return PostPublishPanelPostpublish;
}(_element.Component);

var _default = (0, _data.withSelect)(function (select) {
  var _select = select('core/editor'),
      getEditedPostAttribute = _select.getEditedPostAttribute,
      getCurrentPost = _select.getCurrentPost,
      isCurrentPostScheduled = _select.isCurrentPostScheduled;

  var _select2 = select('core'),
      getPostType = _select2.getPostType;

  return {
    post: getCurrentPost(),
    postType: getPostType(getEditedPostAttribute('type')),
    isScheduled: isCurrentPostScheduled()
  };
})(PostPublishPanelPostpublish);

exports.default = _default;
//# sourceMappingURL=postpublish.js.map