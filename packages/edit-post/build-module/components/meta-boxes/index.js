import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { map } from 'lodash';
/**
 * WordPress dependencies
 */

import { withSelect } from '@wordpress/data';
import { Fragment } from '@wordpress/element';
/**
 * Internal dependencies
 */

import MetaBoxesArea from './meta-boxes-area';
import MetaBoxVisibility from './meta-box-visibility';

function MetaBoxes(_ref) {
  var location = _ref.location,
      isVisible = _ref.isVisible,
      metaBoxes = _ref.metaBoxes;
  return createElement(Fragment, null, map(metaBoxes, function (_ref2) {
    var id = _ref2.id;
    return createElement(MetaBoxVisibility, {
      key: id,
      id: id
    });
  }), isVisible && createElement(MetaBoxesArea, {
    location: location
  }));
}

export default withSelect(function (select, _ref3) {
  var location = _ref3.location;

  var _select = select('core/edit-post'),
      isMetaBoxLocationVisible = _select.isMetaBoxLocationVisible,
      getMetaBoxesPerLocation = _select.getMetaBoxesPerLocation;

  return {
    metaBoxes: getMetaBoxesPerLocation(location),
    isVisible: isMetaBoxLocationVisible(location)
  };
})(MetaBoxes);
//# sourceMappingURL=index.js.map