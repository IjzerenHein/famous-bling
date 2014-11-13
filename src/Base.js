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
	var LayoutUtility = require('famous-flex/LayoutUtility');
	var LayoutController = require('famous-flex/LayoutController');

	//
	// Base class for bling items.
	//
	function Base(options) {
		LayoutController.call(this, LayoutUtility.combineOptions(Base.defaults, options));
		this.setDataSource({});
	};
	Base.prototype = Object.create(LayoutController.prototype);
    Base.prototype.constructor = Base;

    //
    // Setup property getters and setters
    //
    Base.defineRenderNode = function(prototype, prop, autoCreate) {
		Object.defineProperty(prototype, prop, {
			get: function() {
				if (!this._dataSource[prop] && autoCreate) {
					this._dataSource[prop] = this.options.createRenderNode.call(this, prop);
					this._dataSource[prop].pipe(this._eventOutput);
					this.reflowLayout();
				}
				return this._dataSource[prop];
			},
			set: function(val) {
				this._dataSource[prop] = val;
				if (val) {
					this._dataSource[prop].pipe(this._eventOutput);
				}
				this.reflowLayout();
			}
		});
    }

    Base.createRenderNode = function(prop, subProp) {
		var options = subProp ? this.options[prop][subProp] : this.options[prop];
		return new Surface(options);
    }

	//
	// Item default and surface creation factory
	//
	Base.defaults = {
		flow: true,
		insertSpec: {opacity: 0},
		removeSpec: {opacity: 0},
		size: [undefined, undefined],
		createRenderNode: Base.createRenderNode
	};

	/**
     * Return size of contained element.
     *
     * @method getSize
     * @return {Array.Number} [width, height]
     */
    Base.prototype.getSize = function() {
		return this.options.size || Base.defaults.size;
    };

	return Base;
});
