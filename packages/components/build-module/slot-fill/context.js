import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { sortBy, forEach, without } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component, createContext } from '@wordpress/element';

var _createContext = createContext({
  registerSlot: function registerSlot() {},
  unregisterSlot: function unregisterSlot() {},
  registerFill: function registerFill() {},
  unregisterFill: function unregisterFill() {},
  getSlot: function getSlot() {},
  getFills: function getFills() {}
}),
    Provider = _createContext.Provider,
    Consumer = _createContext.Consumer;

var SlotFillProvider =
/*#__PURE__*/
function (_Component) {
  _inherits(SlotFillProvider, _Component);

  function SlotFillProvider() {
    var _this;

    _classCallCheck(this, SlotFillProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SlotFillProvider).apply(this, arguments));
    _this.registerSlot = _this.registerSlot.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.registerFill = _this.registerFill.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.unregisterSlot = _this.unregisterSlot.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.unregisterFill = _this.unregisterFill.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getSlot = _this.getSlot.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getFills = _this.getFills.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.slots = {};
    _this.fills = {};
    _this.state = {
      registerSlot: _this.registerSlot,
      unregisterSlot: _this.unregisterSlot,
      registerFill: _this.registerFill,
      unregisterFill: _this.unregisterFill,
      getSlot: _this.getSlot,
      getFills: _this.getFills
    };
    return _this;
  }

  _createClass(SlotFillProvider, [{
    key: "registerSlot",
    value: function registerSlot(name, slot) {
      var previousSlot = this.slots[name];
      this.slots[name] = slot;
      this.forceUpdateFills(name); // Sometimes the fills are registered after the initial render of slot
      // But before the registerSlot call, we need to rerender the slot

      this.forceUpdateSlot(name); // If a new instance of a slot is being mounted while another with the
      // same name exists, force its update _after_ the new slot has been
      // assigned into the instance, such that its own rendering of children
      // will be empty (the new Slot will subsume all fills for this name).

      if (previousSlot) {
        previousSlot.forceUpdate();
      }
    }
  }, {
    key: "registerFill",
    value: function registerFill(name, instance) {
      this.fills[name] = [].concat(_toConsumableArray(this.fills[name] || []), [instance]);
      this.forceUpdateSlot(name);
    }
  }, {
    key: "unregisterSlot",
    value: function unregisterSlot(name, instance) {
      // If a previous instance of a Slot by this name unmounts, do nothing,
      // as the slot and its fills should only be removed for the current
      // known instance.
      if (this.slots[name] !== instance) {
        return;
      }

      delete this.slots[name];
      this.forceUpdateFills(name);
    }
  }, {
    key: "unregisterFill",
    value: function unregisterFill(name, instance) {
      this.fills[name] = without(this.fills[name], instance);
      this.resetFillOccurrence(name);
      this.forceUpdateSlot(name);
    }
  }, {
    key: "getSlot",
    value: function getSlot(name) {
      return this.slots[name];
    }
  }, {
    key: "getFills",
    value: function getFills(name, slotInstance) {
      // Fills should only be returned for the current instance of the slot
      // in which they occupy.
      if (this.slots[name] !== slotInstance) {
        return [];
      }

      return sortBy(this.fills[name], 'occurrence');
    }
  }, {
    key: "resetFillOccurrence",
    value: function resetFillOccurrence(name) {
      forEach(this.fills[name], function (instance) {
        instance.resetOccurrence();
      });
    }
  }, {
    key: "forceUpdateFills",
    value: function forceUpdateFills(name) {
      forEach(this.fills[name], function (instance) {
        instance.forceUpdate();
      });
    }
  }, {
    key: "forceUpdateSlot",
    value: function forceUpdateSlot(name) {
      var slot = this.getSlot(name);

      if (slot) {
        slot.forceUpdate();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return createElement(Provider, {
        value: this.state
      }, this.props.children);
    }
  }]);

  return SlotFillProvider;
}(Component);

export default SlotFillProvider;
export { Consumer };
//# sourceMappingURL=context.js.map