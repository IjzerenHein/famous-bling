/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2014
 */

/*global define, Please, console*/
/*eslint no-console:0 no-use-before-define:0*/

define(function(require) {

    //<webpack>
    require('famous-polyfills');
    require('famous/core/famous.css');
    require('./styles.css');
    require('./index.html');
    require('../../bower_components/ionicons/css/ionicons.css');
    //</webpack>

    // Fast-click
    var FastClick = require('fastclick/lib/fastclick');
    FastClick.attach(document.body);

    // import dependencies
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var ViewSequence = require('famous/core/ViewSequence');
    var LayoutController = require('famous-flex/LayoutController');
    var LayoutDockHelper = require('famous-flex/helpers/LayoutDockHelper');
    var ScrollView = require('famous-flex/ScrollView');
    //var Bling = require('../../src/bling');

    //
    // Create main scroll-view
    //
    var mainContext = Engine.createContext();
    var viewSequence = new ViewSequence();
    var scrollView = new ScrollView({
        dataSource: viewSequence,
        mouseMove: true,
        useContainer: true
    });
    mainContext.add(scrollView);

    function ListItemLayout(context, options) {
        var size = context.size;
        var dock = new LayoutDockHelper(context, options);
        dock.fill('back');
        dock.margins([5, 10]);
        var accessory = context.get('accessory');
        if (accessory) {
            var accessorySize = context.resolveSize(accessory, size);
            dock.right(accessory, accessorySize[0], 1);
            dock.right(undefined, 10);
        }
        dock.fill('text', 1);
    }

    function _createListItem(options) {
        var lc = new LayoutController({
            size: options ? options.size : undefined,
            layout: ListItemLayout,
            layoutOptions: options,
            dataSource: {
                text: new Surface({
                    classes: ['bl-list-item-text'],
                    content: options.text
                }),
                back: new Surface({
                    classes: ['bl-list-item-back']
                }),
                accessory: new Surface({
                    classes: ['icon', 'ion-chevron-right'],
                    size: [30, undefined]
                })
            }
        });
        //lc._dataSource.back.pipe(scrollView);
        //lc._dataSource.text.pipe(scrollView);
        //lc._dataSource.accessory.pipe(scrollView);
        return lc;
    }

    //
    // Add list items
    //
    viewSequence.push(_createListItem({
        text: 'simple list item',
        size: [undefined, 50]
    }));
    /*viewSequence.push(Bling.list.item({
        text: 'simple list item',
        size: [undefined, 50]
    }));*/

});
