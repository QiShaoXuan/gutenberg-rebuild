"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRegistrySelector = createRegistrySelector;
exports.createRegistryControl = createRegistryControl;

/**
 * Mark a selector as a registry selector.
 *
 * @param {function} registrySelector Function receiving a registry object and returning a state selector.
 *
 * @return {function} marked registry selector.
 */
function createRegistrySelector(registrySelector) {
  registrySelector.isRegistrySelector = true;
  return registrySelector;
}
/**
 * Mark a control as a registry control.
 *
 * @param {function} registryControl Function receiving a registry object and returning a control.
 *
 * @return {function} marked registry control.
 */


function createRegistryControl(registryControl) {
  registryControl.isRegistryControl = true;
  return registryControl;
}
//# sourceMappingURL=factory.js.map