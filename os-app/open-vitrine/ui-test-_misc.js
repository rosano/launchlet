const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHVitrine_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('sets LCHPageRecipes', function() {
		browser.assert.deepEqual(browser.evaluate('Array.isArray(window.LCHPageRecipes)'), true);
	});

	describe('LCHVitrineCrown', function test_LCHVitrineCrown() {

		it('classes OLSKCommonCard', function () {
			browser.assert.hasClass(LCHVitrineCrown, 'OLSKCommonCard');
		});

		it('classes OLSKCommonCrownCard', function () {
			browser.assert.hasClass(LCHVitrineCrown, 'OLSKCommonCrownCard');
		});
		
	});

	describe('LCHVitrineCrownIcon', function () {

		it('sets role', function () {
			browser.assert.attribute(LCHVitrineCrownIcon, 'role', 'presentation');
		});

		it('sets src', function () {
			browser.assert.attribute(LCHVitrineCrownIcon, 'src', '/_shared/LCHRootLink/ui-assets/identity.svg');
		});

	});

	describe('LCHVitrineVideo1', function () {

		it('sets src', function () {
			browser.assert.attribute(LCHVitrineVideo1, 'src', process.env.LCH_VITRINE_VIDEO_URL_1);
		});

	});

	describe('LCHVitrineVideo2', function () {

		it('sets src', function () {
			browser.assert.attribute(LCHVitrineVideo2, 'src', process.env.LCH_VITRINE_VIDEO_URL_2);
		});

	});

	context('LCHVitrineBrueghel', function () {
		
		it('sets src', function () {
			browser.assert.attribute(LCHVitrineBrueghel, 'src', require('./controller.js').OLSKControllerRoutes().pop().OLSKRoutePath);
		});
	
	});

});
