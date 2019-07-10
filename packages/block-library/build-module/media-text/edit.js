import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
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
import { get } from 'lodash';
/**
 * WordPress dependencies
 */

import { __, _x } from '@wordpress/i18n';
import { BlockControls, BlockVerticalAlignmentToolbar, InnerBlocks, InspectorControls, PanelColorSettings, withColors } from '@wordpress/block-editor';
import { Component, Fragment } from '@wordpress/element';
import { PanelBody, TextareaControl, ToggleControl, Toolbar, ExternalLink } from '@wordpress/components';
/**
 * Internal dependencies
 */

import MediaContainer from './media-container';
/**
 * Constants
 */

var ALLOWED_BLOCKS = ['core/button', 'core/paragraph', 'core/heading', 'core/list'];
var TEMPLATE = [['core/paragraph', {
  fontSize: 'large',
  placeholder: _x('Content…', 'content placeholder')
}]];

var MediaTextEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(MediaTextEdit, _Component);

  function MediaTextEdit() {
    var _this;

    _classCallCheck(this, MediaTextEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MediaTextEdit).apply(this, arguments));
    _this.onSelectMedia = _this.onSelectMedia.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onWidthChange = _this.onWidthChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.commitWidthChange = _this.commitWidthChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      mediaWidth: null
    };
    return _this;
  }

  _createClass(MediaTextEdit, [{
    key: "onSelectMedia",
    value: function onSelectMedia(media) {
      var setAttributes = this.props.setAttributes;
      var mediaType;
      var src; // for media selections originated from a file upload.

      if (media.media_type) {
        if (media.media_type === 'image') {
          mediaType = 'image';
        } else {
          // only images and videos are accepted so if the media_type is not an image we can assume it is a video.
          // video contain the media type of 'file' in the object returned from the rest api.
          mediaType = 'video';
        }
      } else {
        // for media selections originated from existing files in the media library.
        mediaType = media.type;
      }

      if (mediaType === 'image') {
        // Try the "large" size URL, falling back to the "full" size URL below.
        src = get(media, ['sizes', 'large', 'url']) || get(media, ['media_details', 'sizes', 'large', 'source_url']);
      }

      setAttributes({
        mediaAlt: media.alt,
        mediaId: media.id,
        mediaType: mediaType,
        mediaUrl: src || media.url
      });
    }
  }, {
    key: "onWidthChange",
    value: function onWidthChange(width) {
      this.setState({
        mediaWidth: width
      });
    }
  }, {
    key: "commitWidthChange",
    value: function commitWidthChange(width) {
      var setAttributes = this.props.setAttributes;
      setAttributes({
        mediaWidth: width
      });
      this.setState({
        mediaWidth: null
      });
    }
  }, {
    key: "renderMediaArea",
    value: function renderMediaArea() {
      var attributes = this.props.attributes;
      var mediaAlt = attributes.mediaAlt,
          mediaId = attributes.mediaId,
          mediaPosition = attributes.mediaPosition,
          mediaType = attributes.mediaType,
          mediaUrl = attributes.mediaUrl,
          mediaWidth = attributes.mediaWidth;
      return createElement(MediaContainer, _extends({
        className: "block-library-media-text__media-container",
        onSelectMedia: this.onSelectMedia,
        onWidthChange: this.onWidthChange,
        commitWidthChange: this.commitWidthChange
      }, {
        mediaAlt: mediaAlt,
        mediaId: mediaId,
        mediaType: mediaType,
        mediaUrl: mediaUrl,
        mediaPosition: mediaPosition,
        mediaWidth: mediaWidth
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props = this.props,
          attributes = _this$props.attributes,
          className = _this$props.className,
          backgroundColor = _this$props.backgroundColor,
          isSelected = _this$props.isSelected,
          setAttributes = _this$props.setAttributes,
          setBackgroundColor = _this$props.setBackgroundColor;
      var isStackedOnMobile = attributes.isStackedOnMobile,
          mediaAlt = attributes.mediaAlt,
          mediaPosition = attributes.mediaPosition,
          mediaType = attributes.mediaType,
          mediaWidth = attributes.mediaWidth,
          verticalAlignment = attributes.verticalAlignment;
      var temporaryMediaWidth = this.state.mediaWidth;
      var classNames = classnames(className, (_classnames = {
        'has-media-on-the-right': 'right' === mediaPosition,
        'is-selected': isSelected
      }, _defineProperty(_classnames, backgroundColor.class, backgroundColor.class), _defineProperty(_classnames, 'is-stacked-on-mobile', isStackedOnMobile), _defineProperty(_classnames, "is-vertically-aligned-".concat(verticalAlignment), verticalAlignment), _classnames));
      var widthString = "".concat(temporaryMediaWidth || mediaWidth, "%");
      var style = {
        gridTemplateColumns: 'right' === mediaPosition ? "auto ".concat(widthString) : "".concat(widthString, " auto"),
        backgroundColor: backgroundColor.color
      };
      var colorSettings = [{
        value: backgroundColor.color,
        onChange: setBackgroundColor,
        label: __('Background Color')
      }];
      var toolbarControls = [{
        icon: 'align-pull-left',
        title: __('Show media on left'),
        isActive: mediaPosition === 'left',
        onClick: function onClick() {
          return setAttributes({
            mediaPosition: 'left'
          });
        }
      }, {
        icon: 'align-pull-right',
        title: __('Show media on right'),
        isActive: mediaPosition === 'right',
        onClick: function onClick() {
          return setAttributes({
            mediaPosition: 'right'
          });
        }
      }];

      var onMediaAltChange = function onMediaAltChange(newMediaAlt) {
        setAttributes({
          mediaAlt: newMediaAlt
        });
      };

      var onVerticalAlignmentChange = function onVerticalAlignmentChange(alignment) {
        setAttributes({
          verticalAlignment: alignment
        });
      };

      var mediaTextGeneralSettings = createElement(PanelBody, {
        title: __('Media & Text Settings')
      }, createElement(ToggleControl, {
        label: __('Stack on mobile'),
        checked: isStackedOnMobile,
        onChange: function onChange() {
          return setAttributes({
            isStackedOnMobile: !isStackedOnMobile
          });
        }
      }), mediaType === 'image' && createElement(TextareaControl, {
        label: __('Alt Text (Alternative Text)'),
        value: mediaAlt,
        onChange: onMediaAltChange,
        help: createElement(Fragment, null, createElement(ExternalLink, {
          href: "https://www.w3.org/WAI/tutorials/images/decision-tree"
        }, __('Describe the purpose of the image')), __('Leave empty if the image is purely decorative.'))
      }));
      return createElement(Fragment, null, createElement(InspectorControls, null, mediaTextGeneralSettings, createElement(PanelColorSettings, {
        title: __('Color Settings'),
        initialOpen: false,
        colorSettings: colorSettings
      })), createElement(BlockControls, null, createElement(Toolbar, {
        controls: toolbarControls
      }), createElement(BlockVerticalAlignmentToolbar, {
        onChange: onVerticalAlignmentChange,
        value: verticalAlignment
      })), createElement("div", {
        className: classNames,
        style: style
      }, this.renderMediaArea(), createElement(InnerBlocks, {
        allowedBlocks: ALLOWED_BLOCKS,
        template: TEMPLATE,
        templateInsertUpdatesSelection: false
      })));
    }
  }]);

  return MediaTextEdit;
}(Component);

export default withColors('backgroundColor')(MediaTextEdit);
//# sourceMappingURL=edit.js.map