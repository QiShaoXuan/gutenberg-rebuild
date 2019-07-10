"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClassNames = getClassNames;
exports.fallback = fallback;
exports.createUpgradedEmbedBlock = exports.getPhotoHtml = exports.isFromWordPress = exports.findBlock = exports.matchesPatterns = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _coreEmbeds = require("./core-embeds");

var _constants = require("./constants");

var _lodash = require("lodash");

var _dedupe = _interopRequireDefault(require("classnames/dedupe"));

var _blocks = require("@wordpress/blocks");

/**
 * Internal dependencies
 */

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Returns true if any of the regular expressions match the URL.
 *
 * @param {string}   url      The URL to test.
 * @param {Array}    patterns The list of regular expressions to test agains.
 * @return {boolean} True if any of the regular expressions match the URL.
 */
var matchesPatterns = function matchesPatterns(url) {
  var patterns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return patterns.some(function (pattern) {
    return url.match(pattern);
  });
};
/**
 * Finds the block name that should be used for the URL, based on the
 * structure of the URL.
 *
 * @param {string}  url The URL to test.
 * @return {string} The name of the block that should be used for this URL, e.g. core-embed/twitter
 */


exports.matchesPatterns = matchesPatterns;

var findBlock = function findBlock(url) {
  var _arr = [].concat((0, _toConsumableArray2.default)(_coreEmbeds.common), (0, _toConsumableArray2.default)(_coreEmbeds.others));

  for (var _i = 0; _i < _arr.length; _i++) {
    var block = _arr[_i];

    if (matchesPatterns(url, block.patterns)) {
      return block.name;
    }
  }

  return _constants.DEFAULT_EMBED_BLOCK;
};

exports.findBlock = findBlock;

var isFromWordPress = function isFromWordPress(html) {
  return (0, _lodash.includes)(html, 'class="wp-embedded-content"');
};

exports.isFromWordPress = isFromWordPress;

var getPhotoHtml = function getPhotoHtml(photo) {
  // 100% width for the preview so it fits nicely into the document, some "thumbnails" are
  // actually the full size photo. If thumbnails not found, use full image.
  var imageUrl = photo.thumbnail_url ? photo.thumbnail_url : photo.url;
  var photoPreview = (0, _element.createElement)("p", null, (0, _element.createElement)("img", {
    src: imageUrl,
    alt: photo.title,
    width: "100%"
  }));
  return (0, _element.renderToString)(photoPreview);
};
/***
 * Creates a more suitable embed block based on the passed in props
 * and attributes generated from an embed block's preview.
 *
 * We require `attributesFromPreview` to be generated from the latest attributes
 * and preview, and because of the way the react lifecycle operates, we can't
 * guarantee that the attributes contained in the block's props are the latest
 * versions, so we require that these are generated separately.
 * See `getAttributesFromPreview` in the generated embed edit component.
 *
 * @param {Object}            props                 The block's props.
 * @param {Object}            attributesFromPreview Attributes generated from the block's most up to date preview.
 * @return {Object|undefined} A more suitable embed block if one exists.
 */


exports.getPhotoHtml = getPhotoHtml;

var createUpgradedEmbedBlock = function createUpgradedEmbedBlock(props, attributesFromPreview) {
  var preview = props.preview,
      name = props.name;
  var url = props.attributes.url;

  if (!url) {
    return;
  }

  var matchingBlock = findBlock(url); // WordPress blocks can work on multiple sites, and so don't have patterns,
  // so if we're in a WordPress block, assume the user has chosen it for a WordPress URL.

  if (_constants.WORDPRESS_EMBED_BLOCK !== name && _constants.DEFAULT_EMBED_BLOCK !== matchingBlock) {
    // At this point, we have discovered a more suitable block for this url, so transform it.
    if (name !== matchingBlock) {
      return (0, _blocks.createBlock)(matchingBlock, {
        url: url
      });
    }
  }

  if (preview) {
    var html = preview.html; // We can't match the URL for WordPress embeds, we have to check the HTML instead.

    if (isFromWordPress(html)) {
      // If this is not the WordPress embed block, transform it into one.
      if (_constants.WORDPRESS_EMBED_BLOCK !== name) {
        return (0, _blocks.createBlock)(_constants.WORDPRESS_EMBED_BLOCK, (0, _objectSpread2.default)({
          url: url
        }, attributesFromPreview));
      }
    }
  }
};
/**
 * Returns class names with any relevant responsive aspect ratio names.
 *
 * @param {string}  html               The preview HTML that possibly contains an iframe with width and height set.
 * @param {string}  existingClassNames Any existing class names.
 * @param {boolean} allowResponsive    If the responsive class names should be added, or removed.
 * @return {string} Deduped class names.
 */


exports.createUpgradedEmbedBlock = createUpgradedEmbedBlock;

function getClassNames(html) {
  var existingClassNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var allowResponsive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (!allowResponsive) {
    // Remove all of the aspect ratio related class names.
    var aspectRatioClassNames = {
      'wp-has-aspect-ratio': false
    };

    for (var ratioIndex = 0; ratioIndex < _constants.ASPECT_RATIOS.length; ratioIndex++) {
      var aspectRatioToRemove = _constants.ASPECT_RATIOS[ratioIndex];
      aspectRatioClassNames[aspectRatioToRemove.className] = false;
    }

    return (0, _dedupe.default)(existingClassNames, aspectRatioClassNames);
  }

  var previewDocument = document.implementation.createHTMLDocument('');
  previewDocument.body.innerHTML = html;
  var iframe = previewDocument.body.querySelector('iframe'); // If we have a fixed aspect iframe, and it's a responsive embed block.

  if (iframe && iframe.height && iframe.width) {
    var aspectRatio = (iframe.width / iframe.height).toFixed(2); // Given the actual aspect ratio, find the widest ratio to support it.

    for (var _ratioIndex = 0; _ratioIndex < _constants.ASPECT_RATIOS.length; _ratioIndex++) {
      var potentialRatio = _constants.ASPECT_RATIOS[_ratioIndex];

      if (aspectRatio >= potentialRatio.ratio) {
        var _classnames;

        return (0, _dedupe.default)(existingClassNames, (_classnames = {}, (0, _defineProperty2.default)(_classnames, potentialRatio.className, allowResponsive), (0, _defineProperty2.default)(_classnames, 'wp-has-aspect-ratio', allowResponsive), _classnames));
      }
    }
  }

  return existingClassNames;
}
/**
 * Fallback behaviour for unembeddable URLs.
 * Creates a paragraph block containing a link to the URL, and calls `onReplace`.
 *
 * @param {string}   url       The URL that could not be embedded.
 * @param {function} onReplace Function to call with the created fallback block.
 */


function fallback(url, onReplace) {
  var link = (0, _element.createElement)("a", {
    href: url
  }, url);
  onReplace((0, _blocks.createBlock)('core/paragraph', {
    content: (0, _element.renderToString)(link)
  }));
}
//# sourceMappingURL=util.js.map