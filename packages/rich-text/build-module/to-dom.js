import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";

/**
 * Internal dependencies
 */
import { toTree } from './to-tree';
import { createElement } from './create-element';
/**
 * Browser dependencies
 */

var TEXT_NODE = window.Node.TEXT_NODE;
/**
 * Creates a path as an array of indices from the given root node to the given
 * node.
 *
 * @param {Node}        node     Node to find the path of.
 * @param {HTMLElement} rootNode Root node to find the path from.
 * @param {Array}       path     Initial path to build on.
 *
 * @return {Array} The path from the root node to the node.
 */

function createPathToNode(node, rootNode, path) {
  var parentNode = node.parentNode;
  var i = 0;

  while (node = node.previousSibling) {
    i++;
  }

  path = [i].concat(_toConsumableArray(path));

  if (parentNode !== rootNode) {
    path = createPathToNode(parentNode, rootNode, path);
  }

  return path;
}
/**
 * Gets a node given a path (array of indices) from the given node.
 *
 * @param {HTMLElement} node Root node to find the wanted node in.
 * @param {Array}       path Path (indices) to the wanted node.
 *
 * @return {Object} Object with the found node and the remaining offset (if any).
 */


function getNodeByPath(node, path) {
  path = _toConsumableArray(path);

  while (node && path.length > 1) {
    node = node.childNodes[path.shift()];
  }

  return {
    node: node,
    offset: path[0]
  };
}
/**
 * Returns a new instance of a DOM tree upon which RichText operations can be
 * applied.
 *
 * Note: The current implementation will return a shared reference, reset on
 * each call to `createEmpty`. Therefore, you should not hold a reference to
 * the value to operate upon asynchronously, as it may have unexpected results.
 *
 * @return {WPRichTextTree} RichText tree.
 */


var createEmpty = function createEmpty() {
  return createElement(document, '');
};

function append(element, child) {
  if (typeof child === 'string') {
    child = element.ownerDocument.createTextNode(child);
  }

  var _child = child,
      type = _child.type,
      attributes = _child.attributes;

  if (type) {
    child = element.ownerDocument.createElement(type);

    for (var key in attributes) {
      child.setAttribute(key, attributes[key]);
    }
  }

  return element.appendChild(child);
}

function appendText(node, text) {
  node.appendData(text);
}

function getLastChild(_ref) {
  var lastChild = _ref.lastChild;
  return lastChild;
}

function getParent(_ref2) {
  var parentNode = _ref2.parentNode;
  return parentNode;
}

function isText(_ref3) {
  var nodeType = _ref3.nodeType;
  return nodeType === TEXT_NODE;
}

function getText(_ref4) {
  var nodeValue = _ref4.nodeValue;
  return nodeValue;
}

function remove(node) {
  return node.parentNode.removeChild(node);
}

function prepareFormats() {
  var prepareEditableTree = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var value = arguments.length > 1 ? arguments[1] : undefined;
  return prepareEditableTree.reduce(function (accumlator, fn) {
    return fn(accumlator, value.text);
  }, value.formats);
}

export function toDom(_ref5) {
  var value = _ref5.value,
      multilineTag = _ref5.multilineTag,
      prepareEditableTree = _ref5.prepareEditableTree,
      _ref5$isEditableTree = _ref5.isEditableTree,
      isEditableTree = _ref5$isEditableTree === void 0 ? true : _ref5$isEditableTree;
  var startPath = [];
  var endPath = [];
  var tree = toTree({
    value: _objectSpread({}, value, {
      formats: prepareFormats(prepareEditableTree, value)
    }),
    multilineTag: multilineTag,
    createEmpty: createEmpty,
    append: append,
    getLastChild: getLastChild,
    getParent: getParent,
    isText: isText,
    getText: getText,
    remove: remove,
    appendText: appendText,
    onStartIndex: function onStartIndex(body, pointer) {
      startPath = createPathToNode(pointer, body, [pointer.nodeValue.length]);
    },
    onEndIndex: function onEndIndex(body, pointer) {
      endPath = createPathToNode(pointer, body, [pointer.nodeValue.length]);
    },
    isEditableTree: isEditableTree
  });
  return {
    body: tree,
    selection: {
      startPath: startPath,
      endPath: endPath
    }
  };
}
/**
 * Create an `Element` tree from a Rich Text value and applies the difference to
 * the `Element` tree contained by `current`. If a `multilineTag` is provided,
 * text separated by two new lines will be wrapped in an `Element` of that type.
 *
 * @param {Object}      $1                        Named arguments.
 * @param {Object}      $1.value                  Value to apply.
 * @param {HTMLElement} $1.current                The live root node to apply the element tree to.
 * @param {string}      [$1.multilineTag]         Multiline tag.
 * @param {Array}       [$1.multilineWrapperTags] Tags where lines can be found if nesting is possible.
 */

export function apply(_ref6) {
  var value = _ref6.value,
      current = _ref6.current,
      multilineTag = _ref6.multilineTag,
      prepareEditableTree = _ref6.prepareEditableTree,
      __unstableDomOnly = _ref6.__unstableDomOnly;

  // Construct a new element tree in memory.
  var _toDom = toDom({
    value: value,
    multilineTag: multilineTag,
    prepareEditableTree: prepareEditableTree
  }),
      body = _toDom.body,
      selection = _toDom.selection;

  applyValue(body, current);

  if (value.start !== undefined && !__unstableDomOnly) {
    applySelection(selection, current);
  }
}
export function applyValue(future, current) {
  var i = 0;
  var futureChild;

  while (futureChild = future.firstChild) {
    var currentChild = current.childNodes[i];

    if (!currentChild) {
      current.appendChild(futureChild);
    } else if (!currentChild.isEqualNode(futureChild)) {
      if (currentChild.nodeName !== futureChild.nodeName || currentChild.nodeType === TEXT_NODE && currentChild.data !== futureChild.data) {
        current.replaceChild(futureChild, currentChild);
      } else {
        var currentAttributes = currentChild.attributes;
        var futureAttributes = futureChild.attributes;

        if (currentAttributes) {
          for (var ii = 0; ii < currentAttributes.length; ii++) {
            var name = currentAttributes[ii].name;

            if (!futureChild.getAttribute(name)) {
              currentChild.removeAttribute(name);
            }
          }
        }

        if (futureAttributes) {
          for (var _ii = 0; _ii < futureAttributes.length; _ii++) {
            var _futureAttributes$_ii = futureAttributes[_ii],
                name = _futureAttributes$_ii.name,
                value = _futureAttributes$_ii.value;

            if (currentChild.getAttribute(name) !== value) {
              currentChild.setAttribute(name, value);
            }
          }
        }

        applyValue(futureChild, currentChild);
        future.removeChild(futureChild);
      }
    } else {
      future.removeChild(futureChild);
    }

    i++;
  }

  while (current.childNodes[i]) {
    current.removeChild(current.childNodes[i]);
  }
}
/**
 * Returns true if two ranges are equal, or false otherwise. Ranges are
 * considered equal if their start and end occur in the same container and
 * offset.
 *
 * @param {Range} a First range object to test.
 * @param {Range} b First range object to test.
 *
 * @return {boolean} Whether the two ranges are equal.
 */

function isRangeEqual(a, b) {
  return a.startContainer === b.startContainer && a.startOffset === b.startOffset && a.endContainer === b.endContainer && a.endOffset === b.endOffset;
}

export function applySelection(_ref7, current) {
  var startPath = _ref7.startPath,
      endPath = _ref7.endPath;

  var _getNodeByPath = getNodeByPath(current, startPath),
      startContainer = _getNodeByPath.node,
      startOffset = _getNodeByPath.offset;

  var _getNodeByPath2 = getNodeByPath(current, endPath),
      endContainer = _getNodeByPath2.node,
      endOffset = _getNodeByPath2.offset;

  var selection = window.getSelection();
  var ownerDocument = current.ownerDocument;
  var range = ownerDocument.createRange();
  range.setStart(startContainer, startOffset);
  range.setEnd(endContainer, endOffset);

  if (selection.rangeCount > 0) {
    // If the to be added range and the live range are the same, there's no
    // need to remove the live range and add the equivalent range.
    if (isRangeEqual(range, selection.getRangeAt(0))) {
      // Set back focus if focus is lost.
      if (ownerDocument.activeElement !== current) {
        current.focus();
      }

      return;
    }

    selection.removeAllRanges();
  }

  selection.addRange(range);
}
//# sourceMappingURL=to-dom.js.map