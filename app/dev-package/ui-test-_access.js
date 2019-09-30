import { deepEqual } from 'assert';

const routes = require('./controller.js').OLSKControllerRoutes();

describe('LCHPackage_Access', function testLCHPackage_AccessPipe () {

	it('redirects to script', async function() {
		deepEqual((await (await browser.fetch('http://loc.tests' + OLSKTestingCanonicalFor(routes.LCHPackageCompiledScriptRedirect.OLSKRoutePath))).text()).slice(0, 13), 'var Launchlet')
	});

	it('redirects to style', async function() {
		deepEqual((await (await browser.fetch('http://loc.tests' + OLSKTestingCanonicalFor(routes.LCHPackageCompiledStyleRedirect.OLSKRoutePath))).text()).slice(0, 10), '.Container')
	});

});
