import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LCHVitrineRoute;

describe('LCHVitrineUIFeature', function () {

context('LCHVitrineDemoButtonCommit', function testLCHVitrineDemoButtonCommit () {

	before(function() {
		return browser.visit(kDefaultRoutePath.OLSKRoutePath);
	});
	
	it('shows launcher', async function() {
		browser.click(LCHVitrineDemoButtonCommit);
		await browser.wait({element: LCHLauncherFilterInput});

		browser.assert.elements(LCHLauncherFilterInput, 1);
	});

});

});
