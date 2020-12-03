const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHVitrine_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('sets LCHPageRecipes', function() {
		browser.assert.deepEqual(browser.evaluate('Array.isArray(window.LCHPageRecipes)'), true);
	});

	describe('LCHVitrineIdentity', function test_LCHVitrineIdentity() {

		it('classes OLSKCommonCard', function () {
			browser.assert.hasClass(LCHVitrineIdentity, 'OLSKCommonCard');
		});

		it('classes OLSKCommonIdentityCard', function () {
			browser.assert.hasClass(LCHVitrineIdentity, 'OLSKCommonIdentityCard');
		});
		
	});

	describe('LCHVitrineIdentityLogo', function () {

		it('sets role', function () {
			browser.assert.attribute(LCHVitrineIdentityLogo, 'role', 'presentation');
		});

		it('sets src', function () {
			browser.assert.attribute(LCHVitrineIdentityLogo, 'src', '/_shared/LCHRootLink/ui-assets/identity.svg');
		});

	});

	context('LCHVitrineBrueghel', function () {
		
		it('sets src', function () {
			browser.assert.attribute(LCHVitrineBrueghel, 'src', require('./controller.js').OLSKControllerRoutes().pop().OLSKRoutePath);
		});
	
	});

});
