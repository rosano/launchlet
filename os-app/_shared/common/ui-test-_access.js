import { deepEqual } from 'assert';

describe('LCHCommon_Access', function testLCHCommon_Access () {

	it('redirects LCHCommonIdentityRedirect', async function() {
		deepEqual((await (await browser.fetch('http://loc.tests' + OLSKTestingCanonicalFor(require('./controller.js').OLSKControllerRoutes().LCHCommonIdentityRedirect.OLSKRoutePath))).text()).slice(0, 10), '<?xml vers');
	});

	it('redirects LCHCommonLogoRedirect', async function() {
		deepEqual((await (await browser.fetch('http://loc.tests' + OLSKTestingCanonicalFor(require('./controller.js').OLSKControllerRoutes().LCHCommonLogoRedirect.OLSKRoutePath))).text()).slice(0, 10), '<?xml vers');
	});

});
