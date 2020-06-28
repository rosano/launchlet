const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHComposeMasterListItem_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHComposeMasterListItemTitle: 'bravo',
		});
	});

	describe('LCHComposeMasterListItemTitle', function test_LCHComposeMasterListItemTitle () {
		
		it('sets aria-hidden', function () {
			browser.assert.attribute(LCHComposeMasterListItemTitle, 'aria-hidden', 'true');
		});

		it('binds LCHComposeMasterListItemTitle', function () {
			browser.assert.text(LCHComposeMasterListItemTitle, 'bravo');
		});
	
	});

	context('LCHComposeMasterListItemFlagged', function () {

		before(function () {
			browser.assert.hasNoClass(LCHComposeMasterListItem, 'LCHComposeMasterListItemFlagged');
		});

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeMasterListItemTitle: 'bravo',
				LCHComposeMasterListItemFlagged: true,
			});
		});

		it('classes LCHComposeMasterListItemFlagged', function () {
			browser.assert.hasClass(LCHComposeMasterListItem, 'LCHComposeMasterListItemFlagged');
		});
	
	});

});
