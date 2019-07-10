var maybeAddDefault = function maybeAddDefault(value, defaultValue) {
  if (defaultValue) {
    return "value=".concat(defaultValue);
  }

  return value;
};

var getType = function getType(param, defaultValue) {
  if (!defaultValue) {
    defaultValue = param.default;
  }

  if (param.type.type) {
    return getType(param.type, defaultValue);
  } else if (param.expression) {
    if (param.type === 'RestType') {
      return "...".concat(getType(param.expression, defaultValue));
    } else if (param.type === 'NullableType') {
      return "?".concat(getType(param.expression, defaultValue));
    } else if (param.type === 'TypeApplication') {
      return "".concat(getType(param.expression, defaultValue), "<").concat(param.applications.map(function (application) {
        return getType(application);
      }).join(','), ">");
    } else if (param.type === 'OptionalType') {
      return "[".concat(getType(param.expression, defaultValue), "]");
    }

    return getType(param.expression, defaultValue);
  } else if (param.elements) {
    var types = param.elements.map(function (element) {
      return getType(element);
    });
    return maybeAddDefault("(".concat(types.join('|'), ")"), defaultValue);
  } else if (param.type === 'AllLiteral') {
    return maybeAddDefault('*', defaultValue);
  } else if (param.type === 'NullLiteral') {
    return maybeAddDefault('null', defaultValue);
  } else if (param.type === 'UndefinedLiteral') {
    return maybeAddDefault('undefined', defaultValue);
  }

  return maybeAddDefault(param.name, defaultValue);
};

module.exports = function (param) {
  return getType(param);
};
//# sourceMappingURL=get-type-as-string.js.map