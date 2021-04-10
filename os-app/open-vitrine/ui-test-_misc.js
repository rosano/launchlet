const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHVitrine_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('sets manifest', function () {
		browser.assert.attribute('link[rel="manifest"]', 'href', require('../tech-manifest/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath);
	});

	it('sets LCHPageRecipes', function() {
		browser.assert.deepEqual(browser.evaluate('Array.isArray(window.LCHPageRecipes)'), true);
	});

	describe('OLSKCrown', function test_OLSKCrown () {

		it('sets OLSKCrownCardImageURL', function () {
			browser.assert.attribute('.OLSKCrownCardImage', 'src', '/_shared/LCHRootLink/ui-assets/identity.svg');
		});
	
	});

	context('OLSKAppFeaturesList', function test_OLSKAppFeaturesList () {

		it('shows OLSKAppFeatureOpenSource', function () {
			browser.assert.attribute('.OLSKAppFeatureListItemOpenSource a', 'href', process.env.OLSK_REPO_URL);
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

	describe('LCHVitrineVideo3', function () {

		it('sets src', function () {
			browser.assert.attribute(LCHVitrineVideo3, 'src', process.env.LCH_VITRINE_VIDEO_URL_3);
		});

		it('sets allowfullscreen', function () {
			browser.assert.attribute(LCHVitrineVideo3, 'allowfullscreen', '');
		});

	});

	describe('LCHVitrineVideo4', function () {

		it('sets src', function () {
			browser.assert.attribute(LCHVitrineVideo4, 'src', process.env.LCH_VITRINE_VIDEO_URL_4);
		});

		it('sets allowfullscreen', function () {
			browser.assert.attribute(LCHVitrineVideo4, 'allowfullscreen', '');
		});

	});

	describe('LCHVitrineTutorialsButton', function test_LCHVitrineTutorialsButton () {

		it('classes OLSKDecorPress', function () {
			browser.assert.hasClass(LCHVitrineTutorialsButton, 'OLSKDecorPress');
		});
		
		it('classes OLSKDecorPressCall', function () {
			browser.assert.hasClass(LCHVitrineTutorialsButton, 'OLSKDecorPressCall');
		});
		
		it('sets href', function () {
			browser.assert.attribute(LCHVitrineTutorialsButton, 'href', process.env.LCH_VITRINE_TUTORIALS_URL);
		});
	
	});

	describe('OLSKGazette', function test_OLSKGazette () {

		it('sets src', function () {
			browser.assert.attribute('.OLSKGazetteProjectField', 'value', 'RP_001');
		});

	});

	context('LCHVitrineBrueghel', function () {
		
		it('sets src', function () {
			browser.assert.attribute(LCHVitrineBrueghel, 'src', require('./controller.js').OLSKControllerRoutes().pop().OLSKRoutePath);
		});
	
	});

});
