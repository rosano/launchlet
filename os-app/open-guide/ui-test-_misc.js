const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHGuide_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute)
	});

	context('LCHGuide', function () {
		
		it('classes OLSKCommon', function () {
			browser.assert.hasClass(LCHGuide, 'OLSKCommon')
		});

		it('classes OLSKCommonCapped', function () {
			browser.assert.hasClass(LCHGuide, 'OLSKCommonCapped')
		});
	
	});

	describe('LCHGuideIdentity', function test_LCHGuideIdentity() {

		it('classes OLSKCommonCard', function () {
			browser.assert.hasClass(LCHGuideIdentity, 'OLSKCommonCard');
		});

		it('classes OLSKCommonCrownCard', function () {
			browser.assert.hasClass(LCHGuideIdentity, 'OLSKCommonCrownCard');
		});
		
	});

});
