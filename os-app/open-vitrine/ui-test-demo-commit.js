import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LCHVitrineRoute;

const uFilter = function (inputData) {
	browser.fill(LCHLauncherFilterInput, inputData)
	return browser.wait({ elemen: '.LCHLauncherResultListItem' })
};

describe('LCHVitrineDemoCommit', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	describe('LCHVitrineSendEmail', function () {
		
		it('opens mailto', async function() {
			browser.click(LCHVitrineDemoButtonCommit);
			await browser.wait({element: LCHLauncherFilterInput});
			
			await uFilter('send');

			deepEqual(browser.OLSKAlert(function () {
				browser.click('.LCHLauncherResultListItem');
			}), 'mailto:')
		});
	
	});

});
