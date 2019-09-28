import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LCHVitrineRoute;

const uFilter = async function (inputData) {
	browser.fill('#LCHLauncherFilterInput', inputData)
	await browser.wait({ element: '.LCHLauncherResultListItem' })
};

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`LCHVitrine_Localize-${ languageCode }`, function () {

	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			OLSKRoutingLanguage: languageCode,
		}));
	});

	it('localizes title', function() {
		browser.assert.text('title', uLocalized('LCHVitrineTitle'))
	});

	it('localizes description', function() {
		browser.assert.attribute('meta[name=description]', 'content', uLocalized('LCHVitrineDescription'))
	});

	it('localizes LCHVitrineContent', function() {
		deepEqual(browser.query(LCHVitrineContent).textContent.trim().slice(0, 20), require('fs').readFileSync(require('path').join(__dirname, `text.${ languageCode }.md`), 'utf-8').replace(/[#_]/g, '').trim().slice(0, 20))
	});

	it('localizes LCHVitrineDemoButtonCommit', function() {
		browser.assert.text(LCHVitrineDemoButtonCommit, uLocalized('LCHVitrineDemoButtonCommitText'))
	});

	it('localizes LCHVitrineDemoButtonPreview', function() {
		browser.assert.text(LCHVitrineDemoButtonPreview, uLocalized('LCHVitrineDemoButtonPreviewText'))
	});

	it('localizes LCHVitrineDemoButtonPipe', function() {
		browser.assert.text(LCHVitrineDemoButtonPipe, uLocalized('LCHVitrineDemoButtonPipeText'))
	});

	context('DemoCommit', function () {

		beforeEach(async function () {
			await browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				OLSKRoutingLanguage: languageCode,
			}));
			
			browser.click(LCHVitrineDemoButtonCommit);
			await browser.wait({element: '#LCHLauncherFilterInput'});
		});

		it('localizes LCHVitrinePageColoursRandomize', async function() {
			await uFilter(uLocalized('LCHVitrineDemoRecipeNames').LCHVitrinePageColoursRandomize);

			browser.assert.text('.LCHLauncherResultListItem', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrinePageColoursRandomize);
		});

		it('localizes LCHVitrinePageColoursRestore', async function() {
			await uFilter(uLocalized('LCHVitrineDemoRecipeNames').LCHVitrinePageColoursRandomize);
			
			browser.click('.LCHLauncherResultListItem');
			await browser.wait({element: 'style.LCHVitrinePageColoursRandomize'});

			browser.click(LCHVitrineDemoButtonCommit);
			await browser.wait({element: '#LCHLauncherFilterInput'});
			await uFilter(uLocalized('LCHVitrineDemoRecipeNames').LCHVitrinePageColoursRestore);

			browser.assert.text('.LCHLauncherResultListItem', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrinePageColoursRestore);
		});

		it('localizes LCHVitrineCopyPageInfo', async function() {
			await uFilter(uLocalized('LCHVitrineDemoRecipeNames').LCHVitrineCopyPageInfo);

			browser.assert.text('.LCHLauncherResultListItem', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrineCopyPageInfo);
		});

		it('localizes LCHVitrineSendEmail', async function() {
			await uFilter(uLocalized('LCHVitrineDemoRecipeNames').LCHVitrineSendEmail);

			browser.assert.text('.LCHLauncherResultListItem', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrineSendEmail);
		});
		
	});

	context('DemoPipe', function () {

		beforeEach(async function () {
			await browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
				OLSKRoutingLanguage: languageCode,
			}));
			
			browser.click(LCHVitrineDemoButtonPipe);
			await browser.wait({element: '.LCHLauncherSubjectPromptPlaceholder'});
		});

		it('localizes LCHVitrinePageLinksHighlightAdd', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'h');
			browser.OLSKFireKeyboardEvent(browser.window, 'p');
			await browser.wait({element: '.LCHLauncherSubjectPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem'});
			
			browser.assert.text('.LCHLauncherSubjectPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem .LCHLauncherPipeItemTitle', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrinePageLinksHighlightAdd);
		});

		it('localizes LCHVitrinePageLinksHighlightRemove', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'h');
			browser.OLSKFireKeyboardEvent(browser.window, 'p');
			await browser.wait({element: '.LCHLauncherSubjectPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem'});
			
			browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
			await browser.wait({element: 'style.LCHVitrinePageLinksHighlightAdd'});

			browser.click(LCHVitrineDemoButtonPipe);
			await browser.wait({element: '.LCHLauncherSubjectPromptPlaceholder'});

			browser.OLSKFireKeyboardEvent(browser.window, 'r');
			browser.OLSKFireKeyboardEvent(browser.window, 'h');
			await browser.wait({element: '.LCHLauncherSubjectPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem'});
			
			browser.assert.text('.LCHLauncherSubjectPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem .LCHLauncherPipeItemTitle', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrinePageLinksHighlightRemove);
		});

		it('localizes LCHVitrineMinimalistDateString', async function() {
			browser.OLSKFireKeyboardEvent(browser.window, 'm');
			browser.OLSKFireKeyboardEvent(browser.window, 'd');
			await browser.wait({element: '.LCHLauncherSubjectPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem'});
			
			browser.assert.text('.LCHLauncherSubjectPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem .LCHLauncherPipeItemTitle', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrineMinimalistDateString);
		});
		
	});

});

});
