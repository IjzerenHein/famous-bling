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
    require('ionicons/css/ionicons.css');
    //</webpack>

    // Fast-click
    var FastClick = require('fastclick/lib/fastclick');
    FastClick.attach(document.body);

    // import dependencies
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var ViewSequence = require('famous/core/ViewSequence');
    var ScrollView = require('famous-flex/ScrollView');
    var Bling = require('../../src/Bling');

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
    var listItem;

    function _add(listItem) {
        viewSequence.push(listItem);
        //listItem.pipe(scrollView);
    }

    //
    // Add list items
    //)
    listItem = new Bling.List.Item({ accessoryType: Bling.List.Item.AccessoryType.CHEVRON });
    listItem.text.setContent('text + chevron');
    listItem.on('click', function() {
        listItem.detail.setContent('this is a detailed description');
    }.bind(listItem));
    _add(listItem)

    listItem = new Bling.List.Item({ accessoryType: Bling.List.Item.AccessoryType.CHECK });
    listItem.text.setContent('text + checkmark');
    listItem.detail.setContent('this is a detailed description');
    listItem.on('click', function() {
        listItem.setOptions({size: [undefined, 100]});
    }.bind(listItem));
    _add(listItem)

    listItem = new Bling.List.Item();
    listItem.text.setContent('text + custom accessory');
    listItem.accessory = new Surface({
        size: [30, undefined],
    });
    _add(listItem)

    for (var i = 0; i < 1; i++) {
        listItem = new Bling.List.Item({ accessoryType: Bling.List.Item.AccessoryType.CHECK });
        listItem.text.setContent('text + checkmark');
        _add(listItem)
    }
});
