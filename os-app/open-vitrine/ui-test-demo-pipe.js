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

				browser.assert.elements('.LCHLauncherPipeItem', 3)
		});
	
	});

	context('LCHVitrinePageLinksHighlightRemove', function testLCHVitrinePageLinksHighlightRemove() {

		const elementQuery = 'style.LCHVitrinePageLinksHighlightAdd';

		before(async function () {
			browser.query(elementQuery).remove();
			browser.query(elementQuery).remove();
			console.log(browser.html(elementQuery));

			browser.click(LCHVitrineDemoButtonPipe);
			await browser.wait({element: '.LCHLauncherSubjectPromptPlaceholder'});
		});
		
		it('hides recipe', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'r');
			browser.OLSKFireKeyboardEvent(browser.window, 'h');
			await browser.wait({element: '.LCHLauncherSubjectPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem .LCHLauncherPipeItemTitle'});

			browser.assert.elements('.LCHLauncherSubjectPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem .LCHLauncherPipeItemTitle', OLSKTestingLocalized('LCHVitrineDemoRecipeNames', 'en').LCHVitrinePageColoursRandomize)
		});
		
		it('shows recipe on invoke sibling', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			browser.OLSKFireKeyboardEvent(browser.window, 'Backspace');
			browser.OLSKFireKeyboardEvent(browser.window, 'h');
			browser.OLSKFireKeyboardEvent(browser.window, 'p');
			await browser.wait({element: '.LCHLauncherPipeItem'});

			browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
			await browser.wait({element: elementQuery});

			browser.click(LCHVitrineDemoButtonPipe);
			await browser.wait({element: '.LCHLauncherSubjectPromptPlaceholder'});

			browser.OLSKFireKeyboardEvent(browser.window, 'r');
			browser.OLSKFireKeyboardEvent(browser.window, 'h');
			await browser.wait({element: '.LCHLauncherSubjectPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem'});

			browser.assert.text('.LCHLauncherSubjectPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem .LCHLauncherPipeItemTitle', OLSKTestingLocalized('LCHVitrineDemoRecipeNames', 'en').LCHVitrinePageLinksHighlightRemove);
		});
		
		it('removes style element', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
			await browser.wait({element: elementQuery});

			browser.assert.elements(elementQuery, 0)
		});
	
	});

});
