"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _blob = require("@wordpress/blob");

var _blocks = require("@wordpress/blocks");

var _data = require("@wordpress/data");

var _blockEditor = require("@wordpress/block-editor");

var _edit = _interopRequireDefault(require("./edit"));

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
var name = 'core/file';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('File'),
  description: (0, _i18n.__)('Add a link to a downloadable file.'),
  icon: _icon.default,
  category: 'common',
  keywords: [(0, _i18n.__)('document'), (0, _i18n.__)('pdf')],
  attributes: {
    id: {
      type: 'number'
    },
    href: {
      type: 'string'
    },
    fileName: {
      type: 'string',
      source: 'html',
      selector: 'a:not([download])'
    },
    // Differs to the href when the block is configured to link to the attachment page
    textLinkHref: {
      type: 'string',
      source: 'attribute',
      selector: 'a:not([download])',
      attribute: 'href'
    },
    // e.g. `_blank` when the block is configured to open in a new tab
    textLinkTarget: {
      type: 'string',
      source: 'attribute',
      selector: 'a:not([download])',
      attribute: 'target'
    },
    showDownloadButton: {
      type: 'boolean',
      default: true
    },
    downloadButtonText: {
      type: 'string',
      source: 'html',
      selector: 'a[download]',
      default: (0, _i18n._x)('Download', 'button label')
    }
  },
  supports: {
    align: true
  },
  transforms: {
    from: [{
      type: 'files',
      isMatch: function isMatch(files) {
        return files.length > 0;
      },
      // We define a lower priorty (higher number) than the default of 10. This
      // ensures that the File block is only created as a fallback.
      priority: 15,
      transform: function transform(files) {
        var blocks = [];
        files.forEach(function (file) {
          var blobURL = (0, _blob.createBlobURL)(file); // File will be uploaded in componentDidMount()

          blocks.push((0, _blocks.createBlock)('core/file', {
            href: blobURL,
            fileName: file.name,
            textLinkHref: blobURL
          }));
        });
        return blocks;
      }
    }, {
      type: 'block',
      blocks: ['core/audio'],
      transform: function transform(attributes) {
        return (0, _blocks.createBlock)('core/file', {
          href: attributes.src,
          fileName: attributes.caption,
          textLinkHref: attributes.src,
          id: attributes.id
        });
      }
    }, {
      type: 'block',
      blocks: ['core/video'],
      transform: function transform(attributes) {
        return (0, _blocks.createBlock)('core/file', {
          href: attributes.src,
          fileName: attributes.caption,
          textLinkHref: attributes.src,
          id: attributes.id
        });
      }
    }, {
      type: 'block',
      blocks: ['core/image'],
      transform: function transform(attributes) {
        return (0, _blocks.createBlock)('core/file', {
          href: attributes.url,
          fileName: attributes.caption,
          textLinkHref: attributes.url,
          id: attributes.id
        });
      }
    }],
    to: [{
      type: 'block',
      blocks: ['core/audio'],
      isMatch: function isMatch(_ref) {
        var id = _ref.id;

        if (!id) {
          return false;
        }

        var _select = (0, _data.select)('core'),
            getMedia = _select.getMedia;

        var media = getMedia(id);
        return !!media && (0, _lodash.includes)(media.mime_type, 'audio');
      },
      transform: function transform(attributes) {
        return (0, _blocks.createBlock)('core/audio', {
          src: attributes.href,
          caption: attributes.fileName,
          id: attributes.id
        });
      }
    }, {
      type: 'block',
      blocks: ['core/video'],
      isMatch: function isMatch(_ref2) {
        var id = _ref2.id;

        if (!id) {
          return false;
        }

        var _select2 = (0, _data.select)('core'),
            getMedia = _select2.getMedia;

        var media = getMedia(id);
        return !!media && (0, _lodash.includes)(media.mime_type, 'video');
      },
      transform: function transform(attributes) {
        return (0, _blocks.createBlock)('core/video', {
          src: attributes.href,
          caption: attributes.fileName,
          id: attributes.id
        });
      }
    }, {
      type: 'block',
      blocks: ['core/image'],
      isMatch: function isMatch(_ref3) {
        var id = _ref3.id;

        if (!id) {
          return false;
        }

        var _select3 = (0, _data.select)('core'),
            getMedia = _select3.getMedia;

        var media = getMedia(id);
        return !!media && (0, _lodash.includes)(media.mime_type, 'image');
      },
      transform: function transform(attributes) {
        return (0, _blocks.createBlock)('core/image', {
          url: attributes.href,
          caption: attributes.fileName,
          id: attributes.id
        });
      }
    }]
  },
  edit: _edit.default,
  save: function save(_ref4) {
    var attributes = _ref4.attributes;
    var href = attributes.href,
        fileName = attributes.fileName,
        textLinkHref = attributes.textLinkHref,
        textLinkTarget = attributes.textLinkTarget,
        showDownloadButton = attributes.showDownloadButton,
        downloadButtonText = attributes.downloadButtonText;
    return href && (0, _element.createElement)("div", null, !_blockEditor.RichText.isEmpty(fileName) && (0, _element.createElement)("a", {
      href: textLinkHref,
      target: textLinkTarget,
      rel: textLinkTarget ? 'noreferrer noopener' : false
    }, (0, _element.createElement)(_blockEditor.RichText.Content, {
      value: fileName
    })), showDownloadButton && (0, _element.createElement)("a", {
      href: href,
      className: "wp-block-file__button",
      download: true
    }, (0, _element.createElement)(_blockEditor.RichText.Content, {
      value: downloadButtonText
    })));
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map