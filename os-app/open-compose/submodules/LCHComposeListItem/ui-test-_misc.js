const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHComposeListItem_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHComposeListItemTitle: 'bravo',
		});
	});

	describe('LCHComposeListItem', function test_LCHComposeListItem () {
		
		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(LCHComposeListItem, 'OLSKCommonEdgeBottom');
		});
	
	});

	describe('LCHComposeListItemTitle', function test_LCHComposeListItemTitle () {
		
		it('sets aria-hidden', function () {
			browser.assert.attribute(LCHComposeListItemTitle, 'aria-hidden', 'true');
		});

		it('binds LCHComposeListItemTitle', function () {
			browser.assert.text(LCHComposeListItemTitle, 'bravo');
		});
	
	});

	context('LCHComposeListItemFlagged', function () {

		before(function () {
			browser.assert.hasNoClass(LCHComposeListItem, 'LCHComposeListItemFlagged');
		});

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeListItemTitle: 'bravo',
				LCHComposeListItemFlagged: true,
			});
		});

		it('classes LCHComposeListItemFlagged', function () {
			browser.assert.hasClass(LCHComposeListItem, 'LCHComposeListItemFlagged');
		});
	
	});

});
