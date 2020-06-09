const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, kDefaultRoute.OLSKRouteLanguages[0]);
};

describe('LCHVitrineDemoPipe', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	context('LCHVitrinePageLinksHighlightAdd', function () {

		const elementQuery = 'style.LCHVitrinePageLinksHighlightAdd';

		before(function () {
			return browser.click(LCHVitrineDemoButtonPipe);
		});
		
		before(function () {
			browser.OLSKFireKeyboardEvent(browser.window, 'h');
			return browser.OLSKFireKeyboardEvent(browser.window, 'p');
		});
		
		before(function () {
			browser.assert.text('.LCHLauncherSubjectPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrinePageLinksHighlightAdd);
		});
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
		});
		
		it('adds style element', function() {
			browser.assert.elements(elementQuery, 1);
		});
		
		it('sets content', function() {
			browser.assert.OLSKInnerHTML(elementQuery, 'a { background: yellow !important; }');
		});

		context('after invoke', function () {
			
			before(function () {
				return browser.click(LCHVitrineDemoButtonPipe);
			});
			
			before(function () {
				browser.OLSKFireKeyboardEvent(browser.window, 'h');
				return browser.OLSKFireKeyboardEvent(browser.window, 'p');
			});
			
			it('hides recipe', function () {
				browser.assert.text('.LCHLauncherSubjectPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrinePageLinksHighlightRemove);
			});
		
		});
		
	});

	context('LCHVitrinePageLinksHighlightRemove', function () {

		const elementQuery = 'style.LCHVitrinePageLinksHighlightAdd';

		before(async function () {
			browser.query(elementQuery).remove();
			browser.click(LCHVitrineDemoButtonPipe);
			await browser.wait({element: '.LCHLauncherSubjectPromptPlaceholder'});
		});
		
		it('hides recipe', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'r');
			browser.OLSKFireKeyboardEvent(browser.window, 'h');
			await browser.wait({element: '.LCHLauncherSubjectPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem .LCHLauncherPipeItemTitle'});

			browser.assert.elements('.LCHLauncherSubjectPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem .LCHLauncherPipeItemTitle', OLSKTestingLocalized('LCHVitrineDemoRecipeNames', 'en').LCHVitrinePageColoursRandomize);
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

			browser.assert.elements(elementQuery, 0);
		});
	
	});

});
