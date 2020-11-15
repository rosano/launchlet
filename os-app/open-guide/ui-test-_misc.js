const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHGuide_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute)
	});

	it('assigns meta:viewport', function () {
		browser.assert.attribute('meta[name=viewport]', 'content', 'width=device-width');
	});

	it('assigns link:apple-touch-icon', function () {
		browser.assert.attribute('link[rel=apple-touch-icon]', 'href', process.env.LCH_TEMP_TOUCH_ICON_URL);
	});

	context('LCHGuide', function () {
		
		it('classes OLSKCommon', function () {
			browser.assert.hasClass(LCHGuide, 'OLSKCommon')
		});
	
	});

});
