import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { filter, every, map, some } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';
import { mediaUpload } from '@wordpress/editor';
import { createBlobURL } from '@wordpress/blob';
/**
 * Internal dependencies
 */

import { default as edit, defaultColumnsNumber, pickRelevantMediaFiles } from './edit';
import icon from './icon';
var blockAttributes = {
  images: {
    type: 'array',
    default: [],
    source: 'query',
    selector: 'ul.wp-block-gallery .blocks-gallery-item',
    query: {
      url: {
        source: 'attribute',
        selector: 'img',
        attribute: 'src'
      },
      link: {
        source: 'attribute',
        selector: 'img',
        attribute: 'data-link'
      },
      alt: {
        source: 'attribute',
        selector: 'img',
        attribute: 'alt',
        default: ''
      },
      id: {
        source: 'attribute',
        selector: 'img',
        attribute: 'data-id'
      },
      caption: {
        type: 'string',
        source: 'html',
        selector: 'figcaption'
      }
    }
  },
  ids: {
    type: 'array',
    default: []
  },
  columns: {
    type: 'number'
  },
  imageCrop: {
    type: 'boolean',
    default: true
  },
  linkTo: {
    type: 'string',
    default: 'none'
  }
};
export var name = 'core/gallery';

var parseShortcodeIds = function parseShortcodeIds(ids) {
  if (!ids) {
    return [];
  }

  return ids.split(',').map(function (id) {
    return parseInt(id, 10);
  });
};

export var settings = {
  title: __('Gallery'),
  description: __('Display multiple images in a rich gallery.'),
  icon: icon,
  category: 'common',
  keywords: [__('images'), __('photos')],
  attributes: blockAttributes,
  supports: {
    align: true
  },
  transforms: {
    from: [{
      type: 'block',
      isMultiBlock: true,
      blocks: ['core/image'],
      transform: function transform(attributes) {
        // Init the align attribute from the first item which may be either the placeholder or an image.
        var align = attributes[0].align; // Loop through all the images and check if they have the same align.

        align = every(attributes, ['align', align]) ? align : undefined;
        var validImages = filter(attributes, function (_ref) {
          var id = _ref.id,
              url = _ref.url;
          return id && url;
        });
        return createBlock('core/gallery', {
          images: validImages.map(function (_ref2) {
            var id = _ref2.id,
                url = _ref2.url,
                alt = _ref2.alt,
                caption = _ref2.caption;
            return {
              id: id,
              url: url,
              alt: alt,
              caption: caption
            };
          }),
          ids: validImages.map(function (_ref3) {
            var id = _ref3.id;
            return id;
          }),
          align: align
        });
      }
    }, {
      type: 'shortcode',
      tag: 'gallery',
      attributes: {
        images: {
          type: 'array',
          shortcode: function shortcode(_ref4) {
            var ids = _ref4.named.ids;
            return parseShortcodeIds(ids).map(function (id) {
              return {
                id: id
              };
            });
          }
        },
        ids: {
          type: 'array',
          shortcode: function shortcode(_ref5) {
            var ids = _ref5.named.ids;
            return parseShortcodeIds(ids);
          }
        },
        columns: {
          type: 'number',
          shortcode: function shortcode(_ref6) {
            var _ref6$named$columns = _ref6.named.columns,
                columns = _ref6$named$columns === void 0 ? '3' : _ref6$named$columns;
            return parseInt(columns, 10);
          }
        },
        linkTo: {
          type: 'string',
          shortcode: function shortcode(_ref7) {
            var _ref7$named$link = _ref7.named.link,
                link = _ref7$named$link === void 0 ? 'attachment' : _ref7$named$link;
            return link === 'file' ? 'media' : link;
          }
        }
      }
    }, {
      // When created by drag and dropping multiple files on an insertion point
      type: 'files',
      isMatch: function isMatch(files) {
        return files.length !== 1 && every(files, function (file) {
          return file.type.indexOf('image/') === 0;
        });
      },
      transform: function transform(files, onChange) {
        var block = createBlock('core/gallery', {
          images: files.map(function (file) {
            return pickRelevantMediaFiles({
              url: createBlobURL(file)
            });
          })
        });
        mediaUpload({
          filesList: files,
          onFileChange: function onFileChange(images) {
            var imagesAttr = images.map(pickRelevantMediaFiles);
            onChange(block.clientId, {
              ids: map(imagesAttr, 'id'),
              images: imagesAttr
            });
          },
          allowedTypes: ['image']
        });
        return block;
      }
    }],
    to: [{
      type: 'block',
      blocks: ['core/image'],
      transform: function transform(_ref8) {
        var images = _ref8.images,
            align = _ref8.align;

        if (images.length > 0) {
          return images.map(function (_ref9) {
            var id = _ref9.id,
                url = _ref9.url,
                alt = _ref9.alt,
                caption = _ref9.caption;
            return createBlock('core/image', {
              id: id,
              url: url,
              alt: alt,
              caption: caption,
              align: align
            });
          });
        }

        return createBlock('core/image', {
          align: align
        });
      }
    }]
  },
  edit: edit,
  save: function save(_ref10) {
    var attributes = _ref10.attributes;
    var images = attributes.images,
        _attributes$columns = attributes.columns,
        columns = _attributes$columns === void 0 ? defaultColumnsNumber(attributes) : _attributes$columns,
        imageCrop = attributes.imageCrop,
        linkTo = attributes.linkTo;
    return createElement("ul", {
      className: "columns-".concat(columns, " ").concat(imageCrop ? 'is-cropped' : '')
    }, images.map(function (image) {
      var href;

      switch (linkTo) {
        case 'media':
          href = image.url;
          break;

        case 'attachment':
          href = image.link;
          break;
      }

      var img = createElement("img", {
        src: image.url,
        alt: image.alt,
        "data-id": image.id,
        "data-link": image.link,
        className: image.id ? "wp-image-".concat(image.id) : null
      });
      return createElement("li", {
        key: image.id || image.url,
        className: "blocks-gallery-item"
      }, createElement("figure", null, href ? createElement("a", {
        href: href
      }, img) : img, image.caption && image.caption.length > 0 && createElement(RichText.Content, {
        tagName: "figcaption",
        value: image.caption
      })));
    }));
  },
  deprecated: [{
    attributes: blockAttributes,
    isEligible: function isEligible(_ref11) {
      var images = _ref11.images,
          ids = _ref11.ids;
      return images && images.length > 0 && (!ids && images || ids && images && ids.length !== images.length || some(images, function (id, index) {
        if (!id && ids[index] !== null) {
          return true;
        }

        return parseInt(id, 10) !== ids[index];
      }));
    },
    migrate: function migrate(attributes) {
      return _objectSpread({}, attributes, {
        ids: map(attributes.images, function (_ref12) {
          var id = _ref12.id;

          if (!id) {
            return null;
          }

          return parseInt(id, 10);
        })
      });
    },
    save: function save(_ref13) {
      var attributes = _ref13.attributes;
      var images = attributes.images,
          _attributes$columns2 = attributes.columns,
          columns = _attributes$columns2 === void 0 ? defaultColumnsNumber(attributes) : _attributes$columns2,
          imageCrop = attributes.imageCrop,
          linkTo = attributes.linkTo;
      return createElement("ul", {
        className: "columns-".concat(columns, " ").concat(imageCrop ? 'is-cropped' : '')
      }, images.map(function (image) {
        var href;

        switch (linkTo) {
          case 'media':
            href = image.url;
            break;

          case 'attachment':
            href = image.link;
            break;
        }

        var img = createElement("img", {
          src: image.url,
          alt: image.alt,
          "data-id": image.id,
          "data-link": image.link,
          className: image.id ? "wp-image-".concat(image.id) : null
        });
        return createElement("li", {
          key: image.id || image.url,
          className: "blocks-gallery-item"
        }, createElement("figure", null, href ? createElement("a", {
          href: href
        }, img) : img, image.caption && image.caption.length > 0 && createElement(RichText.Content, {
          tagName: "figcaption",
          value: image.caption
        })));
      }));
    }
  }, {
    attributes: blockAttributes,
    save: function save(_ref14) {
      var attributes = _ref14.attributes;
      var images = attributes.images,
          _attributes$columns3 = attributes.columns,
          columns = _attributes$columns3 === void 0 ? defaultColumnsNumber(attributes) : _attributes$columns3,
          imageCrop = attributes.imageCrop,
          linkTo = attributes.linkTo;
      return createElement("ul", {
        className: "columns-".concat(columns, " ").concat(imageCrop ? 'is-cropped' : '')
      }, images.map(function (image) {
        var href;

        switch (linkTo) {
          case 'media':
            href = image.url;
            break;

          case 'attachment':
            href = image.link;
            break;
        }

        var img = createElement("img", {
          src: image.url,
          alt: image.alt,
          "data-id": image.id,
          "data-link": image.link
        });
        return createElement("li", {
          key: image.id || image.url,
          className: "blocks-gallery-item"
        }, createElement("figure", null, href ? createElement("a", {
          href: href
        }, img) : img, image.caption && image.caption.length > 0 && createElement(RichText.Content, {
          tagName: "figcaption",
          value: image.caption
        })));
      }));
    }
  }, {
    attributes: _objectSpread({}, blockAttributes, {
      images: _objectSpread({}, blockAttributes.images, {
        selector: 'div.wp-block-gallery figure.blocks-gallery-image img'
      }),
      align: {
        type: 'string',
        default: 'none'
      }
    }),
    save: function save(_ref15) {
      var attributes = _ref15.attributes;
      var images = attributes.images,
          _attributes$columns4 = attributes.columns,
          columns = _attributes$columns4 === void 0 ? defaultColumnsNumber(attributes) : _attributes$columns4,
          align = attributes.align,
          imageCrop = attributes.imageCrop,
          linkTo = attributes.linkTo;
      return createElement("div", {
        className: "align".concat(align, " columns-").concat(columns, " ").concat(imageCrop ? 'is-cropped' : '')
      }, images.map(function (image) {
        var href;

        switch (linkTo) {
          case 'media':
            href = image.url;
            break;

          case 'attachment':
            href = image.link;
            break;
        }

        var img = createElement("img", {
          src: image.url,
          alt: image.alt,
          "data-id": image.id
        });
        return createElement("figure", {
          key: image.id || image.url,
          className: "blocks-gallery-image"
        }, href ? createElement("a", {
          href: href
        }, img) : img);
      }));
    }
  }]
};
//# sourceMappingURL=index.js.map