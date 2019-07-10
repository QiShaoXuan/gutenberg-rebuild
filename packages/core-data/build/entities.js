"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKindEntities = getKindEntities;
exports.getMethodName = exports.kinds = exports.defaultEntities = exports.DEFAULT_ENTITY_KEY = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _lodash = require("lodash");

var _actions = require("./actions");

var _controls = require("./controls");

var _marked =
/*#__PURE__*/
_regenerator.default.mark(loadPostTypeEntities),
    _marked2 =
/*#__PURE__*/
_regenerator.default.mark(loadTaxonomyEntities),
    _marked3 =
/*#__PURE__*/
_regenerator.default.mark(getKindEntities);

var DEFAULT_ENTITY_KEY = 'id';
exports.DEFAULT_ENTITY_KEY = DEFAULT_ENTITY_KEY;
var defaultEntities = [{
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
exports.defaultEntities = defaultEntities;
var kinds = [{
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

exports.kinds = kinds;

function loadPostTypeEntities() {
  var postTypes;
  return _regenerator.default.wrap(function loadPostTypeEntities$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _controls.apiFetch)({
            path: '/wp/v2/types?context=edit'
          });

        case 2:
          postTypes = _context.sent;
          return _context.abrupt("return", (0, _lodash.map)(postTypes, function (postType, name) {
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
  return _regenerator.default.wrap(function loadTaxonomyEntities$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _controls.apiFetch)({
            path: '/wp/v2/taxonomies?context=edit'
          });

        case 2:
          taxonomies = _context2.sent;
          return _context2.abrupt("return", (0, _lodash.map)(taxonomies, function (taxonomy, name) {
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


var getMethodName = function getMethodName(kind, name) {
  var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'get';
  var usePlural = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var entity = (0, _lodash.find)(defaultEntities, {
    kind: kind,
    name: name
  });
  var kindPrefix = kind === 'root' ? '' : (0, _lodash.upperFirst)((0, _lodash.camelCase)(kind));
  var nameSuffix = (0, _lodash.upperFirst)((0, _lodash.camelCase)(name)) + (usePlural ? 's' : '');
  var suffix = usePlural && entity.plural ? (0, _lodash.upperFirst)((0, _lodash.camelCase)(entity.plural)) : nameSuffix;
  return "".concat(prefix).concat(kindPrefix).concat(suffix);
};
/**
 * Loads the kind entities into the store.
 *
 * @param {string} kind  Kind
 *
 * @return {Array} Entities
 */


exports.getMethodName = getMethodName;

function getKindEntities(kind) {
  var entities, kindConfig;
  return _regenerator.default.wrap(function getKindEntities$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _controls.select)('getEntitiesByKind', kind);

        case 2:
          entities = _context3.sent;

          if (!(entities && entities.length !== 0)) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", entities);

        case 5:
          kindConfig = (0, _lodash.find)(kinds, {
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
          return (0, _actions.addEntities)(entities);

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