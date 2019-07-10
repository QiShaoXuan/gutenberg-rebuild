import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
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
import classnames from 'classnames';
import { filter, pick, map, get } from 'lodash';
/**
 * WordPress dependencies
 */

import { IconButton, PanelBody, RangeControl, SelectControl, ToggleControl, Toolbar, withNotices } from '@wordpress/components';
import { BlockControls, BlockIcon, MediaPlaceholder, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { Component, Fragment } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import GalleryImage from './gallery-image';
import icon from './icon';
var MAX_COLUMNS = 8;
var linkOptions = [{
  value: 'attachment',
  label: __('Attachment Page')
}, {
  value: 'media',
  label: __('Media File')
}, {
  value: 'none',
  label: __('None')
}];
var ALLOWED_MEDIA_TYPES = ['image'];
export function defaultColumnsNumber(attributes) {
  return Math.min(3, attributes.images.length);
}
export var pickRelevantMediaFiles = function pickRelevantMediaFiles(image) {
  var imageProps = pick(image, ['alt', 'id', 'link', 'caption']);
  imageProps.url = get(image, ['sizes', 'large', 'url']) || get(image, ['media_details', 'sizes', 'large', 'source_url']) || image.url;
  return imageProps;
};

var GalleryEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(GalleryEdit, _Component);

  function GalleryEdit() {
    var _this;

    _classCallCheck(this, GalleryEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GalleryEdit).apply(this, arguments));
    _this.onSelectImage = _this.onSelectImage.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onSelectImages = _this.onSelectImages.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setLinkTo = _this.setLinkTo.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setColumnsNumber = _this.setColumnsNumber.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.toggleImageCrop = _this.toggleImageCrop.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onRemoveImage = _this.onRemoveImage.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setImageAttributes = _this.setImageAttributes.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setAttributes = _this.setAttributes.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      selectedImage: null
    };
    return _this;
  }

  _createClass(GalleryEdit, [{
    key: "setAttributes",
    value: function setAttributes(attributes) {
      if (attributes.ids) {
        throw new Error('The "ids" attribute should not be changed directly. It is managed automatically when "images" attribute changes');
      }

      if (attributes.images) {
        attributes = _objectSpread({}, attributes, {
          ids: map(attributes.images, 'id')
        });
      }

      this.props.setAttributes(attributes);
    }
  }, {
    key: "onSelectImage",
    value: function onSelectImage(index) {
      var _this2 = this;

      return function () {
        if (_this2.state.selectedImage !== index) {
          _this2.setState({
            selectedImage: index
          });
        }
      };
    }
  }, {
    key: "onRemoveImage",
    value: function onRemoveImage(index) {
      var _this3 = this;

      return function () {
        var images = filter(_this3.props.attributes.images, function (img, i) {
          return index !== i;
        });
        var columns = _this3.props.attributes.columns;

        _this3.setState({
          selectedImage: null
        });

        _this3.setAttributes({
          images: images,
          columns: columns ? Math.min(images.length, columns) : columns
        });
      };
    }
  }, {
    key: "onSelectImages",
    value: function onSelectImages(images) {
      var columns = this.props.attributes.columns;
      this.setAttributes({
        images: images.map(function (image) {
          return pickRelevantMediaFiles(image);
        }),
        columns: columns ? Math.min(images.length, columns) : columns
      });
    }
  }, {
    key: "setLinkTo",
    value: function setLinkTo(value) {
      this.setAttributes({
        linkTo: value
      });
    }
  }, {
    key: "setColumnsNumber",
    value: function setColumnsNumber(value) {
      this.setAttributes({
        columns: value
      });
    }
  }, {
    key: "toggleImageCrop",
    value: function toggleImageCrop() {
      this.setAttributes({
        imageCrop: !this.props.attributes.imageCrop
      });
    }
  }, {
    key: "getImageCropHelp",
    value: function getImageCropHelp(checked) {
      return checked ? __('Thumbnails are cropped to align.') : __('Thumbnails are not cropped.');
    }
  }, {
    key: "setImageAttributes",
    value: function setImageAttributes(index, attributes) {
      var images = this.props.attributes.images;
      var setAttributes = this.setAttributes;

      if (!images[index]) {
        return;
      }

      setAttributes({
        images: [].concat(_toConsumableArray(images.slice(0, index)), [_objectSpread({}, images[index], attributes)], _toConsumableArray(images.slice(index + 1)))
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // Deselect images when deselecting the block
      if (!this.props.isSelected && prevProps.isSelected) {
        this.setState({
          selectedImage: null,
          captionSelected: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames,
          _this4 = this;

      var _this$props = this.props,
          attributes = _this$props.attributes,
          isSelected = _this$props.isSelected,
          className = _this$props.className,
          noticeOperations = _this$props.noticeOperations,
          noticeUI = _this$props.noticeUI;
      var images = attributes.images,
          _attributes$columns = attributes.columns,
          columns = _attributes$columns === void 0 ? defaultColumnsNumber(attributes) : _attributes$columns,
          align = attributes.align,
          imageCrop = attributes.imageCrop,
          linkTo = attributes.linkTo;
      var hasImages = !!images.length;
      var controls = createElement(BlockControls, null, hasImages && createElement(Toolbar, null, createElement(MediaUpload, {
        onSelect: this.onSelectImages,
        allowedTypes: ALLOWED_MEDIA_TYPES,
        multiple: true,
        gallery: true,
        value: images.map(function (img) {
          return img.id;
        }),
        render: function render(_ref) {
          var open = _ref.open;
          return createElement(IconButton, {
            className: "components-toolbar__control",
            label: __('Edit gallery'),
            icon: "edit",
            onClick: open
          });
        }
      })));
      var mediaPlaceholder = createElement(MediaPlaceholder, {
        addToGallery: hasImages,
        isAppender: hasImages,
        className: className,
        dropZoneUIOnly: hasImages && !isSelected,
        icon: !hasImages && createElement(BlockIcon, {
          icon: icon
        }),
        labels: {
          title: !hasImages && __('Gallery'),
          instructions: !hasImages && __('Drag images, upload new ones or select files from your library.')
        },
        onSelect: this.onSelectImages,
        accept: "image/*",
        allowedTypes: ALLOWED_MEDIA_TYPES,
        multiple: true,
        value: hasImages ? images : undefined,
        onError: noticeOperations.createErrorNotice,
        notices: hasImages ? undefined : noticeUI
      });

      if (!hasImages) {
        return createElement(Fragment, null, controls, mediaPlaceholder);
      }

      return createElement(Fragment, null, controls, createElement(InspectorControls, null, createElement(PanelBody, {
        title: __('Gallery Settings')
      }, images.length > 1 && createElement(RangeControl, {
        label: __('Columns'),
        value: columns,
        onChange: this.setColumnsNumber,
        min: 1,
        max: Math.min(MAX_COLUMNS, images.length),
        required: true
      }), createElement(ToggleControl, {
        label: __('Crop Images'),
        checked: !!imageCrop,
        onChange: this.toggleImageCrop,
        help: this.getImageCropHelp
      }), createElement(SelectControl, {
        label: __('Link To'),
        value: linkTo,
        onChange: this.setLinkTo,
        options: linkOptions
      }))), noticeUI, createElement("ul", {
        className: classnames(className, (_classnames = {}, _defineProperty(_classnames, "align".concat(align), align), _defineProperty(_classnames, "columns-".concat(columns), columns), _defineProperty(_classnames, 'is-cropped', imageCrop), _classnames))
      }, images.map(function (img, index) {
        /* translators: %1$d is the order number of the image, %2$d is the total number of images. */
        var ariaLabel = sprintf(__('image %1$d of %2$d in gallery'), index + 1, images.length);
        return createElement("li", {
          className: "blocks-gallery-item",
          key: img.id || img.url
        }, createElement(GalleryImage, {
          url: img.url,
          alt: img.alt,
          id: img.id,
          isSelected: isSelected && _this4.state.selectedImage === index,
          onRemove: _this4.onRemoveImage(index),
          onSelect: _this4.onSelectImage(index),
          setAttributes: function setAttributes(attrs) {
            return _this4.setImageAttributes(index, attrs);
          },
          caption: img.caption,
          "aria-label": ariaLabel
        }));
      })), mediaPlaceholder);
    }
  }]);

  return GalleryEdit;
}(Component);

export default withNotices(GalleryEdit);
//# sourceMappingURL=edit.js.map