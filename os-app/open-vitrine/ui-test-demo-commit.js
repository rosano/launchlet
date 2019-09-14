import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LCHVitrineRoute;

const uFilter = function (inputData) {
	browser.fill(LCHLauncherFilterInput, inputData)
	return browser.wait({ elemen: '.LCHLauncherResultListItem' })
};

describe('LCHVitrineDemoCommit', function () {

	beforeEach(async function () {
		await browser.visit(kDefaultRoute.OLSKRoutePath);
		
		browser.click(LCHVitrineDemoButtonCommit);
		await browser.wait({element: LCHLauncherFilterInput});
	});

	describe('LCHVitrineSendEmail', function () {
		
		it('opens mailto', async function() {
			await uFilter('send');

			deepEqual(browser.OLSKAlert(function () {
				browser.click('.LCHLauncherResultListItem');
			}), 'mailto:')
		});
	
	});

});
