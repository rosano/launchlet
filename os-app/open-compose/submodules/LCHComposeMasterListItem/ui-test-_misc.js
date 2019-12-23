import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHComposeMasterListItem_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHComposeMasterListItemAccessibilitySummary: 'alfa',
			LCHComposeMasterListItemTitle: 'bravo',
		});
	});

	describe('LCHComposeMasterListItem', function test_LCHComposeMasterListItem () {
		
		it('sets aria-label', function () {
			browser.assert.attribute(LCHComposeMasterListItem, 'aria-label', 'alfa');
		});
		
		it('sets role', function () {
			browser.assert.attribute(LCHComposeMasterListItem, 'role', 'button');
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
				LCHComposeMasterListItemAccessibilitySummary: 'alfa',
				LCHComposeMasterListItemTitle: 'bravo',
				LCHComposeMasterListItemFlagged: true,
			});
		});

		it('classes LCHComposeMasterListItemFlagged', function () {
			browser.assert.hasClass(LCHComposeMasterListItem, 'LCHComposeMasterListItemFlagged');
		});
	
	});

});
