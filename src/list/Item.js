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
	var Surface = require('famous/core/Surface');
	var Base = require('../Base');
	var LayoutUtility = require('famous-flex/LayoutUtility');
	var LayoutDockHelper = require('famous-flex/helpers/LayoutDockHelper');

	//
	// Bling.List.Item
	//
	function Item(options) {
		Base.call(this, LayoutUtility.combineOptions(Item.defaults, options));
		this.setLayout(ItemLayout);

		var back = this.back; // create back
		this.accessory = Item.defaults.factory.accessory(this.options.accessoryType || Item.defaults.accessoryType);
	};
	Item.prototype = Object.create(Base.prototype);
    Item.prototype.constructor = Item;

    //
    // Accessory types
    //
    Item.AccessoryType = {
		NONE: 0,
		CHEVRON: 1,
		CHECK: 2,
		CUSTOM: 100
	};

	//
	// Item default and surface creation factory
	//
	Item.defaults = {
		margins: [5, 10, 5, 10],
		size: [undefined, 50],
		accessoryType: Item.AccessoryType.NONE,
		factory: {
			back: function() {
				return new Surface({
					classes: ['bl-list-item-back']
				});
			},
			text: function() {
				return new Surface({
					size: [undefined, 18],
					classes: ['bl-list-item-text']
				});
			},
			detail: function() {
				return new Surface({
					size: [undefined, 11],
					classes: ['bl-list-item-detail']
				});
			},
			accessory: function(accessoryType) {
				switch (accessoryType) {
					case Item.AccessoryType.CHEVRON:
						return new Surface({
							size: [24, 24],
							classes: ['icon', 'ion-chevron-right'],
						});
					case Item.AccessoryType.CHECK:
						return new Surface({
							size: [24, 24],
							classes: ['icon', 'ion-checkmark'],
						});
				}
			}
		}
	};

	//
    // Setup property getters and setters
    //
    Base.defineProperty(Item.prototype, 'back', Item.defaults.factory);
    Base.defineProperty(Item.prototype, 'text', Item.defaults.factory);
    Base.defineProperty(Item.prototype, 'detail', Item.defaults.factory);
    Base.defineProperty(Item.prototype, 'accessory');

	//
	// Item layout
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
				translate: [
					(left + size[0]) - accessorySize[0],
					(size[1] - accessorySize[1]) / 2,
					1
				]
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
				translate: [
					left,
					(top + size[1]) - detailSize[1],
					1
				]
			});
			size[1] -= detailSize[1];
        }

        // text
        var text = context.get('text');
        if (text) {
			var textSize = context.resolveSize(text, size);
			context.set(text, {
				size: textSize,
				translate: [
					left,
					top + ((size[1] - textSize[1]) / 2),
					1
				]
			});
        }
	}

	/**
     * Return size of contained element.
     *
     * @method getSize
     * @return {Array.Number} [width, height]
     */
    /*Item.prototype.getSize = function() {
		return this.options.size || Item.defaults.size;
    };*/

	return Item;
});
