import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";

/**
 * WordPress dependencies
 */
import { registerFormatType } from '@wordpress/rich-text';
/**
 * Internal dependencies
 */

import { annotation } from './annotation';

var name = annotation.name,
    settings = _objectWithoutProperties(annotation, ["name"]);

registerFormatType(name, settings);
//# sourceMappingURL=index.js.map