const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	LCHComposeMaster: '.LCHComposeMaster',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHComposeMaster_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows LCHComposeMaster', function () {
		browser.assert.elements(LCHComposeMaster, 1);
	});

	it('shows OLSKMasterList', function () {
		browser.assert.elements('.OLSKMasterList', 1);
	});

	it('hides LCHComposeMasterListItem', function () {
		browser.assert.elements('.LCHComposeMasterListItem', 0);
	});

	context('LCHComposeMasterListItems', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeMasterListItems: JSON.stringify([{
					LCHDocumentName: 'alfa',
				}]),
			});
		});

		it('shows LCHComposeMasterListItem', function () {
			browser.assert.elements('.LCHComposeMasterListItem', 1);
		});
		
	});

});
