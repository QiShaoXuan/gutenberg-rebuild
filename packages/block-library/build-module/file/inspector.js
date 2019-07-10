import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
export default function FileBlockInspector(_ref) {
  var hrefs = _ref.hrefs,
      openInNewWindow = _ref.openInNewWindow,
      showDownloadButton = _ref.showDownloadButton,
      changeLinkDestinationOption = _ref.changeLinkDestinationOption,
      changeOpenInNewWindow = _ref.changeOpenInNewWindow,
      changeShowDownloadButton = _ref.changeShowDownloadButton;
  var href = hrefs.href,
      textLinkHref = hrefs.textLinkHref,
      attachmentPage = hrefs.attachmentPage;
  var linkDestinationOptions = [{
    value: href,
    label: __('URL')
  }];

  if (attachmentPage) {
    linkDestinationOptions = [{
      value: href,
      label: __('Media File')
    }, {
      value: attachmentPage,
      label: __('Attachment Page')
    }];
  }

  return createElement(Fragment, null, createElement(InspectorControls, null, createElement(PanelBody, {
    title: __('Text Link Settings')
  }, createElement(SelectControl, {
    label: __('Link To'),
    value: textLinkHref,
    options: linkDestinationOptions,
    onChange: changeLinkDestinationOption
  }), createElement(ToggleControl, {
    label: __('Open in New Tab'),
    checked: openInNewWindow,
    onChange: changeOpenInNewWindow
  })), createElement(PanelBody, {
    title: __('Download Button Settings')
  }, createElement(ToggleControl, {
    label: __('Show Download Button'),
    checked: showDownloadButton,
    onChange: changeShowDownloadButton
  }))));
}
//# sourceMappingURL=inspector.js.map