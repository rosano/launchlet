const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHVitrine_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('assigns meta:viewport', function () {
		browser.assert.attribute('meta[name=viewport]', 'content', 'width=device-width');
	});

	it('assigns link:apple-touch-icon', function () {
		browser.assert.attribute('link[rel=apple-touch-icon]', 'href', process.env.LCH_TEMP_TOUCH_ICON_URL);
	});

	context('LCHVitrine', function () {
		
		it('classes OLSKCommon', function () {
			browser.assert.hasClass(LCHVitrine, 'OLSKCommon');
		});
	
	});

	context('LCHVitrineIdentityLogo', function () {
		
		it('sets role', function () {
			browser.assert.attribute(LCHVitrineIdentityLogo, 'role', 'presentation');
		});
	
	});

	it('sets LCHPageRecipes', function() {
		browser.assert.deepEqual(browser.evaluate('Array.isArray(window.LCHPageRecipes)'), true);
	});

	context('LCHVitrineBrueghel', function () {
		
		it('sets src', function () {
			browser.assert.attribute(LCHVitrineBrueghel, 'src', require('./controller.js').OLSKControllerRoutes().pop().OLSKRoutePath);
		});
	
	});

});
