const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHGuide_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute)
	});

	context('LCHGuide', function () {
		
		it('classes OLSKDecor', function () {
			browser.assert.hasClass(LCHGuide, 'OLSKDecor')
		});

		it('classes OLSKDecorCapped', function () {
			browser.assert.hasClass(LCHGuide, 'OLSKDecorCapped')
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
