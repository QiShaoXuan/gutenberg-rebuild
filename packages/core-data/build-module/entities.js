import _regeneratorRuntime from "@babel/runtime/regenerator";

var _marked =
/*#__PURE__*/
_regeneratorRuntime.mark(loadPostTypeEntities),
    _marked2 =
/*#__PURE__*/
_regeneratorRuntime.mark(loadTaxonomyEntities),
    _marked3 =
/*#__PURE__*/
_regeneratorRuntime.mark(getKindEntities);

/**
 * External dependencies
 */
import { upperFirst, camelCase, map, find } from 'lodash';
/**
 * Internal dependencies
 */

import { addEntities } from './actions';
import { apiFetch, select } from './controls';
export var DEFAULT_ENTITY_KEY = 'id';
export var defaultEntities = [{
  name: 'postType',
  kind: 'root',
  key: 'slug',
  baseURL: '/wp/v2/types'
}, {
  name: 'media',
  kind: 'root',
  baseURL: '/wp/v2/media',
  plural: 'mediaItems'
}, {
  name: 'taxonomy',
  kind: 'root',
  key: 'slug',
  baseURL: '/wp/v2/taxonomies',
  plural: 'taxonomies'
}];
export var kinds = [{
  name: 'postType',
  loadEntities: loadPostTypeEntities
}, {
  name: 'taxonomy',
  loadEntities: loadTaxonomyEntities
}];
/**
 * Returns the list of post type entities.
 *
 * @return {Promise} Entities promise
 */

function loadPostTypeEntities() {
  var postTypes;
  return _regeneratorRuntime.wrap(function loadPostTypeEntities$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return apiFetch({
            path: '/wp/v2/types?context=edit'
          });

        case 2:
          postTypes = _context.sent;
          return _context.abrupt("return", map(postTypes, function (postType, name) {
            return {
              kind: 'postType',
              baseURL: '/wp/v2/' + postType.rest_base,
              name: name
            };
          }));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}
/**
 * Returns the list of the taxonomies entities.
 *
 * @return {Promise} Entities promise
 */


function loadTaxonomyEntities() {
  var taxonomies;
  return _regeneratorRuntime.wrap(function loadTaxonomyEntities$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return apiFetch({
            path: '/wp/v2/taxonomies?context=edit'
          });

        case 2:
          taxonomies = _context2.sent;
          return _context2.abrupt("return", map(taxonomies, function (taxonomy, name) {
            return {
              kind: 'taxonomy',
              baseURL: '/wp/v2/' + taxonomy.rest_base,
              name: name
            };
          }));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}
/**
 * Returns the entity's getter method name given its kind and name.
 *
 * @param {string}  kind      Entity kind.
 * @param {string}  name      Entity name.
 * @param {string}  prefix    Function prefix.
 * @param {boolean} usePlural Whether to use the plural form or not.
 *
 * @return {string} Method name
 */


export var getMethodName = function getMethodName(kind, name) {
  var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'get';
  var usePlural = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var entity = find(defaultEntities, {
    kind: kind,
    name: name
  });
  var kindPrefix = kind === 'root' ? '' : upperFirst(camelCase(kind));
  var nameSuffix = upperFirst(camelCase(name)) + (usePlural ? 's' : '');
  var suffix = usePlural && entity.plural ? upperFirst(camelCase(entity.plural)) : nameSuffix;
  return "".concat(prefix).concat(kindPrefix).concat(suffix);
};
/**
 * Loads the kind entities into the store.
 *
 * @param {string} kind  Kind
 *
 * @return {Array} Entities
 */

export function getKindEntities(kind) {
  var entities, kindConfig;
  return _regeneratorRuntime.wrap(function getKindEntities$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return select('getEntitiesByKind', kind);

        case 2:
          entities = _context3.sent;

          if (!(entities && entities.length !== 0)) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", entities);

        case 5:
          kindConfig = find(kinds, {
            name: kind
          });

          if (kindConfig) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", []);

        case 8:
          _context3.next = 10;
          return kindConfig.loadEntities();

        case 10:
          entities = _context3.sent;
          _context3.next = 13;
          return addEntities(entities);

        case 13:
          return _context3.abrupt("return", entities);

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this);
}
//# sourceMappingURL=entities.js.map