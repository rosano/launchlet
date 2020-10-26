const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`LCHVitrine_Localize-${ languageCode }`, function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKRoutingLanguage: languageCode,
		});
	});

	it('localizes title', function() {
		browser.assert.text('title', uLocalized('LCHVitrineTitle'))
	});

	it('localizes description', function() {
		browser.assert.attribute('meta[name=description]', 'content', uLocalized('LCHVitrineDescription'))
	});

	it('shows LCHVitrineIdentityLogo', function () {
		browser.assert.elements(LCHVitrineIdentityLogo, 1);
	});

	it('shows LCHVitrineIdentityName', function () {
		browser.assert.elements(LCHVitrineIdentityName, 1);
	});

	it('localizes LCHVitrineIdentityName', function () {
		browser.assert.text(LCHVitrineIdentityName, uLocalized('LCHVitrineTitle'));
	});

	it('localizes LCHVitrineContent', function() {
		const item = require('fs').readFileSync(require('path').join(__dirname, `text.${ languageCode }.md`), 'utf-8').replace(/_/g, '');
		browser.assert.OLSKTextContent(LCHVitrineContent, item.slice(0, 20), function (inputData) {
			return inputData.slice(0, 20);
		});
	});

	it('localizes LCH_VITRINE_QUICKSILVER_URL', function() {
		browser.assert.element(`a[href="${ process.env.LCH_VITRINE_QUICKSILVER_URL }"]`);
	});

	it('localizes LCHGuideRoute', function() {
		browser.assert.element(`a[href="${ require('../open-guide/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath }"]`);
	});

	it('localizes LCHComposeRoute', function() {
		browser.assert.element(`a[href="${ OLSKTestingCanonical(require('../open-compose/controller.js').OLSKControllerRoutes().shift(), {
			OLSKRoutingLanguage: languageCode,
		}) }"]`);
	});

	it('localizes LCHVitrineContentAppButton', function () {
		browser.assert.text(LCHVitrineContentAppButton, uLocalized('LCHVitrineContentAppButtonText'));
	});

	it('localizes LCH_SHARED_EXTENSION_DOCS_URL', function() {
		browser.assert.element(`a[href="${ process.env.LCH_SHARED_EXTENSION_DOCS_URL }"]`);
	});

	it('localizes LCH_SHARED_PACKAGE_DOCS_URL', function() {
		browser.assert.element(`a[href="${ process.env.LCH_SHARED_PACKAGE_DOCS_URL }"]`);
	});

	it('localizes LCH_SHARED_GITHUB_URL', function() {
		browser.assert.element(`a[href="${ process.env.LCH_SHARED_GITHUB_URL }"]`);
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

	it('localizes LCHVitrineBrueghel', function() {
		browser.assert.attribute(LCHVitrineBrueghel, 'alt', uLocalized('LCHVitrineBrueghelText'))
	});

	context('LCHVitrineContentAppButton', function test_LCHVitrineContentAppButton () {

		it('classes OLSKCommonButton', function () {
			browser.assert.hasClass(LCHVitrineContentAppButton, 'OLSKCommonButton');
		});
		
		it('classes OLSKCommonButtonPrimary', function () {
			browser.assert.hasClass(LCHVitrineContentAppButton, 'OLSKCommonButtonPrimary');
		});
		
		it('sets href', function () {
			browser.assert.attribute(LCHVitrineContentAppButton, 'href', OLSKTestingCanonical(require('../open-compose/controller.js').OLSKControllerRoutes().shift(), {
				OLSKRoutingLanguage: languageCode,
			}));
		});
	
	});

	context.skip('DemoCommit', function () {

		before(function () {
			return browser.click(LCHVitrineDemoButtonCommit);
		});

		context('LCHVitrinePageColoursRandomize', function () {
			
			before(function () {
				return browser.fill('.LCHLauncherFilterInput', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrinePageColoursRandomize)
			});

			it('localizes OLSKResultsListItem', function() {
				browser.assert.text('.OLSKResultsListItem', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrinePageColoursRandomize);
			});
		
		});

		context('LCHVitrinePageColoursRestore', function () {

			before(function () {
				browser.OLSKFireKeyboardEvent(browser.window, 'Enter');

				return browser.click(LCHVitrineDemoButtonCommit);
			});

			before(function () {
				return browser.fill('.LCHLauncherFilterInput', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrinePageColoursRestore)
			});

			it('localizes OLSKResultsListItem', function() {
				browser.assert.text('.OLSKResultsListItem', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrinePageColoursRestore);
			});
		
		});

		context('LCHVitrineCopyPageInfo', function () {
			
			before(function () {
				browser.fill('.LCHLauncherFilterInput', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrineCopyPageInfo)
			});

			it('localizes OLSKResultsListItem', function() {
				browser.assert.text('.OLSKResultsListItem', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrineCopyPageInfo);
			});
		
		});

		context('LCHVitrineSendEmail', function () {
			
			before(function () {
				browser.fill('.LCHLauncherFilterInput', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrineSendEmail)
			});

			it('localizes OLSKResultsListItem', function() {
				browser.assert.text('.OLSKResultsListItem', uLocalized('LCHVitrineDemoRecipeNames').LCHVitrineSendEmail);
			});
		
		});
		
	});

	context.skip('DemoPipe', function () {

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
