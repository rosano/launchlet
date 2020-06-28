const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHComposeMasterListItem: '.LCHComposeMasterListItem',
	
	LCHComposeMasterListItemFlaggedAlert: '.LCHComposeMasterListItemFlaggedAlert',
	
	LCHComposeMasterListItemTitle: '.LCHComposeMasterListItemTitle',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHComposeMasterListItem_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHComposeMasterListItemTitle: 'bravo',
		});
	});

	it('shows LCHComposeMasterListItem', function () {
		browser.assert.elements(LCHComposeMasterListItem, 1);
	});

	it('hides LCHComposeMasterListItemFlaggedAlert', function () {
		browser.assert.elements(LCHComposeMasterListItemFlaggedAlert, 0);
	});

	it('shows LCHComposeMasterListItemTitle', function () {
		browser.assert.elements(LCHComposeMasterListItemTitle, 1);
	});

	context('LCHComposeMasterListItemFlagged', function () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeMasterListItemTitle: 'bravo',
				LCHComposeMasterListItemFlagged: true,
			});
		});

		it('shows LCHComposeMasterListItemFlaggedAlert', function () {
			browser.assert.elements(LCHComposeMasterListItemFlaggedAlert, 1);
		});

	});

});
