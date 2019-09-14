import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LCHVitrineRoute;

const uFilter = function (inputData) {
	browser.fill('#LCHLauncherFilterInput', inputData)
	return browser.wait({ elemen: '.LCHLauncherResultListItem' })
};

describe('LCHVitrineDemoPipe', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath)
	});

	context('Startup', function testStartup () {
		
		before(async function () {
			browser.click(LCHVitrineDemoButtonPipe);
			await browser.wait({element: '.LCHLauncherSubjectPromptPlaceholder'});
		});
		
		it('shows placeholder', function() {
			browser.assert.elements('.LCHLauncherSubjectPromptPlaceholder', 1)
		});
	
	});

});
