import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * Clicks on the button in the header which opens Document Settings sidebar when it is closed.
 */
export function openDocumentSettingsSidebar() {
  return _openDocumentSettingsSidebar.apply(this, arguments);
}

function _openDocumentSettingsSidebar() {
  _openDocumentSettingsSidebar = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    var openButton;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return page.$('.edit-post-header__settings button[aria-label="Settings"][aria-expanded="false"]');

          case 2:
            openButton = _context.sent;

            if (!openButton) {
              _context.next = 6;
              break;
            }

            _context.next = 6;
            return openButton.click();

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _openDocumentSettingsSidebar.apply(this, arguments);
}
//# sourceMappingURL=open-document-settings-sidebar.js.map