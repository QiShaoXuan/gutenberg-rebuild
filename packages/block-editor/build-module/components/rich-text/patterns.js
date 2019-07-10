/**
 * WordPress dependencies
 */
import { getBlockTransforms, findTransform } from '@wordpress/blocks';
import { remove, applyFormat, getTextContent, getSelectionStart, slice } from '@wordpress/rich-text';
export function getPatterns(_ref) {
  var onReplace = _ref.onReplace,
      valueToFormat = _ref.valueToFormat;
  var prefixTransforms = getBlockTransforms('from').filter(function (_ref2) {
    var type = _ref2.type;
    return type === 'prefix';
  });
  return [function (record) {
    if (!onReplace) {
      return record;
    }

    var start = getSelectionStart(record);
    var text = getTextContent(record);
    var characterBefore = text.slice(start - 1, start);

    if (!/\s/.test(characterBefore)) {
      return record;
    }

    var trimmedTextBefore = text.slice(0, start).trim();
    var transformation = findTransform(prefixTransforms, function (_ref3) {
      var prefix = _ref3.prefix;
      return trimmedTextBefore === prefix;
    });

    if (!transformation) {
      return record;
    }

    var content = valueToFormat(slice(record, start, text.length));
    var block = transformation.transform(content);
    onReplace([block]);
    return record;
  }, function (record) {
    var BACKTICK = '`';
    var start = getSelectionStart(record);
    var text = getTextContent(record);
    var characterBefore = text.slice(start - 1, start); // Quick check the text for the necessary character.

    if (characterBefore !== BACKTICK) {
      return record;
    }

    var textBefore = text.slice(0, start - 1);
    var indexBefore = textBefore.lastIndexOf(BACKTICK);

    if (indexBefore === -1) {
      return record;
    }

    var startIndex = indexBefore;
    var endIndex = start - 2;

    if (startIndex === endIndex) {
      return record;
    }

    record = remove(record, startIndex, startIndex + 1);
    record = remove(record, endIndex, endIndex + 1);
    record = applyFormat(record, {
      type: 'code'
    }, startIndex, endIndex);
    return record;
  }];
}
//# sourceMappingURL=patterns.js.map