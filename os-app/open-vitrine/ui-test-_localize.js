import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

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

	it('localizes LCH_VITRINE_QUICKSILVER_URL', function() {
		browser.assert.element(`a[href="${ process.env.LCH_VITRINE_QUICKSILVER_URL }"]`);
	});

	it('localizes LCHGuideRoute', function() {
		browser.assert.element(`a[href="${ require('../open-guide/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath }"]`);
	});

	it('localizes LCHComposeRoute', function() {
		browser.assert.element(`a[href="${ OLSKTestingCanonicalFor(require('../open-compose/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath, {
			OLSKRoutingLanguage: languageCode,
		}) }"]`);
	});

	it('localizes LCH_SHARED_DONATE_URL', function() {
		browser.assert.element(`a[href="${ process.env.LCH_SHARED_DONATE_URL }"]`);
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

		before(function () {
			return browser.click(LCHVitrineDemoButtonCommit);
		});

		context('LCHVitrinePageColoursRandomize', function () {
			
			before(function () {
				return browser.fill('#LCHLauncherFilterInput', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrinePageColoursRandomize)
			});

			it('localizes LCHLauncherResultListItem', function() {
				browser.assert.text('.LCHLauncherResultListItem', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrinePageColoursRandomize);
			});
		
		});

		context('LCHVitrinePageColoursRestore', function () {
			
			before(function () {
				browser.fill('#LCHLauncherFilterInput', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrinePageColoursRandomize)
			});

			before(function () {
				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');

				return browser.click(LCHVitrineDemoButtonCommit);
			});

			before(function () {
				return browser.fill('#LCHLauncherFilterInput', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrinePageColoursRestore)
			});

			it('localizes LCHLauncherResultListItem', function() {
				browser.assert.text('.LCHLauncherResultListItem', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrinePageColoursRestore);
			});
		
		});

		context('LCHVitrineCopyPageInfo', function () {
			
			before(function () {
				browser.fill('#LCHLauncherFilterInput', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrineCopyPageInfo)
			});

			it('localizes LCHLauncherResultListItem', function() {
				browser.assert.text('.LCHLauncherResultListItem', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrineCopyPageInfo);
			});
		
		});

		context('LCHVitrineSendEmail', function () {
			
			before(function () {
				browser.fill('#LCHLauncherFilterInput', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrineSendEmail)
			});

			it('localizes LCHLauncherResultListItem', function() {
				browser.assert.text('.LCHLauncherResultListItem', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrineSendEmail);
			});
		
		});
		
	});

	context('DemoPipe', function () {

		before(function () {
			return browser.click(LCHVitrineDemoButtonPipe);
		});

		context('LCHVitrinePageLinksHighlightAdd', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, uLocalized('LCHVitrineDemoRecipeNames').LCHVitrinePageLinksHighlightAdd);
			});

			it('localizes LCHLauncherPipeItemTitle', function() {
				browser.assert.text('.LCHLauncherSubjectPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem .LCHLauncherPipeItemTitle', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrinePageLinksHighlightAdd);
			});
		
		});

		context('LCHVitrinePageLinksHighlightRemove', function () {
			
			before(function () {
				browser.OLSKFireKeyboardEvent(browser.window, uLocalized('LCHVitrineDemoRecipeNames').LCHVitrinePageLinksHighlightAdd);
				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');
			});

			before(function () {
				return browser.click(LCHVitrineDemoButtonPipe);
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, uLocalized('LCHVitrineDemoRecipeNames').LCHVitrinePageLinksHighlightRemove);
			});

			it('localizes LCHLauncherPipeItemTitle', function() {
				browser.assert.text('.LCHLauncherSubjectPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem .LCHLauncherPipeItemTitle', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrinePageLinksHighlightRemove);
			});
		
		});

		context('LCHVitrineMinimalistDateString', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, uLocalized('LCHVitrineDemoRecipeNames').LCHVitrineMinimalistDateString);
			});

			it('localizes LCHLauncherPipeItemTitle', function() {
				browser.assert.text('.LCHLauncherSubjectPrompt .LCHLauncherZoneInput .LCHLauncherPipeItem .LCHLauncherPipeItemTitle', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrineMinimalistDateString);
			});
		
		});
		
	});

});

});
