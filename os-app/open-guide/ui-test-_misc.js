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

	describe('LCHGuideCrown', function test_LCHGuideCrown() {

		it('classes OLSKCommonCard', function () {
			browser.assert.hasClass(LCHGuideCrown, 'OLSKCommonCard');
		});

		it('classes OLSKCommonCrownCard', function () {
			browser.assert.hasClass(LCHGuideCrown, 'OLSKCommonCrownCard');
		});
		
	});

});
