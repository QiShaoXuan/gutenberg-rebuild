"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = require("lodash");

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var _window = window,
    wp = _window.wp; // Getter for the sake of unit tests.

var getGalleryDetailsMediaFrame = function getGalleryDetailsMediaFrame() {
  /**
   * Custom gallery details frame.
   *
   * @link https://github.com/xwp/wp-core-media-widgets/blob/905edbccfc2a623b73a93dac803c5335519d7837/wp-admin/js/widgets/media-gallery-widget.js
   * @class GalleryDetailsMediaFrame
   * @constructor
   */
  return wp.media.view.MediaFrame.Post.extend({
    /**
     * Create the default states.
     *
     * @return {void}
     */
    createStates: function createStates() {
      this.states.add([new wp.media.controller.Library({
        id: 'gallery',
        title: wp.media.view.l10n.createGalleryTitle,
        priority: 40,
        toolbar: 'main-gallery',
        filterable: 'uploaded',
        multiple: 'add',
        editable: false,
        library: wp.media.query((0, _lodash.defaults)({
          type: 'image'
        }, this.options.library))
      }), new wp.media.controller.GalleryEdit({
        library: this.options.selection,
        editing: this.options.editing,
        menu: 'gallery',
        displaySettings: false,
        multiple: true
      }), new wp.media.controller.GalleryAdd()]);
    }
  });
}; // the media library image object contains numerous attributes
// we only need this set to display the image in the library


var slimImageObject = function slimImageObject(img) {
  var attrSet = ['sizes', 'mime', 'type', 'subtype', 'id', 'url', 'alt', 'link', 'caption'];
  return (0, _lodash.pick)(img, attrSet);
};

var getAttachmentsCollection = function getAttachmentsCollection(ids) {
  return wp.media.query({
    order: 'ASC',
    orderby: 'post__in',
    post__in: ids,
    posts_per_page: -1,
    query: true,
    type: 'image'
  });
};

var MediaUpload =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(MediaUpload, _Component);

  function MediaUpload(_ref) {
    var _this;

    var allowedTypes = _ref.allowedTypes,
        _ref$gallery = _ref.gallery,
        gallery = _ref$gallery === void 0 ? false : _ref$gallery,
        modalClass = _ref.modalClass,
        _ref$multiple = _ref.multiple,
        multiple = _ref$multiple === void 0 ? false : _ref$multiple,
        _ref$title = _ref.title,
        title = _ref$title === void 0 ? (0, _i18n.__)('Select or Upload Media') : _ref$title;
    (0, _classCallCheck2.default)(this, MediaUpload);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MediaUpload).apply(this, arguments));
    _this.openModal = _this.openModal.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onOpen = _this.onOpen.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onSelect = _this.onSelect.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onUpdate = _this.onUpdate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onClose = _this.onClose.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));

    if (gallery) {
      _this.buildAndSetGalleryFrame();
    } else {
      var frameConfig = {
        title: title,
        button: {
          text: (0, _i18n.__)('Select')
        },
        multiple: multiple
      };

      if (!!allowedTypes) {
        frameConfig.library = {
          type: allowedTypes
        };
      }

      _this.frame = wp.media(frameConfig);
    }

    if (modalClass) {
      _this.frame.$el.addClass(modalClass);
    }

    _this.initializeListeners();

    return _this;
  }

  (0, _createClass2.default)(MediaUpload, [{
    key: "initializeListeners",
    value: function initializeListeners() {
      // When an image is selected in the media frame...
      this.frame.on('select', this.onSelect);
      this.frame.on('update', this.onUpdate);
      this.frame.on('open', this.onOpen);
      this.frame.on('close', this.onClose);
    }
  }, {
    key: "buildAndSetGalleryFrame",
    value: function buildAndSetGalleryFrame() {
      var _this$props = this.props,
          _this$props$addToGall = _this$props.addToGallery,
          addToGallery = _this$props$addToGall === void 0 ? false : _this$props$addToGall,
          allowedTypes = _this$props.allowedTypes,
          _this$props$multiple = _this$props.multiple,
          multiple = _this$props$multiple === void 0 ? false : _this$props$multiple,
          _this$props$value = _this$props.value,
          value = _this$props$value === void 0 ? null : _this$props$value; // If the value did not changed there is no need to rebuild the frame,
      // we can continue to use the existing one.

      if (value === this.lastGalleryValue) {
        return;
      }

      this.lastGalleryValue = value; // If a frame already existed remove it.

      if (this.frame) {
        this.frame.remove();
      }

      var currentState;

      if (addToGallery) {
        currentState = 'gallery-library';
      } else {
        currentState = value ? 'gallery-edit' : 'gallery';
      }

      if (!this.GalleryDetailsMediaFrame) {
        this.GalleryDetailsMediaFrame = getGalleryDetailsMediaFrame();
      }

      var attachments = getAttachmentsCollection(value);
      var selection = new wp.media.model.Selection(attachments.models, {
        props: attachments.props.toJSON(),
        multiple: multiple
      });
      this.frame = new this.GalleryDetailsMediaFrame({
        mimeType: allowedTypes,
        state: currentState,
        multiple: multiple,
        selection: selection,
        editing: value ? true : false
      });
      wp.media.frame = this.frame;
      this.initializeListeners();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.frame.remove();
    }
  }, {
    key: "onUpdate",
    value: function onUpdate(selections) {
      var _this$props2 = this.props,
          onSelect = _this$props2.onSelect,
          _this$props2$multiple = _this$props2.multiple,
          multiple = _this$props2$multiple === void 0 ? false : _this$props2$multiple;
      var state = this.frame.state();
      var selectedImages = selections || state.get('selection');

      if (!selectedImages || !selectedImages.models.length) {
        return;
      }

      if (multiple) {
        onSelect(selectedImages.models.map(function (model) {
          return slimImageObject(model.toJSON());
        }));
      } else {
        onSelect(slimImageObject(selectedImages.models[0].toJSON()));
      }
    }
  }, {
    key: "onSelect",
    value: function onSelect() {
      var _this$props3 = this.props,
          onSelect = _this$props3.onSelect,
          _this$props3$multiple = _this$props3.multiple,
          multiple = _this$props3$multiple === void 0 ? false : _this$props3$multiple; // Get media attachment details from the frame state

      var attachment = this.frame.state().get('selection').toJSON();
      onSelect(multiple ? attachment : attachment[0]);
    }
  }, {
    key: "onOpen",
    value: function onOpen() {
      this.updateCollection();

      if (!this.props.value) {
        return;
      }

      if (!this.props.gallery) {
        var selection = this.frame.state().get('selection');
        (0, _lodash.castArray)(this.props.value).forEach(function (id) {
          selection.add(wp.media.attachment(id));
        });
      } // load the images so they are available in the media modal.


      getAttachmentsCollection((0, _lodash.castArray)(this.props.value)).more();
    }
  }, {
    key: "onClose",
    value: function onClose() {
      var onClose = this.props.onClose;

      if (onClose) {
        onClose();
      }
    }
  }, {
    key: "updateCollection",
    value: function updateCollection() {
      var frameContent = this.frame.content.get();

      if (frameContent && frameContent.collection) {
        var collection = frameContent.collection; // clean all attachments we have in memory.

        collection.toArray().forEach(function (model) {
          return model.trigger('destroy', model);
        }); // reset has more flag, if library had small amount of items all items may have been loaded before.

        collection.mirroring._hasMore = true; // request items

        collection.more();
      }
    }
  }, {
    key: "openModal",
    value: function openModal() {
      if (this.props.gallery && this.props.value && this.props.value.length > 0) {
        this.buildAndSetGalleryFrame();
      }

      this.frame.open();
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.render({
        open: this.openModal
      });
    }
  }]);
  return MediaUpload;
}(_element.Component);

var _default = MediaUpload;
exports.default = _default;
//# sourceMappingURL=index.js.map