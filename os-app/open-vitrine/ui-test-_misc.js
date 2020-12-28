const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHVitrine_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('sets LCHPageRecipes', function() {
		browser.assert.deepEqual(browser.evaluate('Array.isArray(window.LCHPageRecipes)'), true);
	});

	describe('LCHVitrineManifest', function test_LCHVitrineManifest() {

		it('sets href', function () {
			browser.assert.attribute(LCHVitrineManifest, 'href', require('../tech-manifest/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath);
		});

	});

	describe('LCHVitrineCrown', function test_LCHVitrineCrown() {

		it('classes OLSKCommonCard', function () {
			browser.assert.hasClass(LCHVitrineCrown, 'OLSKCommonCard');
		});

		it('classes OLSKCommonCrownCardMini', function () {
			browser.assert.hasClass(LCHVitrineCrown, 'OLSKCommonCrownCardMini');
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

	context('OLSKLanding', function test_OLSKLanding () {

		it('sets OLSKLandingActionHref', function () {
			browser.assert.attribute('.OLSKLandingAction', 'href', OLSKTestingCanonical(require('../open-compose/controller.js').OLSKControllerRoutes().shift()));
		});
	
	});

	context('LCHVitrineGuideButton', function test_LCHVitrineGuideButton () {

		it('classes OLSKDecorPress', function () {
			browser.assert.hasClass(LCHVitrineGuideButton, 'OLSKDecorPress');
		});
		
		it('classes OLSKDecorPressCall', function () {
			browser.assert.hasClass(LCHVitrineGuideButton, 'OLSKDecorPressCall');
		});
		
		it('sets href', function () {
			browser.assert.attribute(LCHVitrineGuideButton, 'href', OLSKTestingCanonical(require('../open-guide/controller.js').OLSKControllerRoutes().shift()));
		});
	
	});

	describe('LCHVitrineVideo1', function () {

		it('sets src', function () {
			browser.assert.attribute(LCHVitrineVideo1, 'src', process.env.LCH_VITRINE_VIDEO_URL_1);
		});

		it('sets allowfullscreen', function () {
			browser.assert.attribute(LCHVitrineVideo1, 'allowfullscreen', '');
		});

	});

	describe('LCHVitrineVideo2', function () {

		it('sets src', function () {
			browser.assert.attribute(LCHVitrineVideo2, 'src', process.env.LCH_VITRINE_VIDEO_URL_2);
		});

		it('sets allowfullscreen', function () {
			browser.assert.attribute(LCHVitrineVideo2, 'allowfullscreen', '');
		});

	});

	context('LCHVitrineBrueghel', function () {
		
		it('sets src', function () {
			browser.assert.attribute(LCHVitrineBrueghel, 'src', require('./controller.js').OLSKControllerRoutes().pop().OLSKRoutePath);
		});
	
	});

});
