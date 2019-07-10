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
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { Fragment, Component } from '@wordpress/element';
import { InspectorControls, BlockControls, RichText, PanelColorSettings, createCustomColorsHOC } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl, TextControl, Button, Toolbar, DropdownMenu } from '@wordpress/components';
/**
 * Internal dependencies
 */

import { createTable, updateCellContent, insertRow, deleteRow, insertColumn, deleteColumn } from './state';
var BACKGROUND_COLORS = [{
  color: '#f3f4f5',
  name: 'Subtle light gray',
  slug: 'subtle-light-gray'
}, {
  color: '#e9fbe5',
  name: 'Subtle pale green',
  slug: 'subtle-pale-green'
}, {
  color: '#e7f5fe',
  name: 'Subtle pale blue',
  slug: 'subtle-pale-blue'
}, {
  color: '#fcf0ef',
  name: 'Subtle pale pink',
  slug: 'subtle-pale-pink'
}];
var withCustomBackgroundColors = createCustomColorsHOC(BACKGROUND_COLORS);
export var TableEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(TableEdit, _Component);

  function TableEdit() {
    var _this;

    _classCallCheck(this, TableEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TableEdit).apply(this, arguments));
    _this.onCreateTable = _this.onCreateTable.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onChangeFixedLayout = _this.onChangeFixedLayout.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onChangeInitialColumnCount = _this.onChangeInitialColumnCount.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onChangeInitialRowCount = _this.onChangeInitialRowCount.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderSection = _this.renderSection.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getTableControls = _this.getTableControls.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onInsertRow = _this.onInsertRow.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onInsertRowBefore = _this.onInsertRowBefore.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onInsertRowAfter = _this.onInsertRowAfter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onDeleteRow = _this.onDeleteRow.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onInsertColumn = _this.onInsertColumn.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onInsertColumnBefore = _this.onInsertColumnBefore.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onInsertColumnAfter = _this.onInsertColumnAfter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onDeleteColumn = _this.onDeleteColumn.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      initialRowCount: 2,
      initialColumnCount: 2,
      selectedCell: null
    };
    return _this;
  }
  /**
   * Updates the initial column count used for table creation.
   *
   * @param {number} initialColumnCount New initial column count.
   */


  _createClass(TableEdit, [{
    key: "onChangeInitialColumnCount",
    value: function onChangeInitialColumnCount(initialColumnCount) {
      this.setState({
        initialColumnCount: initialColumnCount
      });
    }
    /**
     * Updates the initial row count used for table creation.
     *
     * @param {number} initialRowCount New initial row count.
     */

  }, {
    key: "onChangeInitialRowCount",
    value: function onChangeInitialRowCount(initialRowCount) {
      this.setState({
        initialRowCount: initialRowCount
      });
    }
    /**
     * Creates a table based on dimensions in local state.
     *
     * @param {Object} event Form submit event.
     */

  }, {
    key: "onCreateTable",
    value: function onCreateTable(event) {
      event.preventDefault();
      var setAttributes = this.props.setAttributes;
      var _this$state = this.state,
          initialRowCount = _this$state.initialRowCount,
          initialColumnCount = _this$state.initialColumnCount;
      initialRowCount = parseInt(initialRowCount, 10) || 2;
      initialColumnCount = parseInt(initialColumnCount, 10) || 2;
      setAttributes(createTable({
        rowCount: initialRowCount,
        columnCount: initialColumnCount
      }));
    }
    /**
     * Toggles whether the table has a fixed layout or not.
     */

  }, {
    key: "onChangeFixedLayout",
    value: function onChangeFixedLayout() {
      var _this$props = this.props,
          attributes = _this$props.attributes,
          setAttributes = _this$props.setAttributes;
      var hasFixedLayout = attributes.hasFixedLayout;
      setAttributes({
        hasFixedLayout: !hasFixedLayout
      });
    }
    /**
     * Changes the content of the currently selected cell.
     *
     * @param {Array} content A RichText content value.
     */

  }, {
    key: "onChange",
    value: function onChange(content) {
      var selectedCell = this.state.selectedCell;

      if (!selectedCell) {
        return;
      }

      var _this$props2 = this.props,
          attributes = _this$props2.attributes,
          setAttributes = _this$props2.setAttributes;
      var section = selectedCell.section,
          rowIndex = selectedCell.rowIndex,
          columnIndex = selectedCell.columnIndex;
      setAttributes(updateCellContent(attributes, {
        section: section,
        rowIndex: rowIndex,
        columnIndex: columnIndex,
        content: content
      }));
    }
    /**
     * Inserts a row at the currently selected row index, plus `delta`.
     *
     * @param {number} delta Offset for selected row index at which to insert.
     */

  }, {
    key: "onInsertRow",
    value: function onInsertRow(delta) {
      var selectedCell = this.state.selectedCell;

      if (!selectedCell) {
        return;
      }

      var _this$props3 = this.props,
          attributes = _this$props3.attributes,
          setAttributes = _this$props3.setAttributes;
      var section = selectedCell.section,
          rowIndex = selectedCell.rowIndex;
      this.setState({
        selectedCell: null
      });
      setAttributes(insertRow(attributes, {
        section: section,
        rowIndex: rowIndex + delta
      }));
    }
    /**
     * Inserts a row before the currently selected row.
     */

  }, {
    key: "onInsertRowBefore",
    value: function onInsertRowBefore() {
      this.onInsertRow(0);
    }
    /**
     * Inserts a row after the currently selected row.
     */

  }, {
    key: "onInsertRowAfter",
    value: function onInsertRowAfter() {
      this.onInsertRow(1);
    }
    /**
     * Deletes the currently selected row.
     */

  }, {
    key: "onDeleteRow",
    value: function onDeleteRow() {
      var selectedCell = this.state.selectedCell;

      if (!selectedCell) {
        return;
      }

      var _this$props4 = this.props,
          attributes = _this$props4.attributes,
          setAttributes = _this$props4.setAttributes;
      var section = selectedCell.section,
          rowIndex = selectedCell.rowIndex;
      this.setState({
        selectedCell: null
      });
      setAttributes(deleteRow(attributes, {
        section: section,
        rowIndex: rowIndex
      }));
    }
    /**
     * Inserts a column at the currently selected column index, plus `delta`.
     *
     * @param {number} delta Offset for selected column index at which to insert.
     */

  }, {
    key: "onInsertColumn",
    value: function onInsertColumn() {
      var delta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var selectedCell = this.state.selectedCell;

      if (!selectedCell) {
        return;
      }

      var _this$props5 = this.props,
          attributes = _this$props5.attributes,
          setAttributes = _this$props5.setAttributes;
      var section = selectedCell.section,
          columnIndex = selectedCell.columnIndex;
      this.setState({
        selectedCell: null
      });
      setAttributes(insertColumn(attributes, {
        section: section,
        columnIndex: columnIndex + delta
      }));
    }
    /**
     * Inserts a column before the currently selected column.
     */

  }, {
    key: "onInsertColumnBefore",
    value: function onInsertColumnBefore() {
      this.onInsertColumn(0);
    }
    /**
     * Inserts a column after the currently selected column.
     */

  }, {
    key: "onInsertColumnAfter",
    value: function onInsertColumnAfter() {
      this.onInsertColumn(1);
    }
    /**
     * Deletes the currently selected column.
     */

  }, {
    key: "onDeleteColumn",
    value: function onDeleteColumn() {
      var selectedCell = this.state.selectedCell;

      if (!selectedCell) {
        return;
      }

      var _this$props6 = this.props,
          attributes = _this$props6.attributes,
          setAttributes = _this$props6.setAttributes;
      var section = selectedCell.section,
          columnIndex = selectedCell.columnIndex;
      this.setState({
        selectedCell: null
      });
      setAttributes(deleteColumn(attributes, {
        section: section,
        columnIndex: columnIndex
      }));
    }
    /**
     * Creates an onFocus handler for a specified cell.
     *
     * @param {Object} selectedCell Object with `section`, `rowIndex`, and
     *                              `columnIndex` properties.
     *
     * @return {Function} Function to call on focus.
     */

  }, {
    key: "createOnFocus",
    value: function createOnFocus(selectedCell) {
      var _this2 = this;

      return function () {
        _this2.setState({
          selectedCell: selectedCell
        });
      };
    }
    /**
     * Gets the table controls to display in the block toolbar.
     *
     * @return {Array} Table controls.
     */

  }, {
    key: "getTableControls",
    value: function getTableControls() {
      var selectedCell = this.state.selectedCell;
      return [{
        icon: 'table-row-before',
        title: __('Add Row Before'),
        isDisabled: !selectedCell,
        onClick: this.onInsertRowBefore
      }, {
        icon: 'table-row-after',
        title: __('Add Row After'),
        isDisabled: !selectedCell,
        onClick: this.onInsertRowAfter
      }, {
        icon: 'table-row-delete',
        title: __('Delete Row'),
        isDisabled: !selectedCell,
        onClick: this.onDeleteRow
      }, {
        icon: 'table-col-before',
        title: __('Add Column Before'),
        isDisabled: !selectedCell,
        onClick: this.onInsertColumnBefore
      }, {
        icon: 'table-col-after',
        title: __('Add Column After'),
        isDisabled: !selectedCell,
        onClick: this.onInsertColumnAfter
      }, {
        icon: 'table-col-delete',
        title: __('Delete Column'),
        isDisabled: !selectedCell,
        onClick: this.onDeleteColumn
      }];
    }
    /**
     * Renders a table section.
     *
     * @param {string} options.type Section type: head, body, or foot.
     * @param {Array}  options.rows The rows to render.
     *
     * @return {Object} React element for the section.
     */

  }, {
    key: "renderSection",
    value: function renderSection(_ref) {
      var _this3 = this;

      var type = _ref.type,
          rows = _ref.rows;

      if (!rows.length) {
        return null;
      }

      var Tag = "t".concat(type);
      var selectedCell = this.state.selectedCell;
      return createElement(Tag, null, rows.map(function (_ref2, rowIndex) {
        var cells = _ref2.cells;
        return createElement("tr", {
          key: rowIndex
        }, cells.map(function (_ref3, columnIndex) {
          var content = _ref3.content,
              CellTag = _ref3.tag;
          var isSelected = selectedCell && type === selectedCell.section && rowIndex === selectedCell.rowIndex && columnIndex === selectedCell.columnIndex;
          var cell = {
            section: type,
            rowIndex: rowIndex,
            columnIndex: columnIndex
          };
          var cellClasses = classnames({
            'is-selected': isSelected
          });
          return createElement(CellTag, {
            key: columnIndex,
            className: cellClasses
          }, createElement(RichText, {
            className: "wp-block-table__cell-content",
            value: content,
            onChange: _this3.onChange,
            unstableOnFocus: _this3.createOnFocus(cell)
          }));
        }));
      }));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var isSelected = this.props.isSelected;
      var selectedCell = this.state.selectedCell;

      if (!isSelected && selectedCell) {
        this.setState({
          selectedCell: null
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props7 = this.props,
          attributes = _this$props7.attributes,
          className = _this$props7.className,
          backgroundColor = _this$props7.backgroundColor,
          setBackgroundColor = _this$props7.setBackgroundColor;
      var _this$state2 = this.state,
          initialRowCount = _this$state2.initialRowCount,
          initialColumnCount = _this$state2.initialColumnCount;
      var hasFixedLayout = attributes.hasFixedLayout,
          head = attributes.head,
          body = attributes.body,
          foot = attributes.foot;
      var isEmpty = !head.length && !body.length && !foot.length;
      var Section = this.renderSection;

      if (isEmpty) {
        return createElement("form", {
          onSubmit: this.onCreateTable
        }, createElement(TextControl, {
          type: "number",
          label: __('Column Count'),
          value: initialColumnCount,
          onChange: this.onChangeInitialColumnCount,
          min: "1"
        }), createElement(TextControl, {
          type: "number",
          label: __('Row Count'),
          value: initialRowCount,
          onChange: this.onChangeInitialRowCount,
          min: "1"
        }), createElement(Button, {
          isPrimary: true,
          type: "submit"
        }, __('Create')));
      }

      var classes = classnames(className, backgroundColor.class, {
        'has-fixed-layout': hasFixedLayout,
        'has-background': !!backgroundColor.color
      });
      return createElement(Fragment, null, createElement(BlockControls, null, createElement(Toolbar, null, createElement(DropdownMenu, {
        icon: "editor-table",
        label: __('Edit table'),
        controls: this.getTableControls()
      }))), createElement(InspectorControls, null, createElement(PanelBody, {
        title: __('Table Settings'),
        className: "blocks-table-settings"
      }, createElement(ToggleControl, {
        label: __('Fixed width table cells'),
        checked: !!hasFixedLayout,
        onChange: this.onChangeFixedLayout
      })), createElement(PanelColorSettings, {
        title: __('Color Settings'),
        initialOpen: false,
        colorSettings: [{
          value: backgroundColor.color,
          onChange: setBackgroundColor,
          label: __('Background Color'),
          disableCustomColors: true,
          colors: BACKGROUND_COLORS
        }]
      })), createElement("table", {
        className: classes
      }, createElement(Section, {
        type: "head",
        rows: head
      }), createElement(Section, {
        type: "body",
        rows: body
      }), createElement(Section, {
        type: "foot",
        rows: foot
      })));
    }
  }]);

  return TableEdit;
}(Component);
export default withCustomBackgroundColors('backgroundColor')(TableEdit);
//# sourceMappingURL=edit.js.map