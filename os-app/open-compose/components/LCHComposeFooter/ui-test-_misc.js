import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe.skip('LCHComposeFooterMisc', function () {

describe('LCHComposeFooterStorageButton', function testLCHComposeFooterStorageButton () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	before(function () {
		browser.assert.text('#TestLCHComposeFootetDispatchStorage', '0')

		browser.click(LCHComposeFooterStorageButton)
	});
	
	it('sends LCHComposeFootetDispatchStorage', function () {
		browser.assert.text('#TestLCHComposeFootetDispatchStorage', '1')
	});

});

});
