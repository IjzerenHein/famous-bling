/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2014
 */

/*global define*/
/*eslint no-use-before-define:0*/

define(function(require) {

	// import dependencies
	var Base = require('../Base');
	var LayoutUtility = require('famous-flex/LayoutUtility');

	//
	// Bling.List.Item
	//
	function Item(options) {
		Base.call(this, LayoutUtility.combineOptions(Item.defaults, options));

		// create back out of the box
		var back = this.back;

		// create accessory when specified
		this.accessoryType = this.options.accessoryType;
	};
	Item.prototype = Object.create(Base.prototype);
    Item.prototype.constructor = Item;

     //
    // Accessory types
    //
    Item.AccessoryType = {
		NONE: '',
		CHEVRON: 'chevron',
		CHECK: 'check',
		CUSTOM: 'custom'
	};

	//
	// Item default and surface creation factory
	//
	Item.defaults = {
		layout: ItemLayout,
		size: [undefined, 50],
		margins: [5, 10, 5, 10],
		back: {
			classes: ['bl-list-item-back'],
		},
		text: {
			size: [undefined, 18],
			classes: ['bl-list-item-text']
		},
		detail: {
			size: [undefined, 11],
			classes: ['bl-list-item-detail']
		},
		accessoryType: Item.AccessoryType.NONE,
		accessory: {
			chevron: {
				size: [24, 24],
				classes: ['icon', 'ion-chevron-right'],
			},
			check: {
				size: [24, 24],
				classes: ['icon', 'ion-checkmark'],
			}
		}
	};

	//
    // Renderables
    //
    Base.defineRenderNode(Item.prototype, 'back', true);
    Base.defineRenderNode(Item.prototype, 'text', true);
    Base.defineRenderNode(Item.prototype, 'detail', true);

    //
    // Accessory & type
    //
    Object.defineProperty(Item.prototype, 'accessory', {
		get: function() {
			return this._dataSource.accessory;
		},
		set: function(val) {
			this.setOptions({ accessoryType: val ? Item.AccessoryType.CUSTOM : Item.AccessoryType.NONE });
			this._dataSource.accessory = val;
			this.reflowLayout();
		}
	});
    Object.defineProperty(Item.prototype, 'accessoryType', {
		get: function() {
			return this.options.accessoryType;
		},
		set: function(val) {
			this.setOptions({ accessoryType: val });
			if (val === Item.AccessoryType.NONE) {
				this._dataSource.accessory = undefined;
			}
			else {
				this._dataSource.accessory = this.options.createRenderNode.call(this, 'accessory', val);
			}
			this.reflowLayout();
		}
	});

	//
	// Layout
	//
	function ItemLayout(context, options) {

		// background
		context.set('back', {
			size: context.size,
		});

		// prepare
		var margins = options.margins || Item.defaults.margins;
		var size = [
			context.size[0] - (margins[1] + margins[3]),
			context.size[1]
		];
		var left = margins[3];
		var top = 0;

		// accessory
		var accessory = context.get('accessory');
        if (accessory) {
			var accessorySize = context.resolveSize(accessory, size);
			context.set(accessory, {
				size: accessorySize,
				translate: [(left + size[0]) - accessorySize[0], (size[1] - accessorySize[1]) / 2, 1]
			});
			size[0] -= (accessorySize[0] + margins[1]);
        }

        // detail
        top += margins[0];
        size[1] -= (margins[0] + margins[1]); // top/bottom margins
        var detail = context.get('detail');
        if (detail) {
			var detailSize = context.resolveSize(detail, size);
			context.set(detail, {
				size: detailSize,
				translate: [left, (top + size[1]) - detailSize[1], 1]
			});
			size[1] -= detailSize[1];
        }

        // text
        var text = context.get('text');
        if (text) {
			var textSize = context.resolveSize(text, size);
			context.set(text, {
				size: textSize,
				translate: [left, top + ((size[1] - textSize[1]) / 2), 1]
			});
        }
	}

	return Item;
});
