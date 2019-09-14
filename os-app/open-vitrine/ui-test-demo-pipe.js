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

	context('LCHVitrinePageLinksHighlightAdd', function testLCHVitrinePageLinksHighlightAdd() {

		const elementQuery = 'style.LCHVitrinePageLinksHighlightAdd';

		before(async function () {
			browser.click(LCHVitrineDemoButtonPipe);
			await browser.wait({element: '.LCHLauncherSubjectPromptPlaceholder'});
		});
		
		it('adds style element', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'h');
			browser.OLSKFireKeyboardEvent(browser.window, 'p');
			await browser.wait({element: '.LCHLauncherPipeItem'});

			browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
			await browser.wait({element: elementQuery});

			browser.assert.elements(elementQuery, 2)
		});
		
		it('sets content', function() {
			deepEqual(browser.query(elementQuery).innerHTML, 'a { background: yellow; }')
		});
		
		it('hides recipe', async function() {
				browser.click(LCHVitrineDemoButtonPipe);
				await browser.wait({element: '.LCHLauncherSubjectPromptPlaceholder'});

				browser.OLSKFireKeyboardEvent(browser.window, 'h');
				browser.OLSKFireKeyboardEvent(browser.window, 'p');
				await browser.wait({element: '.LCHLauncherPipeItem'});

				browser.assert.elements('.LCHLauncherPipeItem', 0)
		});
	
	});

});
