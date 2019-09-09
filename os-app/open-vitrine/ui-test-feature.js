import { deepEqual } from 'assert';

const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().LCHVitrineRoute.OLSKRoutePath;

describe('LCHVitrineUIFeature', function () {

context('LCHVitrineDemoButtonCommit', function testLCHVitrineDemoButtonCommit () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('shows launcher', async function() {
		browser.click(LCHVitrineDemoButtonCommit);
		await browser.wait({element: LCHLauncherFilterInput});

		browser.assert.elements(LCHLauncherFilterInput, 1);
	});

});

});
