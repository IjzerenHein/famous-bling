famous-bling
============

View templates (with animations) to jumpstart your project or for production use.

**THIS PROJECT IS UNDER CONSTRUCTION**


## Getting started

Install using bower or npm:

	bower install famous-bling

	npm install famous-bling

Create a Bling List Item:

```javascript
var Bling = require('famous-bling/src/Bling');

// create a list-item containing a text, detail-text and a right chevron icon
var listItem = new Bling.List.Item();
listItem.accessoryType = 'chevron'; // Bling.List.Item.AccessoryType.CHEVRON;
listItem.text.setContent('this is the text');
listItem.detail.setContent('this is the detail text');
viewSequence.push(listItem); // add to scrollview sequence
```

## Contribute

If you like this project and want to support it, show some love
and give it a star.


## Contact
- 	@IjzerenHein
- 	http://www.gloey.nl
- 	hrutjes@gmail.com

© 2014 - Hein Rutjes