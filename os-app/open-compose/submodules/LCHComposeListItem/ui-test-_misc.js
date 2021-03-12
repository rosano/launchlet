const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const LCHComposeLogic = require('./ui-logic.js').default;

describe('LCHComposeListItem_Misc', function () {

	const item = {
		[uRandomElement('LCHDocumentName', 'LCHDocumentSignature', 'LCHDocumentID')]: Math.random().toString(),
	};

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHComposeListItem: JSON.stringify(item),
		});
	});

	describe('LCHComposeListItem', function test_LCHComposeListItem () {
		
		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(LCHComposeListItem, 'OLSKCommonEdgeBottom');
		});
	
	});

	describe('LCHComposeListItemTitle', function test_LCHComposeListItemTitle () {
		
		it('binds LCHComposeListItemTitle', function () {
			browser.assert.text(LCHComposeListItemTitle, LCHComposeLogic.LCHComposeListItemTitle(item));
		});
	
	});

	context('LCHComposeListItemFlagged', function () {

		before(function () {
			browser.assert.hasNoClass(LCHComposeListItem, 'LCHComposeListItemFlagged');
		});

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeListItem: JSON.stringify(StubDocumentObjectValid({
					LCHDocumentIsFlagged: true,
				})),
			});
		});

		it('classes LCHComposeListItemFlagged', function () {
			browser.assert.hasClass(LCHComposeListItem, 'LCHComposeListItemFlagged');
		});
	
	});

});
