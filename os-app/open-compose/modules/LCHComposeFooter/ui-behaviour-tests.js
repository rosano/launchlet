import { deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = '/';

Object.entries({
	OLSKReloadButton: '.OLSKReloadButton',

	RCSLanguageSwitcher: '#RCSLanguageSwitcher',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHComposeFooterDiscovery', function testLCHComposeFooterDiscovery() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(OLSKReloadButton, 1);
		
		browser.assert.elements(RCSLanguageSwitcher, 1);
	});

});
