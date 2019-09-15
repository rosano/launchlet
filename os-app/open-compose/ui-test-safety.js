import { deepEqual } from 'assert';

const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().LCHComposeRoute.OLSKRoutePath;

describe('LCHComposeSafety', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});

	context('EditCallbackFlagged', async function testEditCallbackFlagged() {

		before(function () {
			return uCreateItem(browser);
		});

		it('alerts if flagged', async function() {
			browser.fill(LCHComposeDetailCallbackBodyInputDebug, 'eval()');
			await browser.wait({ element: LCHComposeFormFlagAlert });

			browser.assert.elements(LCHComposeFormFlagAlert, 1);
		});

	});

});
