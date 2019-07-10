import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { IconButton, ResizableBox, Toolbar } from '@wordpress/components';
import { BlockControls, BlockIcon, MediaPlaceholder, MediaUpload } from '@wordpress/block-editor';
import { Component, Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import icon from './media-container-icon';
/**
 * Constants
 */

var ALLOWED_MEDIA_TYPES = ['image', 'video'];

var MediaContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(MediaContainer, _Component);

  function MediaContainer() {
    _classCallCheck(this, MediaContainer);

    return _possibleConstructorReturn(this, _getPrototypeOf(MediaContainer).apply(this, arguments));
  }

  _createClass(MediaContainer, [{
    key: "renderToolbarEditButton",
    value: function renderToolbarEditButton() {
      var _this$props = this.props,
          mediaId = _this$props.mediaId,
          onSelectMedia = _this$props.onSelectMedia;
      return createElement(BlockControls, null, createElement(Toolbar, null, createElement(MediaUpload, {
        onSelect: onSelectMedia,
        allowedTypes: ALLOWED_MEDIA_TYPES,
        value: mediaId,
        render: function render(_ref) {
          var open = _ref.open;
          return createElement(IconButton, {
            className: "components-toolbar__control",
            label: __('Edit media'),
            icon: "edit",
            onClick: open
          });
        }
      })));
    }
  }, {
    key: "renderImage",
    value: function renderImage() {
      var _this$props2 = this.props,
          mediaAlt = _this$props2.mediaAlt,
          mediaUrl = _this$props2.mediaUrl,
          className = _this$props2.className;
      return createElement(Fragment, null, this.renderToolbarEditButton(), createElement("figure", {
        className: className
      }, createElement("img", {
        src: mediaUrl,
        alt: mediaAlt
      })));
    }
  }, {
    key: "renderVideo",
    value: function renderVideo() {
      var _this$props3 = this.props,
          mediaUrl = _this$props3.mediaUrl,
          className = _this$props3.className;
      return createElement(Fragment, null, this.renderToolbarEditButton(), createElement("figure", {
        className: className
      }, createElement("video", {
        controls: true,
        src: mediaUrl
      })));
    }
  }, {
    key: "renderPlaceholder",
    value: function renderPlaceholder() {
      var _this$props4 = this.props,
          onSelectMedia = _this$props4.onSelectMedia,
          className = _this$props4.className;
      return createElement(MediaPlaceholder, {
        icon: createElement(BlockIcon, {
          icon: icon
        }),
        labels: {
          title: __('Media area')
        },
        className: className,
        onSelect: onSelectMedia,
        accept: "image/*,video/*",
        allowedTypes: ALLOWED_MEDIA_TYPES
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          mediaPosition = _this$props5.mediaPosition,
          mediaUrl = _this$props5.mediaUrl,
          mediaType = _this$props5.mediaType,
          mediaWidth = _this$props5.mediaWidth,
          commitWidthChange = _this$props5.commitWidthChange,
          onWidthChange = _this$props5.onWidthChange;

      if (mediaType && mediaUrl) {
        var onResize = function onResize(event, direction, elt) {
          onWidthChange(parseInt(elt.style.width));
        };

        var onResizeStop = function onResizeStop(event, direction, elt) {
          commitWidthChange(parseInt(elt.style.width));
        };

        var enablePositions = {
          right: mediaPosition === 'left',
          left: mediaPosition === 'right'
        };
        var mediaElement = null;

        switch (mediaType) {
          case 'image':
            mediaElement = this.renderImage();
            break;

          case 'video':
            mediaElement = this.renderVideo();
            break;
        }

        return createElement(ResizableBox, {
          className: "editor-media-container__resizer",
          size: {
            width: mediaWidth + '%'
          },
          minWidth: "10%",
          maxWidth: "100%",
          enable: enablePositions,
          onResize: onResize,
          onResizeStop: onResizeStop,
          axis: "x"
        }, mediaElement);
      }

      return this.renderPlaceholder();
    }
  }]);

  return MediaContainer;
}(Component);

export default MediaContainer;
//# sourceMappingURL=media-container.js.map