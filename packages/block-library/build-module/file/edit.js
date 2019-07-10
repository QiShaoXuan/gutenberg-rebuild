import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
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
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { getBlobByURL, isBlobURL, revokeBlobURL } from '@wordpress/blob';
import { ClipboardButton, IconButton, Toolbar, withNotices } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { BlockControls, BlockIcon, MediaUpload, MediaUploadCheck, MediaPlaceholder, RichText } from '@wordpress/block-editor';
import { mediaUpload } from '@wordpress/editor';
import { Component, Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import icon from './icon';
import FileBlockInspector from './inspector';

var FileEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(FileEdit, _Component);

  function FileEdit() {
    var _this;

    _classCallCheck(this, FileEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FileEdit).apply(this, arguments));
    _this.onSelectFile = _this.onSelectFile.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.confirmCopyURL = _this.confirmCopyURL.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.resetCopyConfirmation = _this.resetCopyConfirmation.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.changeLinkDestinationOption = _this.changeLinkDestinationOption.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.changeOpenInNewWindow = _this.changeOpenInNewWindow.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.changeShowDownloadButton = _this.changeShowDownloadButton.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      hasError: false,
      showCopyConfirmation: false
    };
    return _this;
  }

  _createClass(FileEdit, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props = this.props,
          attributes = _this$props.attributes,
          noticeOperations = _this$props.noticeOperations;
      var href = attributes.href; // Upload a file drag-and-dropped into the editor

      if (isBlobURL(href)) {
        var file = getBlobByURL(href);
        mediaUpload({
          filesList: [file],
          onFileChange: function onFileChange(_ref) {
            var _ref2 = _slicedToArray(_ref, 1),
                media = _ref2[0];

            return _this2.onSelectFile(media);
          },
          onError: function onError(message) {
            _this2.setState({
              hasError: true
            });

            noticeOperations.createErrorNotice(message);
          }
        });
        revokeBlobURL(href);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // Reset copy confirmation state when block is deselected
      if (prevProps.isSelected && !this.props.isSelected) {
        this.setState({
          showCopyConfirmation: false
        });
      }
    }
  }, {
    key: "onSelectFile",
    value: function onSelectFile(media) {
      if (media && media.url) {
        this.setState({
          hasError: false
        });
        this.props.setAttributes({
          href: media.url,
          fileName: media.title,
          textLinkHref: media.url,
          id: media.id
        });
      }
    }
  }, {
    key: "confirmCopyURL",
    value: function confirmCopyURL() {
      this.setState({
        showCopyConfirmation: true
      });
    }
  }, {
    key: "resetCopyConfirmation",
    value: function resetCopyConfirmation() {
      this.setState({
        showCopyConfirmation: false
      });
    }
  }, {
    key: "changeLinkDestinationOption",
    value: function changeLinkDestinationOption(newHref) {
      // Choose Media File or Attachment Page (when file is in Media Library)
      this.props.setAttributes({
        textLinkHref: newHref
      });
    }
  }, {
    key: "changeOpenInNewWindow",
    value: function changeOpenInNewWindow(newValue) {
      this.props.setAttributes({
        textLinkTarget: newValue ? '_blank' : false
      });
    }
  }, {
    key: "changeShowDownloadButton",
    value: function changeShowDownloadButton(newValue) {
      this.props.setAttributes({
        showDownloadButton: newValue
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          isSelected = _this$props2.isSelected,
          attributes = _this$props2.attributes,
          setAttributes = _this$props2.setAttributes,
          noticeUI = _this$props2.noticeUI,
          noticeOperations = _this$props2.noticeOperations,
          media = _this$props2.media;
      var fileName = attributes.fileName,
          href = attributes.href,
          textLinkHref = attributes.textLinkHref,
          textLinkTarget = attributes.textLinkTarget,
          showDownloadButton = attributes.showDownloadButton,
          downloadButtonText = attributes.downloadButtonText,
          id = attributes.id;
      var _this$state = this.state,
          hasError = _this$state.hasError,
          showCopyConfirmation = _this$state.showCopyConfirmation;
      var attachmentPage = media && media.link;

      if (!href || hasError) {
        return createElement(MediaPlaceholder, {
          icon: createElement(BlockIcon, {
            icon: icon
          }),
          labels: {
            title: __('File'),
            instructions: __('Drag a file, upload a new one or select a file from your library.')
          },
          onSelect: this.onSelectFile,
          notices: noticeUI,
          onError: noticeOperations.createErrorNotice,
          accept: "*"
        });
      }

      var classes = classnames(className, {
        'is-transient': isBlobURL(href)
      });
      return createElement(Fragment, null, createElement(FileBlockInspector, _extends({
        hrefs: {
          href: href,
          textLinkHref: textLinkHref,
          attachmentPage: attachmentPage
        }
      }, {
        openInNewWindow: !!textLinkTarget,
        showDownloadButton: showDownloadButton,
        changeLinkDestinationOption: this.changeLinkDestinationOption,
        changeOpenInNewWindow: this.changeOpenInNewWindow,
        changeShowDownloadButton: this.changeShowDownloadButton
      })), createElement(BlockControls, null, createElement(MediaUploadCheck, null, createElement(Toolbar, null, createElement(MediaUpload, {
        onSelect: this.onSelectFile,
        value: id,
        render: function render(_ref3) {
          var open = _ref3.open;
          return createElement(IconButton, {
            className: "components-toolbar__control",
            label: __('Edit file'),
            onClick: open,
            icon: "edit"
          });
        }
      })))), createElement("div", {
        className: classes
      }, createElement("div", {
        className: 'wp-block-file__content-wrapper'
      }, createElement(RichText, {
        wrapperClassName: 'wp-block-file__textlink',
        tagName: "div" // must be block-level or else cursor disappears
        ,
        value: fileName,
        placeholder: __('Write file name…'),
        keepPlaceholderOnFocus: true,
        formattingControls: [] // disable controls
        ,
        onChange: function onChange(text) {
          return setAttributes({
            fileName: text
          });
        }
      }), showDownloadButton && createElement("div", {
        className: 'wp-block-file__button-richtext-wrapper'
      }, createElement(RichText, {
        tagName: "div" // must be block-level or else cursor disappears
        ,
        className: 'wp-block-file__button',
        value: downloadButtonText,
        formattingControls: [] // disable controls
        ,
        placeholder: __('Add text…'),
        keepPlaceholderOnFocus: true,
        onChange: function onChange(text) {
          return setAttributes({
            downloadButtonText: text
          });
        }
      }))), isSelected && createElement(ClipboardButton, {
        isDefault: true,
        text: href,
        className: 'wp-block-file__copy-url-button',
        onCopy: this.confirmCopyURL,
        onFinishCopy: this.resetCopyConfirmation,
        disabled: isBlobURL(href)
      }, showCopyConfirmation ? __('Copied!') : __('Copy URL'))));
    }
  }]);

  return FileEdit;
}(Component);

export default compose([withSelect(function (select, props) {
  var _select = select('core'),
      getMedia = _select.getMedia;

  var id = props.attributes.id;
  return {
    media: id === undefined ? undefined : getMedia(id)
  };
}), withNotices])(FileEdit);
//# sourceMappingURL=edit.js.map