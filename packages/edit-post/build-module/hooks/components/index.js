/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
/**
 * Internal dependencies
 */

import MediaUpload from './media-upload';

var replaceMediaUpload = function replaceMediaUpload() {
  return MediaUpload;
};

addFilter('editor.MediaUpload', 'core/edit-post/components/media-upload/replace-media-upload', replaceMediaUpload);
//# sourceMappingURL=index.js.map