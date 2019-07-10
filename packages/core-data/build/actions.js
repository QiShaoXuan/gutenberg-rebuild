"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.receiveUserQuery = receiveUserQuery;
exports.addEntities = addEntities;
exports.receiveEntityRecords = receiveEntityRecords;
exports.receiveThemeSupports = receiveThemeSupports;
exports.receiveEmbedPreview = receiveEmbedPreview;
exports.saveEntityRecord = saveEntityRecord;
exports.receiveUploadPermissions = receiveUploadPermissions;
exports.receiveUserPermission = receiveUserPermission;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

var _queriedData = require("./queried-data");

var _entities = require("./entities");

var _controls = require("./controls");

var _marked =
/*#__PURE__*/
_regenerator.default.mark(saveEntityRecord);

/**
 * Returns an action object used in signalling that authors have been received.
 *
 * @param {string}       queryID Query ID.
 * @param {Array|Object} users   Users received.
 *
 * @return {Object} Action object.
 */
function receiveUserQuery(queryID, users) {
  return {
    type: 'RECEIVE_USER_QUERY',
    users: (0, _lodash.castArray)(users),
    queryID: queryID
  };
}
/**
 * Returns an action object used in adding new entities.
 *
 * @param {Array} entities  Entities received.
 *
 * @return {Object} Action object.
 */


function addEntities(entities) {
  return {
    type: 'ADD_ENTITIES',
    entities: entities
  };
}
/**
 * Returns an action object used in signalling that entity records have been received.
 *
 * @param {string}       kind            Kind of the received entity.
 * @param {string}       name            Name of the received entity.
 * @param {Array|Object} records         Records received.
 * @param {?Object}      query           Query Object.
 * @param {?boolean}     invalidateCache Should invalidate query caches
 *
 * @return {Object} Action object.
 */


function receiveEntityRecords(kind, name, records, query) {
  var invalidateCache = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var action;

  if (query) {
    action = (0, _queriedData.receiveQueriedItems)(records, query);
  } else {
    action = (0, _queriedData.receiveItems)(records);
  }

  return (0, _objectSpread2.default)({}, action, {
    kind: kind,
    name: name,
    invalidateCache: invalidateCache
  });
}
/**
 * Returns an action object used in signalling that the index has been received.
 *
 * @param {Object} themeSupports Theme support for the current theme.
 *
 * @return {Object} Action object.
 */


function receiveThemeSupports(themeSupports) {
  return {
    type: 'RECEIVE_THEME_SUPPORTS',
    themeSupports: themeSupports
  };
}
/**
 * Returns an action object used in signalling that the preview data for
 * a given URl has been received.
 *
 * @param {string}  url      URL to preview the embed for.
 * @param {Mixed}   preview  Preview data.
 *
 * @return {Object} Action object.
 */


function receiveEmbedPreview(url, preview) {
  return {
    type: 'RECEIVE_EMBED_PREVIEW',
    url: url,
    preview: preview
  };
}
/**
 * Action triggered to save an entity record.
 *
 * @param {string} kind    Kind of the received entity.
 * @param {string} name    Name of the received entity.
 * @param {Object} record  Record to be saved.
 *
 * @return {Object} Updated record.
 */


function saveEntityRecord(kind, name, record) {
  var entities, entity, key, recordId, updatedRecord;
  return _regenerator.default.wrap(function saveEntityRecord$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _entities.getKindEntities)(kind);

        case 2:
          entities = _context.sent;
          entity = (0, _lodash.find)(entities, {
            kind: kind,
            name: name
          });

          if (entity) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return");

        case 6:
          key = entity.key || _entities.DEFAULT_ENTITY_KEY;
          recordId = record[key];
          _context.next = 10;
          return (0, _controls.apiFetch)({
            path: "".concat(entity.baseURL).concat(recordId ? '/' + recordId : ''),
            method: recordId ? 'PUT' : 'POST',
            data: record
          });

        case 10:
          updatedRecord = _context.sent;
          _context.next = 13;
          return receiveEntityRecords(kind, name, updatedRecord, undefined, true);

        case 13:
          return _context.abrupt("return", updatedRecord);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}
/**
 * Returns an action object used in signalling that Upload permissions have been received.
 *
 * @param {boolean} hasUploadPermissions Does the user have permission to upload files?
 *
 * @return {Object} Action object.
 */


function receiveUploadPermissions(hasUploadPermissions) {
  return {
    type: 'RECEIVE_USER_PERMISSION',
    key: 'create/media',
    isAllowed: hasUploadPermissions
  };
}
/**
 * Returns an action object used in signalling that the current user has
 * permission to perform an action on a REST resource.
 *
 * @param {string}  key       A key that represents the action and REST resource.
 * @param {boolean} isAllowed Whether or not the user can perform the action.
 *
 * @return {Object} Action object.
 */


function receiveUserPermission(key, isAllowed) {
  return {
    type: 'RECEIVE_USER_PERMISSION',
    key: key,
    isAllowed: isAllowed
  };
}
//# sourceMappingURL=actions.js.map