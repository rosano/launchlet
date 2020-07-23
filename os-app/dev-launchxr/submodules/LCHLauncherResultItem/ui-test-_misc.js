const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLauncherResultItem_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHLauncherResultItemObject: JSON.stringify({
				LCHRecipeName: 'alfa',
			}),
		});
	});

	describe('LCHLauncherResultItemTitle', function test_LCHLauncherResultItemTitle () {
		
		it('sets aria-hidden', function () {
			browser.assert.attribute(LCHLauncherResultItemTitle, 'aria-hidden', 'true');
		});

		it('sets text', function () {
			browser.assert.text(LCHLauncherResultItemTitle, 'alfa');
		});
	
	});

});
