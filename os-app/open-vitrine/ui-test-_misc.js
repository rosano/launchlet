const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHVitrine_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('sets manifest', function () {
		browser.assert.attribute('link[rel="manifest"]', 'href', require('../tech-manifest/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath);
	});

	describe('LCHVitrine', function () {

		it('classes OLSKDecor', function () {
			browser.assert.hasClass(LCHVitrine, 'OLSKDecor');
		});

		it('classes OLSKDecorCapped', function () {
			browser.assert.hasClass(LCHVitrine, 'OLSKDecorCapped');
		});

		it('classes OLSKDecorNoTopPad', function () {
			browser.assert.hasClass(LCHVitrine, 'OLSKDecorNoTopPad');
		});

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

		it('classes OLSKCommonVideoListItemMobile', function () {
			browser.assert.hasClass(LCHVitrineVideo1, 'OLSKCommonVideoListItemMobile');
		});

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

		it('classes OLSKCommonVideoListItemSquare', function () {
			browser.assert.hasClass(LCHVitrineVideo4, 'OLSKCommonVideoListItemSquare');
		});

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

	describe('ROCOGazette', function test_ROCOGazette () {

		it('sets ROCOBulletinProject', function () {
			browser.assert.attribute('.ROCOBulletinProjectField', 'value', process.env.ROCO_SHARED_PROJECT_ID);
		});

	});

	describe('OLSKEdit', function test_OLSKEdit () {

		it('sets OLSKEditURL', function () {
			browser.assert.attribute('.OLSKEdit', 'href', process.env.OLSK_REPO_URL);
		});

	});

	describe('ROCOForum', function test_ROCOForum () {

		it('sets ROCOForumTopic', function () {
			browser.assert.attribute('.ROCOForumList', 'category', process.env.ROCO_FORUM_TOPIC);
		});
	
	});

	context('LCHVitrineBrueghel', function () {
		
		it('sets src', function () {
			browser.assert.attribute(LCHVitrineBrueghel, 'src', require('./controller.js').OLSKControllerRoutes().pop().OLSKRoutePath);
		});
	
	});

});
