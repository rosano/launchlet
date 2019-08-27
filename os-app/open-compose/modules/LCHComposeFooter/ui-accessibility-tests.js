import { deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = require('../../controller.js').OLSKControllerRoutes().LCHComposeRoute.OLSKRoutePath;

Object.entries({
	OLSKReloadButton: '.OLSKReloadButton',

	RCSLanguageSwitcher: '#RCSLanguageSwitcher',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHComposeFooterUIAccessibility', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(OLSKReloadButton, 1);
		
		browser.assert.elements(RCSLanguageSwitcher, 1);
	});

});
