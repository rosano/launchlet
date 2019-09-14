import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LCHVitrineRoute;

describe('LCHVitrineDemoCommit', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});
	
	it('shows launcher', async function() {
		browser.click(LCHVitrineDemoButtonCommit);
		await browser.wait({element: LCHLauncherFilterInput});

		browser.assert.elements(LCHLauncherFilterInput, 1);
	});

});
