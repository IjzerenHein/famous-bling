famous-bling
============

View templates (with animations) to jumpstart your project or for production use.

**THIS PROJECT IS UNDER CONSTRUCTION**


## Getting started

Install using bower or npm:

	bower install famous-bling

	npm install famous-bling

Create a Bling list item:

```javascript
var Bling = require('famous-bling/src/Bling');

// create a list-item containing a text, detail-text and a right chevron icon
var listItem = new Bling.List.Item();
listItem.accessoryType = 'chevron'; // Bling.List.Item.AccessoryType.CHEVRON;
listItem.text.setContent('this is the text');
listItem.detail.setContent('this is the detail text');
viewSequence.push(listItem); // add to scrollview sequence
```

Customising list items:

```javascript
// setting the defaults for all list items:
var defaults = Bling.List.Item.defaults;
defaults.size = [undefined, 44]; // size of list item
defaults.text.size = [undefined, 18];
defaults.text.classes = ['mytextstyle'];
defaults.back.properties = {
	backgroundColor: '#EEEEEE'
};

// or just customize this list item
var listItem = new Bling.List.Item({
	text: {
		size: [undefined, 20],
		properties: {
			lineHeight: 20;
		}
	},
	back: {
		classes: ['mybackstyle']
	}
});
```

Using your own surfaces/views:

```javascript
var listItem = new Bling.List.Item();

// use custom text surface
listItem.text = new Surface({
	size: [undefined, 24],
	classes: ['mytextclass']
});

// add custom accessory
listItem.accessory = new Surface({
	size: [24, 24],
	classes: ['icon', 'ion-chevron-left'], // use ionic-icon
});
```


## Contribute

If you like this project and want to support it, show some love
and give it a star.


## Contact
- 	@IjzerenHein
- 	http://www.gloey.nl
- 	hrutjes@gmail.com

© 2014 - Hein Rutjes