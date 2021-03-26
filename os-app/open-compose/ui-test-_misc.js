const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHCompose_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('sets meta:viewport', function () {
		browser.assert.attribute('meta[name=viewport]', 'content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
	});

	describe('LCHComposeCreateButton', function test_LCHComposeCreateButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(LCHComposeCreateButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(LCHComposeCreateButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(LCHComposeCreateButton, 'OLSKToolbarButton');
		});
		
		it('sets accesskey', function () {
			browser.assert.attribute(LCHComposeCreateButton, 'accesskey', 'n');
		});
	
	});

	describe('LCHComposeCreateButtonImage', function test_LCHComposeCreateButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ LCHComposeCreateButtonImage } #_OLSKSharedCreate`, 1);
		});
	
	});
	
	context('select', function test_select () {

		before(function () {
			// browser.assert.hasNoClass('.CodeMirror', 'CodeMirror-focused'); // #skip-codemirror
		});

		before(function () {
			return browser.pressButton(LCHComposeCreateButton);
		});

		it('focuses LCHComposeDetailFormNameField', function() {
			browser.assert.hasFocus('.LCHComposeDetailFormNameField');
		});

	});

	context('clone', function test_clone () {

		before(function () {
			browser.assert.elements('.OLSKResultsListItem', 1);
		});

		before(function () {
			browser.fill('.LCHComposeDetailFormNameField', 'alfa');
		});

		before(function () {
			return browser.pressButton('.LCHComposeDetailToolbarCloneButton');
		});

		it('creates item', function () {
			browser.assert.elements('.OLSKResultsListItem', 2);
		});

		it('focuses LCHComposeDetailFormNameField', function() {
			browser.assert.hasFocus('.LCHComposeDetailFormNameField');
		});

		it('copies properties from previous item', function () {
			browser.assert.text('.OLSKResultsListItem', 'alfa alfa');
		});

		context('modify', function () {
			
			before(function () {
				browser.fill('.LCHComposeDetailFormNameField', 'bravo');
			});

			it('sets LCHComposeDetailItem', function () {
				browser.assert.text('.OLSKResultsListItem', 'bravo alfa');
			});

		});

	});

	context.skip('run', function test_run () {

		// #skip-launchlet

		before(function () {
			browser.fill('.LCHComposeDetailFormNameField', 'charlie');
		});

		before(function () {
			return browser.click('.LCHComposeBuildRunLink');
		});

		before(function () {
			return browser.wait({ element: '.LCHLauncherFilterInput' });
		});

		it('shows launchlet', function () {
			browser.assert.elements('.LCHLauncherFilterInput', 1);
		});

		context('filter', function () {

			before(function () {
				browser.assert.elements('.OLSKResultsListItem', 0);
			});

			before(function () {
				browser.fill('.LCHLauncherFilterInput', 'charlie');
			});
			
			it('loads commands', function () {
				browser.assert.elements('.OLSKResultsListItem', 1);
			});

		});

	});

	describe.skip('LCHComposeBuildPipeModeEnabledField', function() {

		// #skip-launchlet

		before(function () {
			browser.assert.elements('.LCHLauncherPromptHeading', 0);
		});

		before(function () {
			return browser.check('.LCHComposeBuildPipeModeEnabledField');
		});

		before(function () {
			return browser.click('.LCHComposeBuildRunLink');
		});

		before(function () {
			return browser.wait({ element: '.LCHLauncherFilterInput' });
		});

		it('sets LCHOptionMode', function () {
			browser.assert.elements('.LCHLauncherPromptHeading', 1);
		});

	});

	describe.skip('LCHComposeBuildPageRecipesEnabledField', function() {

		// #skip-launchlet

		before(function () {
			return browser.uncheck('.LCHComposeBuildPipeModeEnabledField');
		});

		before(function () {
			return browser.click('.LCHComposeBuildRunLink');
		});

		before(function () {
			return browser.wait({ element: '.LCHLauncherFilterInput' });
		});

		before(function () {
			browser.fill('.LCHLauncherFilterInput', 'LCH_TEST_PAGE_RECIPES');
		});

		before(function () {
			browser.assert.elements('.OLSKResultsListItem', 0);
		});

		before(function () {
			return browser.check('.LCHComposeBuildPageRecipesEnabledField');
		});

		before(function () {
			return browser.click('.LCHComposeBuildRunLink');
		});

		before(function () {
			return browser.wait({ element: '.LCHLauncherFilterInput' });
		});

		before(function () {
			browser.fill('.LCHLauncherFilterInput', 'LCH_TEST_PAGE_RECIPES');
		});

		it('sets LCHOptionIncludePageRecipes', function () {
			browser.assert.elements('.OLSKResultsListItem', 1);
		});

	});

	describe('LCHComposeTools', function test_LCHComposeTools () {

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(LCHComposeTools, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(LCHComposeTools, 'OLSKToolbarJustify');
		});

		it('classes OLSKCommonEdgeTop', function () {
			browser.assert.hasClass(LCHComposeTools, 'OLSKCommonEdgeTop');
		});

		context('LCHComposeToolsPairStatusFailedError', function test_LCHComposeToolsPairStatusFailedError () {

			before(function () {
				return browser.pressButton('.LCHComposeToolsPairButton');
			});
			
			before(function () {
				browser.evaluate(`window.postMessage({
					LBXResponseHash: 'alfa',
					LBXResponseError: 'bravo',
				}, window.location.href)`);
			});
			
			it('binds LBXResponseError', function() {
				browser.assert.text(LCHComposeToolsPairStatusFailedError, 'bravo');
			});
		
		});

		context('TestLCHComposeToolsPairSuccess', function test_TestLCHComposeToolsPairSuccess () {
			
			before(function () {
				browser.evaluate(`window.postMessage({
					LBXResponseHash: 'LBX_TESTING_RESPONSE_HASH',
				}, window.location.href)`);
			});
			
			it('hides LCHComposeToolsPairStatusWaiting', function() {
				browser.assert.elements(LCHComposeToolsPairStatusWaiting, 0);
			});
			
			it('hides LCHComposeToolsPairStatusFailed', function() {
				browser.assert.elements(LCHComposeToolsPairStatusFailed, 0);
			});
		
		});
	
	});

	describe('LCHComposeStorageToolbar', function test_LCHComposeStorageToolbar () {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarCloudButton');
		});

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(LCHComposeStorageToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(LCHComposeStorageToolbar, 'OLSKToolbarJustify');
		});
		
		it('classes OLSKCommonEdgeTop', function () {
			browser.assert.hasClass(LCHComposeStorageToolbar, 'OLSKCommonEdgeTop');
		});
		
	});

	describe('LCHComposeViewportFooter', function test_LCHComposeViewportFooter () {

		it('classes OLSKMobileViewFooter', function () {
			browser.assert.hasClass(LCHComposeViewportFooter, 'OLSKMobileViewFooter');
		});

	});

	describe('OLSKAppToolbar', function test_OLSKAppToolbar () {

		it('sets OLSKAppToolbarGuideURL', function () {
			browser.assert.attribute('.OLSKAppToolbarGuideLink', 'href', require('../open-guide/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath);
		});

	});

	describe('OLSKApropos', function test_OLSKApropos() {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarAproposButton');
		});

		it('sets OLSKAproposFeedbackValue', function () {
			browser.assert.attribute('.OLSKAproposFeedbackButton', 'href', `javascript:window.location.href = window.atob('${ browser.window.btoa('mailto:' + OLSKTestingFormatted(process.env.OLSK_APROPOS_FEEDBACK_EMAIL, 'RP_001')) }')`);
		});

		after(function () {
			browser.pressButton('.OLSKModalViewCloseButton');
		});

	});

	describe('LCHComposeLauncherItemClone', function test_LCHComposeLauncherItemClone () {

		before(function () {
			browser.assert.elements('.OLSKResultsListItem', 2);
		});
		
		before(function () {
			return browser.OLSKLauncherRun('LCHComposeLauncherItemClone');
		});

		it('runs command', function () {
			browser.assert.elements('.OLSKResultsListItem', 3);
		});
	
	});	

});
