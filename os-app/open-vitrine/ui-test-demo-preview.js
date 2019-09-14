import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LCHVitrineRoute;

const uFilter = function (inputData) {
	browser.fill('#LCHLauncherFilterInput', inputData)
	return browser.wait({ elemen: '.LCHLauncherResultListItem' })
};

describe('LCHVitrineDemoPreview', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath)
	});

	context('Startup', function testStartup () {
		
		before(async function () {
			browser.click(LCHVitrineDemoButtonPreview);
			await browser.wait({element: '#LCHLauncherFilterInput'});
		});
		
		it('shows headings', function() {
			deepEqual(browser.queryAll('h1,h2').map(function (e) {
				return e.textContent
			}), browser.queryAll('.LCHLauncherResultListItem').map(function (e) {
				return e.textContent.trim()
			}))
		});
	
	});

});
