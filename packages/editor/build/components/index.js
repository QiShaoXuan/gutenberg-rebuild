"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  ServerSideRender: true,
  AutosaveMonitor: true,
  DocumentOutline: true,
  DocumentOutlineCheck: true,
  VisualEditorGlobalKeyboardShortcuts: true,
  EditorGlobalKeyboardShortcuts: true,
  TextEditorGlobalKeyboardShortcuts: true,
  EditorHistoryRedo: true,
  EditorHistoryUndo: true,
  EditorNotices: true,
  ErrorBoundary: true,
  PageAttributesCheck: true,
  PageAttributesOrder: true,
  PageAttributesParent: true,
  PageTemplate: true,
  PostAuthor: true,
  PostAuthorCheck: true,
  PostComments: true,
  PostExcerpt: true,
  PostExcerptCheck: true,
  PostFeaturedImage: true,
  PostFeaturedImageCheck: true,
  PostFormat: true,
  PostFormatCheck: true,
  PostLastRevision: true,
  PostLastRevisionCheck: true,
  PostLockedModal: true,
  PostPendingStatus: true,
  PostPendingStatusCheck: true,
  PostPingbacks: true,
  PostPreviewButton: true,
  PostPublishButton: true,
  PostPublishButtonLabel: true,
  PostPublishPanel: true,
  PostSavedState: true,
  PostSchedule: true,
  PostScheduleCheck: true,
  PostScheduleLabel: true,
  PostSticky: true,
  PostStickyCheck: true,
  PostSwitchToDraftButton: true,
  PostTaxonomies: true,
  PostTaxonomiesCheck: true,
  PostTextEditor: true,
  PostTitle: true,
  PostTrash: true,
  PostTrashCheck: true,
  PostTypeSupportCheck: true,
  PostVisibility: true,
  PostVisibilityLabel: true,
  PostVisibilityCheck: true,
  TableOfContents: true,
  UnsavedChangesWarning: true,
  WordCount: true,
  EditorProvider: true
};
Object.defineProperty(exports, "ServerSideRender", {
  enumerable: true,
  get: function get() {
    return _serverSideRender.default;
  }
});
Object.defineProperty(exports, "AutosaveMonitor", {
  enumerable: true,
  get: function get() {
    return _autosaveMonitor.default;
  }
});
Object.defineProperty(exports, "DocumentOutline", {
  enumerable: true,
  get: function get() {
    return _documentOutline.default;
  }
});
Object.defineProperty(exports, "DocumentOutlineCheck", {
  enumerable: true,
  get: function get() {
    return _check.default;
  }
});
Object.defineProperty(exports, "VisualEditorGlobalKeyboardShortcuts", {
  enumerable: true,
  get: function get() {
    return _visualEditorShortcuts.default;
  }
});
Object.defineProperty(exports, "EditorGlobalKeyboardShortcuts", {
  enumerable: true,
  get: function get() {
    return _visualEditorShortcuts.EditorGlobalKeyboardShortcuts;
  }
});
Object.defineProperty(exports, "TextEditorGlobalKeyboardShortcuts", {
  enumerable: true,
  get: function get() {
    return _textEditorShortcuts.default;
  }
});
Object.defineProperty(exports, "EditorHistoryRedo", {
  enumerable: true,
  get: function get() {
    return _redo.default;
  }
});
Object.defineProperty(exports, "EditorHistoryUndo", {
  enumerable: true,
  get: function get() {
    return _undo.default;
  }
});
Object.defineProperty(exports, "EditorNotices", {
  enumerable: true,
  get: function get() {
    return _editorNotices.default;
  }
});
Object.defineProperty(exports, "ErrorBoundary", {
  enumerable: true,
  get: function get() {
    return _errorBoundary.default;
  }
});
Object.defineProperty(exports, "PageAttributesCheck", {
  enumerable: true,
  get: function get() {
    return _check2.default;
  }
});
Object.defineProperty(exports, "PageAttributesOrder", {
  enumerable: true,
  get: function get() {
    return _order.default;
  }
});
Object.defineProperty(exports, "PageAttributesParent", {
  enumerable: true,
  get: function get() {
    return _parent.default;
  }
});
Object.defineProperty(exports, "PageTemplate", {
  enumerable: true,
  get: function get() {
    return _template.default;
  }
});
Object.defineProperty(exports, "PostAuthor", {
  enumerable: true,
  get: function get() {
    return _postAuthor.default;
  }
});
Object.defineProperty(exports, "PostAuthorCheck", {
  enumerable: true,
  get: function get() {
    return _check3.default;
  }
});
Object.defineProperty(exports, "PostComments", {
  enumerable: true,
  get: function get() {
    return _postComments.default;
  }
});
Object.defineProperty(exports, "PostExcerpt", {
  enumerable: true,
  get: function get() {
    return _postExcerpt.default;
  }
});
Object.defineProperty(exports, "PostExcerptCheck", {
  enumerable: true,
  get: function get() {
    return _check4.default;
  }
});
Object.defineProperty(exports, "PostFeaturedImage", {
  enumerable: true,
  get: function get() {
    return _postFeaturedImage.default;
  }
});
Object.defineProperty(exports, "PostFeaturedImageCheck", {
  enumerable: true,
  get: function get() {
    return _check5.default;
  }
});
Object.defineProperty(exports, "PostFormat", {
  enumerable: true,
  get: function get() {
    return _postFormat.default;
  }
});
Object.defineProperty(exports, "PostFormatCheck", {
  enumerable: true,
  get: function get() {
    return _check6.default;
  }
});
Object.defineProperty(exports, "PostLastRevision", {
  enumerable: true,
  get: function get() {
    return _postLastRevision.default;
  }
});
Object.defineProperty(exports, "PostLastRevisionCheck", {
  enumerable: true,
  get: function get() {
    return _check7.default;
  }
});
Object.defineProperty(exports, "PostLockedModal", {
  enumerable: true,
  get: function get() {
    return _postLockedModal.default;
  }
});
Object.defineProperty(exports, "PostPendingStatus", {
  enumerable: true,
  get: function get() {
    return _postPendingStatus.default;
  }
});
Object.defineProperty(exports, "PostPendingStatusCheck", {
  enumerable: true,
  get: function get() {
    return _check8.default;
  }
});
Object.defineProperty(exports, "PostPingbacks", {
  enumerable: true,
  get: function get() {
    return _postPingbacks.default;
  }
});
Object.defineProperty(exports, "PostPreviewButton", {
  enumerable: true,
  get: function get() {
    return _postPreviewButton.default;
  }
});
Object.defineProperty(exports, "PostPublishButton", {
  enumerable: true,
  get: function get() {
    return _postPublishButton.default;
  }
});
Object.defineProperty(exports, "PostPublishButtonLabel", {
  enumerable: true,
  get: function get() {
    return _label.default;
  }
});
Object.defineProperty(exports, "PostPublishPanel", {
  enumerable: true,
  get: function get() {
    return _postPublishPanel.default;
  }
});
Object.defineProperty(exports, "PostSavedState", {
  enumerable: true,
  get: function get() {
    return _postSavedState.default;
  }
});
Object.defineProperty(exports, "PostSchedule", {
  enumerable: true,
  get: function get() {
    return _postSchedule.default;
  }
});
Object.defineProperty(exports, "PostScheduleCheck", {
  enumerable: true,
  get: function get() {
    return _check9.default;
  }
});
Object.defineProperty(exports, "PostScheduleLabel", {
  enumerable: true,
  get: function get() {
    return _label2.default;
  }
});
Object.defineProperty(exports, "PostSticky", {
  enumerable: true,
  get: function get() {
    return _postSticky.default;
  }
});
Object.defineProperty(exports, "PostStickyCheck", {
  enumerable: true,
  get: function get() {
    return _check10.default;
  }
});
Object.defineProperty(exports, "PostSwitchToDraftButton", {
  enumerable: true,
  get: function get() {
    return _postSwitchToDraftButton.default;
  }
});
Object.defineProperty(exports, "PostTaxonomies", {
  enumerable: true,
  get: function get() {
    return _postTaxonomies.default;
  }
});
Object.defineProperty(exports, "PostTaxonomiesCheck", {
  enumerable: true,
  get: function get() {
    return _check11.default;
  }
});
Object.defineProperty(exports, "PostTextEditor", {
  enumerable: true,
  get: function get() {
    return _postTextEditor.default;
  }
});
Object.defineProperty(exports, "PostTitle", {
  enumerable: true,
  get: function get() {
    return _postTitle.default;
  }
});
Object.defineProperty(exports, "PostTrash", {
  enumerable: true,
  get: function get() {
    return _postTrash.default;
  }
});
Object.defineProperty(exports, "PostTrashCheck", {
  enumerable: true,
  get: function get() {
    return _check12.default;
  }
});
Object.defineProperty(exports, "PostTypeSupportCheck", {
  enumerable: true,
  get: function get() {
    return _postTypeSupportCheck.default;
  }
});
Object.defineProperty(exports, "PostVisibility", {
  enumerable: true,
  get: function get() {
    return _postVisibility.default;
  }
});
Object.defineProperty(exports, "PostVisibilityLabel", {
  enumerable: true,
  get: function get() {
    return _label3.default;
  }
});
Object.defineProperty(exports, "PostVisibilityCheck", {
  enumerable: true,
  get: function get() {
    return _check13.default;
  }
});
Object.defineProperty(exports, "TableOfContents", {
  enumerable: true,
  get: function get() {
    return _tableOfContents.default;
  }
});
Object.defineProperty(exports, "UnsavedChangesWarning", {
  enumerable: true,
  get: function get() {
    return _unsavedChangesWarning.default;
  }
});
Object.defineProperty(exports, "WordCount", {
  enumerable: true,
  get: function get() {
    return _wordCount.default;
  }
});
Object.defineProperty(exports, "EditorProvider", {
  enumerable: true,
  get: function get() {
    return _provider.default;
  }
});

var _autocompleters = require("./autocompleters");

Object.keys(_autocompleters).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _autocompleters[key];
    }
  });
});

var _serverSideRender = _interopRequireDefault(require("./server-side-render"));

var _autosaveMonitor = _interopRequireDefault(require("./autosave-monitor"));

var _documentOutline = _interopRequireDefault(require("./document-outline"));

var _check = _interopRequireDefault(require("./document-outline/check"));

var _visualEditorShortcuts = _interopRequireWildcard(require("./global-keyboard-shortcuts/visual-editor-shortcuts"));

var _textEditorShortcuts = _interopRequireDefault(require("./global-keyboard-shortcuts/text-editor-shortcuts"));

var _redo = _interopRequireDefault(require("./editor-history/redo"));

var _undo = _interopRequireDefault(require("./editor-history/undo"));

var _editorNotices = _interopRequireDefault(require("./editor-notices"));

var _errorBoundary = _interopRequireDefault(require("./error-boundary"));

var _check2 = _interopRequireDefault(require("./page-attributes/check"));

var _order = _interopRequireDefault(require("./page-attributes/order"));

var _parent = _interopRequireDefault(require("./page-attributes/parent"));

var _template = _interopRequireDefault(require("./page-attributes/template"));

var _postAuthor = _interopRequireDefault(require("./post-author"));

var _check3 = _interopRequireDefault(require("./post-author/check"));

var _postComments = _interopRequireDefault(require("./post-comments"));

var _postExcerpt = _interopRequireDefault(require("./post-excerpt"));

var _check4 = _interopRequireDefault(require("./post-excerpt/check"));

var _postFeaturedImage = _interopRequireDefault(require("./post-featured-image"));

var _check5 = _interopRequireDefault(require("./post-featured-image/check"));

var _postFormat = _interopRequireDefault(require("./post-format"));

var _check6 = _interopRequireDefault(require("./post-format/check"));

var _postLastRevision = _interopRequireDefault(require("./post-last-revision"));

var _check7 = _interopRequireDefault(require("./post-last-revision/check"));

var _postLockedModal = _interopRequireDefault(require("./post-locked-modal"));

var _postPendingStatus = _interopRequireDefault(require("./post-pending-status"));

var _check8 = _interopRequireDefault(require("./post-pending-status/check"));

var _postPingbacks = _interopRequireDefault(require("./post-pingbacks"));

var _postPreviewButton = _interopRequireDefault(require("./post-preview-button"));

var _postPublishButton = _interopRequireDefault(require("./post-publish-button"));

var _label = _interopRequireDefault(require("./post-publish-button/label"));

var _postPublishPanel = _interopRequireDefault(require("./post-publish-panel"));

var _postSavedState = _interopRequireDefault(require("./post-saved-state"));

var _postSchedule = _interopRequireDefault(require("./post-schedule"));

var _check9 = _interopRequireDefault(require("./post-schedule/check"));

var _label2 = _interopRequireDefault(require("./post-schedule/label"));

var _postSticky = _interopRequireDefault(require("./post-sticky"));

var _check10 = _interopRequireDefault(require("./post-sticky/check"));

var _postSwitchToDraftButton = _interopRequireDefault(require("./post-switch-to-draft-button"));

var _postTaxonomies = _interopRequireDefault(require("./post-taxonomies"));

var _check11 = _interopRequireDefault(require("./post-taxonomies/check"));

var _postTextEditor = _interopRequireDefault(require("./post-text-editor"));

var _postTitle = _interopRequireDefault(require("./post-title"));

var _postTrash = _interopRequireDefault(require("./post-trash"));

var _check12 = _interopRequireDefault(require("./post-trash/check"));

var _postTypeSupportCheck = _interopRequireDefault(require("./post-type-support-check"));

var _postVisibility = _interopRequireDefault(require("./post-visibility"));

var _label3 = _interopRequireDefault(require("./post-visibility/label"));

var _check13 = _interopRequireDefault(require("./post-visibility/check"));

var _tableOfContents = _interopRequireDefault(require("./table-of-contents"));

var _unsavedChangesWarning = _interopRequireDefault(require("./unsaved-changes-warning"));

var _wordCount = _interopRequireDefault(require("./word-count"));

var _provider = _interopRequireDefault(require("./provider"));

var _deprecated = require("./deprecated");

Object.keys(_deprecated).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _deprecated[key];
    }
  });
});
//# sourceMappingURL=index.js.map