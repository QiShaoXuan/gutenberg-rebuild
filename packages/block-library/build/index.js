"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerCoreBlocks = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

require("@wordpress/core-data");

require("@wordpress/block-editor");

require("@wordpress/editor");

var _blocks = require("@wordpress/blocks");

var paragraph = _interopRequireWildcard(require("./paragraph"));

var image = _interopRequireWildcard(require("./image"));

var heading = _interopRequireWildcard(require("./heading"));

var quote = _interopRequireWildcard(require("./quote"));

var gallery = _interopRequireWildcard(require("./gallery"));

var archives = _interopRequireWildcard(require("./archives"));

var audio = _interopRequireWildcard(require("./audio"));

var button = _interopRequireWildcard(require("./button"));

var calendar = _interopRequireWildcard(require("./calendar"));

var categories = _interopRequireWildcard(require("./categories"));

var code = _interopRequireWildcard(require("./code"));

var columns = _interopRequireWildcard(require("./columns"));

var column = _interopRequireWildcard(require("./columns/column"));

var cover = _interopRequireWildcard(require("./cover"));

var embed = _interopRequireWildcard(require("./embed"));

var file = _interopRequireWildcard(require("./file"));

var html = _interopRequireWildcard(require("./html"));

var mediaText = _interopRequireWildcard(require("./media-text"));

var latestComments = _interopRequireWildcard(require("./latest-comments"));

var latestPosts = _interopRequireWildcard(require("./latest-posts"));

var legacyWidget = _interopRequireWildcard(require("./legacy-widget"));

var list = _interopRequireWildcard(require("./list"));

var missing = _interopRequireWildcard(require("./missing"));

var more = _interopRequireWildcard(require("./more"));

var nextpage = _interopRequireWildcard(require("./nextpage"));

var preformatted = _interopRequireWildcard(require("./preformatted"));

var pullquote = _interopRequireWildcard(require("./pullquote"));

var reusableBlock = _interopRequireWildcard(require("./block"));

var rss = _interopRequireWildcard(require("./rss"));

var search = _interopRequireWildcard(require("./search"));

var section = _interopRequireWildcard(require("./section"));

var separator = _interopRequireWildcard(require("./separator"));

var shortcode = _interopRequireWildcard(require("./shortcode"));

var spacer = _interopRequireWildcard(require("./spacer"));

var subhead = _interopRequireWildcard(require("./subhead"));

var table = _interopRequireWildcard(require("./table"));

var template = _interopRequireWildcard(require("./template"));

var textColumns = _interopRequireWildcard(require("./text-columns"));

var verse = _interopRequireWildcard(require("./verse"));

var video = _interopRequireWildcard(require("./video"));

var tagCloud = _interopRequireWildcard(require("./tag-cloud"));

var classic = _interopRequireWildcard(require("./classic"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Function to register core blocks provided by the block editor.
 *
 * @example
 * ```js
 * import { registerCoreBlocks } from '@wordpress/block-library';
 *
 * registerCoreBlocks();
 * ```
 */
var registerCoreBlocks = function registerCoreBlocks() {
  [// Common blocks are grouped at the top to prioritize their display
  // in various contexts — like the inserter and auto-complete components.
  paragraph, image, heading, gallery, list, quote, // Register all remaining core blocks.
  shortcode, archives, audio, button, calendar, categories, code, columns, column, cover, embed].concat((0, _toConsumableArray2.default)(embed.common), (0, _toConsumableArray2.default)(embed.others), [file, window.wp && window.wp.oldEditor ? classic : null, // Only add the classic block in WP Context
  html, mediaText, latestComments, latestPosts, process.env.GUTENBERG_PHASE === 2 ? legacyWidget : null, missing, more, nextpage, preformatted, pullquote, rss, search, section, separator, reusableBlock, spacer, subhead, table, tagCloud, template, textColumns, verse, video]).forEach(function (block) {
    if (!block) {
      return;
    }

    var metadata = block.metadata,
        settings = block.settings,
        name = block.name;

    if (metadata) {
      (0, _blocks.unstable__bootstrapServerSideBlockDefinitions)((0, _defineProperty2.default)({}, name, metadata)); // eslint-disable-line camelcase
    }

    (0, _blocks.registerBlockType)(name, settings);
  });
  (0, _blocks.setDefaultBlockName)(paragraph.name);

  if (window.wp && window.wp.oldEditor) {
    (0, _blocks.setFreeformContentHandlerName)(classic.name);
  }

  (0, _blocks.setUnregisteredTypeHandlerName)(missing.name);
};

exports.registerCoreBlocks = registerCoreBlocks;
//# sourceMappingURL=index.js.map