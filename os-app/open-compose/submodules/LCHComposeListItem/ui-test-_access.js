const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHComposeListItem: '.LCHComposeListItem',
	
	LCHComposeListItemFlaggedAlert: '.LCHComposeListItemFlaggedAlert',
	
	LCHComposeListItemTitle: '.LCHComposeListItemTitle',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHComposeListItem_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHComposeListItem: JSON.stringify(StubDocumentObjectValid()),
		});
	});

	it('shows LCHComposeListItem', function () {
		browser.assert.elements(LCHComposeListItem, 1);
	});

	it('hides LCHComposeListItemFlaggedAlert', function () {
		browser.assert.elements(LCHComposeListItemFlaggedAlert, 0);
	});

	it('shows LCHComposeListItemTitle', function () {
		browser.assert.elements(LCHComposeListItemTitle, 1);
	});

	context('LCHComposeListItemFlagged', function () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeListItem: JSON.stringify(StubDocumentObjectValid({
					LCHDocumentIsFlagged: true,
				})),
			});
		});

		it('shows LCHComposeListItemFlaggedAlert', function () {
			browser.assert.elements(LCHComposeListItemFlaggedAlert, 1);
		});

	});

});
