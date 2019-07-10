import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";

var getTagsByName = function getTagsByName(tags) {
  for (var _len = arguments.length, names = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    names[_key - 1] = arguments[_key];
  }

  return tags.filter(function (tag) {
    return names.some(function (name) {
      return name === tag.title;
    });
  });
};

var cleanSpaces = function cleanSpaces(paragraph) {
  return paragraph ? paragraph.split('\n').map(function (sentence) {
    return sentence.trim();
  }).reduce(function (acc, current) {
    return acc + ' ' + current;
  }, '').trim() : '';
};

var formatTag = function formatTag(title, tags, formatter, docs) {
  if (tags && tags.length > 0) {
    docs.push('\n');
    docs.push('\n');
    docs.push("*".concat(title, "*"));
    docs.push('\n');
    docs.push.apply(docs, _toConsumableArray(tags.map(formatter)));
  }
};

var formatExamples = function formatExamples(tags, docs) {
  if (tags && tags.length > 0) {
    docs.push('\n');
    docs.push('\n');
    docs.push('*Usage*');
    docs.push('\n');
    docs.push('\n');
    docs.push.apply(docs, _toConsumableArray(tags.map(function (tag) {
      return "".concat(tag.description);
    }).join('\n\n')));
  }
};

var formatDeprecated = function formatDeprecated(tags, docs) {
  if (tags && tags.length > 0) {
    docs.push('\n');
    docs.push.apply(docs, _toConsumableArray(tags.map(function (tag) {
      return "\n> **Deprecated** ".concat(cleanSpaces(tag.description));
    })));
  }
};

var formatDescription = function formatDescription(description, docs) {
  docs.push('\n');
  docs.push('\n');
  docs.push(description);
};

var getHeading = function getHeading(index, text) {
  return '#'.repeat(index) + ' ' + text;
};

var getSymbolHeading = function getSymbolHeading(text) {
  return "<a name=\"".concat(text, "\" href=\"#").concat(text, "\">#</a> **").concat(text, "**");
};

module.exports = function (rootDir, docPath, symbols, headingTitle, headingStartIndex) {
  var docs = [];
  var headingIndex = headingStartIndex || 1;

  if (headingTitle) {
    docs.push(getHeading(headingIndex, "".concat(headingTitle)));
    headingIndex++;
  }

  docs.push('\n');
  docs.push('\n');
  symbols.sort(function (first, second) {
    var firstName = first.name.toUpperCase();
    var secondName = second.name.toUpperCase();

    if (firstName < secondName) {
      return -1;
    }

    if (firstName > secondName) {
      return 1;
    }

    return 0;
  });

  if (symbols && symbols.length > 0) {
    symbols.forEach(function (symbol) {
      docs.push(getSymbolHeading(symbol.name));
      formatDeprecated(getTagsByName(symbol.tags, 'deprecated'), docs);
      formatDescription(symbol.description, docs);
      formatTag('Related', getTagsByName(symbol.tags, 'see', 'link'), function (tag) {
        return "\n- ".concat(tag.description);
      }, docs);
      formatExamples(getTagsByName(symbol.tags, 'example'), docs);
      formatTag('Type', getTagsByName(symbol.tags, 'type'), function (tag) {
        return "\n- `".concat(tag.type, "` ").concat(cleanSpaces(tag.description));
      }, docs);
      formatTag('Parameters', getTagsByName(symbol.tags, 'param'), function (tag) {
        return "\n- *".concat(tag.name, "* `").concat(tag.type, "`: ").concat(cleanSpaces(tag.description));
      }, docs);
      formatTag('Returns', getTagsByName(symbol.tags, 'return'), function (tag) {
        return "\n- `".concat(tag.type, "`: ").concat(cleanSpaces(tag.description));
      }, docs);
      docs.push('\n');
      docs.push('\n');
    });
    docs.pop(); // remove last \n, we want one blank line at the end of the file.
  } else {
    docs.push('Nothing to document.');
    docs.push('\n');
  }

  return docs.join('');
};
//# sourceMappingURL=formatter.js.map