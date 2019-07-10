"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultColumnsNumber = defaultColumnsNumber;
exports.default = exports.pickRelevantMediaFiles = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _blockEditor = require("@wordpress/block-editor");

var _i18n = require("@wordpress/i18n");

var _galleryImage = _interopRequireDefault(require("./gallery-image"));

var _icon = _interopRequireDefault(require("./icon"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var MAX_COLUMNS = 8;
var linkOptions = [{
  value: 'attachment',
  label: (0, _i18n.__)('Attachment Page')
}, {
  value: 'media',
  label: (0, _i18n.__)('Media File')
}, {
  value: 'none',
  label: (0, _i18n.__)('None')
}];
var ALLOWED_MEDIA_TYPES = ['image'];

function defaultColumnsNumber(attributes) {
  return Math.min(3, attributes.images.length);
}

var pickRelevantMediaFiles = function pickRelevantMediaFiles(image) {
  var imageProps = (0, _lodash.pick)(image, ['alt', 'id', 'link', 'caption']);
  imageProps.url = (0, _lodash.get)(image, ['sizes', 'large', 'url']) || (0, _lodash.get)(image, ['media_details', 'sizes', 'large', 'source_url']) || image.url;
  return imageProps;
};

exports.pickRelevantMediaFiles = pickRelevantMediaFiles;

var GalleryEdit =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(GalleryEdit, _Component);

  function GalleryEdit() {
    var _this;

    (0, _classCallCheck2.default)(this, GalleryEdit);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(GalleryEdit).apply(this, arguments));
    _this.onSelectImage = _this.onSelectImage.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onSelectImages = _this.onSelectImages.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.setLinkTo = _this.setLinkTo.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.setColumnsNumber = _this.setColumnsNumber.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.toggleImageCrop = _this.toggleImageCrop.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onRemoveImage = _this.onRemoveImage.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.setImageAttributes = _this.setImageAttributes.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.setAttributes = _this.setAttributes.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      selectedImage: null
    };
    return _this;
  }

  (0, _createClass2.default)(GalleryEdit, [{
    key: "setAttributes",
    value: function setAttributes(attributes) {
      if (attributes.ids) {
        throw new Error('The "ids" attribute should not be changed directly. It is managed automatically when "images" attribute changes');
      }

      if (attributes.images) {
        attributes = (0, _objectSpread2.default)({}, attributes, {
          ids: (0, _lodash.map)(attributes.images, 'id')
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
        var images = (0, _lodash.filter)(_this3.props.attributes.images, function (img, i) {
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
      return checked ? (0, _i18n.__)('Thumbnails are cropped to align.') : (0, _i18n.__)('Thumbnails are not cropped.');
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
        images: [].concat((0, _toConsumableArray2.default)(images.slice(0, index)), [(0, _objectSpread2.default)({}, images[index], attributes)], (0, _toConsumableArray2.default)(images.slice(index + 1)))
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
      var controls = (0, _element.createElement)(_blockEditor.BlockControls, null, hasImages && (0, _element.createElement)(_components.Toolbar, null, (0, _element.createElement)(_blockEditor.MediaUpload, {
        onSelect: this.onSelectImages,
        allowedTypes: ALLOWED_MEDIA_TYPES,
        multiple: true,
        gallery: true,
        value: images.map(function (img) {
          return img.id;
        }),
        render: function render(_ref) {
          var open = _ref.open;
          return (0, _element.createElement)(_components.IconButton, {
            className: "components-toolbar__control",
            label: (0, _i18n.__)('Edit gallery'),
            icon: "edit",
            onClick: open
          });
        }
      })));
      var mediaPlaceholder = (0, _element.createElement)(_blockEditor.MediaPlaceholder, {
        addToGallery: hasImages,
        isAppender: hasImages,
        className: className,
        dropZoneUIOnly: hasImages && !isSelected,
        icon: !hasImages && (0, _element.createElement)(_blockEditor.BlockIcon, {
          icon: _icon.default
        }),
        labels: {
          title: !hasImages && (0, _i18n.__)('Gallery'),
          instructions: !hasImages && (0, _i18n.__)('Drag images, upload new ones or select files from your library.')
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
        return (0, _element.createElement)(_element.Fragment, null, controls, mediaPlaceholder);
      }

      return (0, _element.createElement)(_element.Fragment, null, controls, (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
        title: (0, _i18n.__)('Gallery Settings')
      }, images.length > 1 && (0, _element.createElement)(_components.RangeControl, {
        label: (0, _i18n.__)('Columns'),
        value: columns,
        onChange: this.setColumnsNumber,
        min: 1,
        max: Math.min(MAX_COLUMNS, images.length),
        required: true
      }), (0, _element.createElement)(_components.ToggleControl, {
        label: (0, _i18n.__)('Crop Images'),
        checked: !!imageCrop,
        onChange: this.toggleImageCrop,
        help: this.getImageCropHelp
      }), (0, _element.createElement)(_components.SelectControl, {
        label: (0, _i18n.__)('Link To'),
        value: linkTo,
        onChange: this.setLinkTo,
        options: linkOptions
      }))), noticeUI, (0, _element.createElement)("ul", {
        className: (0, _classnames2.default)(className, (_classnames = {}, (0, _defineProperty2.default)(_classnames, "align".concat(align), align), (0, _defineProperty2.default)(_classnames, "columns-".concat(columns), columns), (0, _defineProperty2.default)(_classnames, 'is-cropped', imageCrop), _classnames))
      }, images.map(function (img, index) {
        /* translators: %1$d is the order number of the image, %2$d is the total number of images. */
        var ariaLabel = (0, _i18n.sprintf)((0, _i18n.__)('image %1$d of %2$d in gallery'), index + 1, images.length);
        return (0, _element.createElement)("li", {
          className: "blocks-gallery-item",
          key: img.id || img.url
        }, (0, _element.createElement)(_galleryImage.default, {
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
}(_element.Component);

var _default = (0, _components.withNotices)(GalleryEdit);

exports.default = _default;
//# sourceMappingURL=edit.js.map