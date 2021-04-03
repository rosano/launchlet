const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
};

describe(`LCHVitrine_Localize-${ OLSKRoutingLanguage }`, function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKRoutingLanguage,
		});
	});

	it('localizes title', function() {
		browser.assert.text('title', uLocalized('LCHVitrineTitle'))
	});

	it('localizes meta[description]', function() {
		browser.assert.attribute('meta[name=description]', 'content', uLocalized('LCHVitrineDescription'))
	});

	it('localizes LCHVitrineCrownName', function () {
		browser.assert.text(LCHVitrineCrownName, uLocalized('LCHVitrineTitle'));
	});

	it('localizes LCHVitrineFeaturesHeading', function () {
		browser.assert.text(LCHVitrineFeaturesHeading, uLocalized('OLSKWordingFeatures'));
	});

	it('localizes LCHVitrineGuideButton', function () {
		browser.assert.text(LCHVitrineGuideButton, uLocalized('OLSKWordingOpenGuide'));
	});

	it('localizes LCHVitrineVideoHeading', function () {
		browser.assert.text(LCHVitrineVideoHeading, uLocalized('OLSKWordingVideo'));
	});

	it('localizes LCHVitrineVideo1Heading', function () {
		browser.assert.text(LCHVitrineVideo1Heading, uLocalized('LCHVitrineVideo1HeadingText'));
	});

	it('localizes LCHVitrineVideo2Heading', function () {
		browser.assert.text(LCHVitrineVideo2Heading, uLocalized('LCHVitrineVideo2HeadingText'));
	});

	it('localizes LCHVitrineVideo3Heading', function () {
		browser.assert.text(LCHVitrineVideo3Heading, uLocalized('LCHVitrineVideo3HeadingText'));
	});

	it('localizes LCHVitrineVideo4Heading', function () {
		browser.assert.text(LCHVitrineVideo4Heading, uLocalized('LCHVitrineVideo4HeadingText'));
	});

	it('localizes LCHVitrineTutorialsButton', function () {
		browser.assert.text(LCHVitrineTutorialsButton, uLocalized('LCHVitrineTutorialsButtonText'));
	});

	it('localizes LCHVitrineGazetteHeading', function () {
		browser.assert.text(LCHVitrineGazetteHeading, uLocalized('OLSKGazetteHeadingText'));
	});

	it('localizes LCHVitrineSupportHeading', function () {
		browser.assert.text(LCHVitrineSupportHeading, uLocalized('OLSKWordingFeedbackHeading'));
	});

	it('localizes LCHVitrineSupportBlurb', function () {
		browser.assert.text(LCHVitrineSupportBlurb, uLocalized('OLSKWordingFeedbackBlurb'));
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

	context('OLSKLanding', function test_OLSKLanding () {

		it('localizes OLSKLandingHeadingText', function () {
			browser.assert.text('.OLSKLandingHeading', uLocalized('LCHVitrineDescription'));
		});

		it('localizes OLSKLandingBlurbText', function () {
			browser.assert.text('.OLSKLandingBlurb', uLocalized('OLSKLandingBlurbText'));
		});

		it('localizes OLSKLandingActionText', function () {
			browser.assert.text('.OLSKLandingAction', uLocalized('OLSKWordingOpenApp'));
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
