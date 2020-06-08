import { deepEqual } from 'assert';

const routes = require('./controller.js').OLSKControllerRoutes();

describe('LCHPackage_Access', function test_LCHPackage_AccessPipe () {

	it('redirects to script', async function() {
		deepEqual((await (await browser.fetch('http://loc.tests' + OLSKTestingCanonical(routes.LCHPackageCompiledScriptRedirect))).text()).slice(0, 13), 'var Launchlet');
	});

	it('redirects to style', async function() {
		deepEqual((await (await browser.fetch('http://loc.tests' + OLSKTestingCanonical(routes.LCHPackageCompiledStyleRedirect))).text()).slice(0, 10), '.Container');
	});

});
