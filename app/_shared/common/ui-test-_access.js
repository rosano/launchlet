import { deepEqual } from 'assert';

const routes = require('./controller.js').OLSKControllerRoutes();

describe('LCHCommon_Access', function testLCHCommon_Access () {

	it('redirects to logo', async function() {
		deepEqual((await (await browser.fetch('http://loc.tests' + OLSKTestingCanonicalFor(routes.LCHCommonLogoRedirect.OLSKRoutePath))).text()).slice(0, 10), '<?xml vers')
	});

});
