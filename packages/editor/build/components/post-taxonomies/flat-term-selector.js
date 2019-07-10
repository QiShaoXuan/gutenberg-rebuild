"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _apiFetch = _interopRequireDefault(require("@wordpress/api-fetch"));

var _url = require("@wordpress/url");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Module constants
 */
var DEFAULT_QUERY = {
  per_page: -1,
  orderby: 'count',
  order: 'desc',
  _fields: 'id,name'
};
var MAX_TERMS_SUGGESTIONS = 20;

var isSameTermName = function isSameTermName(termA, termB) {
  return termA.toLowerCase() === termB.toLowerCase();
};
/**
 * Returns a term object with name unescaped.
 * The unescape of the name property is done using lodash unescape function.
 *
 * @param {Object} term The term object to unescape.
 *
 * @return {Object} Term object with name property unescaped.
 */


var unescapeTerm = function unescapeTerm(term) {
  return (0, _objectSpread2.default)({}, term, {
    name: (0, _lodash.unescape)(term.name)
  });
};
/**
 * Returns an array of term objects with names unescaped.
 * The unescape of each term is performed using the unescapeTerm function.
 *
 * @param {Object[]} terms Array of term objects to unescape.
 *
 * @return {Object[]} Array of term objects unescaped.
 */


var unescapeTerms = function unescapeTerms(terms) {
  return (0, _lodash.map)(terms, unescapeTerm);
};

var FlatTermSelector =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(FlatTermSelector, _Component);

  function FlatTermSelector() {
    var _this;

    (0, _classCallCheck2.default)(this, FlatTermSelector);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FlatTermSelector).apply(this, arguments));
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.searchTerms = (0, _lodash.throttle)(_this.searchTerms.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))), 500);
    _this.findOrCreateTerm = _this.findOrCreateTerm.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      loading: !(0, _lodash.isEmpty)(_this.props.terms),
      availableTerms: [],
      selectedTerms: []
    };
    return _this;
  }

  (0, _createClass2.default)(FlatTermSelector, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (!(0, _lodash.isEmpty)(this.props.terms)) {
        this.initRequest = this.fetchTerms({
          include: this.props.terms.join(','),
          per_page: -1
        });
        this.initRequest.then(function () {
          _this2.setState({
            loading: false
          });
        }, function (xhr) {
          if (xhr.statusText === 'abort') {
            return;
          }

          _this2.setState({
            loading: false
          });
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _lodash.invoke)(this.initRequest, ['abort']);
      (0, _lodash.invoke)(this.searchRequest, ['abort']);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.terms !== this.props.terms) {
        this.updateSelectedTerms(this.props.terms);
      }
    }
  }, {
    key: "fetchTerms",
    value: function fetchTerms() {
      var _this3 = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var taxonomy = this.props.taxonomy;
      var query = (0, _objectSpread2.default)({}, DEFAULT_QUERY, params);
      var request = (0, _apiFetch.default)({
        path: (0, _url.addQueryArgs)("/wp/v2/".concat(taxonomy.rest_base), query)
      });
      request.then(unescapeTerms).then(function (terms) {
        _this3.setState(function (state) {
          return {
            availableTerms: state.availableTerms.concat(terms.filter(function (term) {
              return !(0, _lodash.find)(state.availableTerms, function (availableTerm) {
                return availableTerm.id === term.id;
              });
            }))
          };
        });

        _this3.updateSelectedTerms(_this3.props.terms);
      });
      return request;
    }
  }, {
    key: "updateSelectedTerms",
    value: function updateSelectedTerms() {
      var _this4 = this;

      var terms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var selectedTerms = terms.reduce(function (result, termId) {
        var termObject = (0, _lodash.find)(_this4.state.availableTerms, function (term) {
          return term.id === termId;
        });

        if (termObject) {
          result.push(termObject.name);
        }

        return result;
      }, []);
      this.setState({
        selectedTerms: selectedTerms
      });
    }
  }, {
    key: "findOrCreateTerm",
    value: function findOrCreateTerm(termName) {
      var _this5 = this;

      var taxonomy = this.props.taxonomy;
      var termNameEscaped = (0, _lodash.escape)(termName); // Tries to create a term or fetch it if it already exists.

      return (0, _apiFetch.default)({
        path: "/wp/v2/".concat(taxonomy.rest_base),
        method: 'POST',
        data: {
          name: termNameEscaped
        }
      }).catch(function (error) {
        var errorCode = error.code;

        if (errorCode === 'term_exists') {
          // If the terms exist, fetch it instead of creating a new one.
          _this5.addRequest = (0, _apiFetch.default)({
            path: (0, _url.addQueryArgs)("/wp/v2/".concat(taxonomy.rest_base), (0, _objectSpread2.default)({}, DEFAULT_QUERY, {
              search: termNameEscaped
            }))
          }).then(unescapeTerms);
          return _this5.addRequest.then(function (searchResult) {
            return (0, _lodash.find)(searchResult, function (result) {
              return isSameTermName(result.name, termName);
            });
          });
        }

        return Promise.reject(error);
      }).then(unescapeTerm);
    }
  }, {
    key: "onChange",
    value: function onChange(termNames) {
      var _this6 = this;

      var uniqueTerms = (0, _lodash.uniqBy)(termNames, function (term) {
        return term.toLowerCase();
      });
      this.setState({
        selectedTerms: uniqueTerms
      });
      var newTermNames = uniqueTerms.filter(function (termName) {
        return !(0, _lodash.find)(_this6.state.availableTerms, function (term) {
          return isSameTermName(term.name, termName);
        });
      });

      var termNamesToIds = function termNamesToIds(names, availableTerms) {
        return names.map(function (termName) {
          return (0, _lodash.find)(availableTerms, function (term) {
            return isSameTermName(term.name, termName);
          }).id;
        });
      };

      if (newTermNames.length === 0) {
        return this.props.onUpdateTerms(termNamesToIds(uniqueTerms, this.state.availableTerms), this.props.taxonomy.rest_base);
      }

      Promise.all(newTermNames.map(this.findOrCreateTerm)).then(function (newTerms) {
        var newAvailableTerms = _this6.state.availableTerms.concat(newTerms);

        _this6.setState({
          availableTerms: newAvailableTerms
        });

        return _this6.props.onUpdateTerms(termNamesToIds(uniqueTerms, newAvailableTerms), _this6.props.taxonomy.rest_base);
      });
    }
  }, {
    key: "searchTerms",
    value: function searchTerms() {
      var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      (0, _lodash.invoke)(this.searchRequest, ['abort']);
      this.searchRequest = this.fetchTerms({
        search: search
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          slug = _this$props.slug,
          taxonomy = _this$props.taxonomy,
          hasAssignAction = _this$props.hasAssignAction;

      if (!hasAssignAction) {
        return null;
      }

      var _this$state = this.state,
          loading = _this$state.loading,
          availableTerms = _this$state.availableTerms,
          selectedTerms = _this$state.selectedTerms;
      var termNames = availableTerms.map(function (term) {
        return term.name;
      });
      var newTermLabel = (0, _lodash.get)(taxonomy, ['labels', 'add_new_item'], slug === 'post_tag' ? (0, _i18n.__)('Add New Tag') : (0, _i18n.__)('Add New Term'));
      var singularName = (0, _lodash.get)(taxonomy, ['labels', 'singular_name'], slug === 'post_tag' ? (0, _i18n.__)('Tag') : (0, _i18n.__)('Term'));
      var termAddedLabel = (0, _i18n.sprintf)((0, _i18n._x)('%s added', 'term'), singularName);
      var termRemovedLabel = (0, _i18n.sprintf)((0, _i18n._x)('%s removed', 'term'), singularName);
      var removeTermLabel = (0, _i18n.sprintf)((0, _i18n._x)('Remove %s', 'term'), singularName);
      return (0, _element.createElement)(_components.FormTokenField, {
        value: selectedTerms,
        suggestions: termNames,
        onChange: this.onChange,
        onInputChange: this.searchTerms,
        maxSuggestions: MAX_TERMS_SUGGESTIONS,
        disabled: loading,
        label: newTermLabel,
        messages: {
          added: termAddedLabel,
          removed: termRemovedLabel,
          remove: removeTermLabel
        }
      });
    }
  }]);
  return FlatTermSelector;
}(_element.Component);

var _default = (0, _compose.compose)((0, _data.withSelect)(function (select, _ref) {
  var slug = _ref.slug;

  var _select = select('core/editor'),
      getCurrentPost = _select.getCurrentPost;

  var _select2 = select('core'),
      getTaxonomy = _select2.getTaxonomy;

  var taxonomy = getTaxonomy(slug);
  return {
    hasCreateAction: taxonomy ? (0, _lodash.get)(getCurrentPost(), ['_links', 'wp:action-create-' + taxonomy.rest_base], false) : false,
    hasAssignAction: taxonomy ? (0, _lodash.get)(getCurrentPost(), ['_links', 'wp:action-assign-' + taxonomy.rest_base], false) : false,
    terms: taxonomy ? select('core/editor').getEditedPostAttribute(taxonomy.rest_base) : [],
    taxonomy: taxonomy
  };
}), (0, _data.withDispatch)(function (dispatch) {
  return {
    onUpdateTerms: function onUpdateTerms(terms, restBase) {
      dispatch('core/editor').editPost((0, _defineProperty2.default)({}, restBase, terms));
    }
  };
}), (0, _components.withFilters)('editor.PostTaxonomyType'))(FlatTermSelector);

exports.default = _default;
//# sourceMappingURL=flat-term-selector.js.map