const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLaunchxrResultItem_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHLaunchxrResultItemObject: JSON.stringify({
				LCHRecipeName: 'alfa',
			}),
		});
	});

	describe('LCHLaunchxrResultItemTitle', function test_LCHLaunchxrResultItemTitle () {
		
		it('sets aria-hidden', function () {
			browser.assert.attribute(LCHLaunchxrResultItemTitle, 'aria-hidden', 'true');
		});

		it('sets text', function () {
			browser.assert.text(LCHLaunchxrResultItemTitle, 'alfa');
		});
	
	});

});
