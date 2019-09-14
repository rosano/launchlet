import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LCHVitrineRoute;

describe('LCHVitrineDemo', function () {

context('LCHVitrineDemoButtonCommit', function testLCHVitrineDemoButtonCommit () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});
	
	it('shows launcher', async function() {
		browser.click(LCHVitrineDemoButtonCommit);
		await browser.wait({element: LCHLauncherFilterInput});

		browser.assert.elements(LCHLauncherFilterInput, 1);
	});

});

});
