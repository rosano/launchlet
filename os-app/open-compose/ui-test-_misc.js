const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHCompose_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('sets meta:viewport', function () {
		browser.assert.attribute('meta[name=viewport]', 'content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
	});

	context('LCHCompose', function () {
		
		it('classes OLSKMobileViewInactive', function () {
			browser.assert.hasNoClass('.LCHComposeMaster', 'OLSKMobileViewInactive');
			browser.assert.hasClass('.LCHComposeDetail', 'OLSKMobileViewInactive');
		});

		it('sets LCHComposeDetailItem', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 1);
		});

		it('focuses OLSKMasterListFilterField', function() {
			browser.assert.hasFocus('.OLSKMasterListFilterField');
		});
	
	});

	describe('LCHComposeMasterCreateButton', function test_LCHComposeMasterCreateButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(LCHComposeMasterCreateButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(LCHComposeMasterCreateButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(LCHComposeMasterCreateButton, 'OLSKToolbarButton');
		});
		
		it('sets accesskey', function () {
			browser.assert.attribute(LCHComposeMasterCreateButton, 'accesskey', 'n');
		});
	
	});

	describe('LCHComposeMasterCreateButtonImage', function test_LCHComposeMasterCreateButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ LCHComposeMasterCreateButtonImage } #_OLSKSharedCreate`, 1);
		});
	
	});
	
	context('create', function test_create () {

		before(function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 0);
		});

		before(function () {
			// browser.assert.hasNoClass('.CodeMirror', 'CodeMirror-focused'); // #skip-codemirror
		});

		before(function () {
			return browser.pressButton('.LCHComposeMasterCreateButton');
		});

		it('classes OLSKMobileViewInactive', function() {
			browser.assert.hasClass('.LCHComposeMaster', 'OLSKMobileViewInactive');
			browser.assert.hasNoClass('.LCHComposeDetail', 'OLSKMobileViewInactive');
		});

		it('sets LCHComposeMasterListItemSelected', function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 1);
		});

		it('sets LCHComposeDetailItem', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

		it('focuses LCHComposeDetailFormNameField', function() {
			browser.assert.hasFocus('.LCHComposeDetailFormNameField');
		});

	});

	context('arrow', function test_arrow () {

		before(function () {
			return browser.focus('.OLSKMasterListFilterField');
		});

		before(function() {
			browser.assert.hasClass('.LCHComposeMaster', 'OLSKMasterListFocused');
		});
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
		});

		it('classes OLSKMasterListFocused', function() {
			browser.assert.hasClass('.LCHComposeMaster', 'OLSKMasterListFocused');
		});

		it('classes OLSKMobileViewInactive', function() {
			browser.assert.hasNoClass('.LCHComposeMaster', 'OLSKMobileViewInactive');
			browser.assert.hasClass('.LCHComposeDetail', 'OLSKMobileViewInactive');
		});

		it('sets LCHComposeMasterListItemSelected', function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 1);
		});

		it('sets LCHComposeDetailItem', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

	});

	context('tab', function test_tab () {
		
		context('master focused', function () {

			before(function() {
				browser.assert.hasFocus('.OLSKMasterListFilterField');
			});

			before(function() {
				browser.assert.hasClass('.LCHComposeMaster', 'OLSKMasterListFocused');
			});
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			});

			it('classes OLSKMasterListFocused', function() {
				browser.assert.hasNoClass('.LCHComposeMaster', 'OLSKMasterListFocused');
			});

			it('focuses LCHComposeDetailFormNameField', function() {
				browser.assert.hasFocus('.LCHComposeDetailFormNameField');
			});
		
		});
		
		context('master not focused', function () {

			before(function () {
				browser.assert.hasFocus('.LCHComposeDetailFormNameField');
			});
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			});

			it.skip('focuses other field', function() {
				browser.assert.hasFocus('.LCHComposeDetailFormSignatureField');
			});
		
		});

		context('shiftKey', function () {
			
			context.skip('other field focused', function () {

				before(function() {
					browser.assert.hasFocus('.LCHComposeDetailFormSignatureField');
				});

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Tab', {
						shiftKey: true,
					});
				});

				it('focuses LCHComposeDetailFormNameField', function() {
					browser.assert.hasFocus('.LCHComposeDetailFormNameField');
				});
			
			});
			
			context('name field focused', function () {

				before(function() {
					browser.assert.hasFocus('.LCHComposeDetailFormNameField');
				});

				before(function() {
					browser.assert.hasNoClass('.LCHComposeMaster', 'OLSKMasterListFocused');
				});

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Tab', {
						shiftKey: true,
					});
				});

				it('focuses OLSKMasterListFilterField', function() {
					browser.assert.hasFocus('.OLSKMasterListFilterField');
				});

				it('classes OLSKMasterListFocused', function() {
					browser.assert.hasClass('.LCHComposeMaster', 'OLSKMasterListFocused');
				});
			
			});
			
			context('master focused', function () {

				before(function() {
					browser.assert.hasFocus('.OLSKMasterListFilterField');
				});

				before(function() {
					browser.assert.hasClass('.LCHComposeMaster', 'OLSKMasterListFocused');
				});
				
				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Tab', {
						shiftKey: true,
					});
				});

				it('classes OLSKMasterListFocused', function() {
					browser.assert.hasNoClass('.LCHComposeMaster', 'OLSKMasterListFocused');
				});

				it('focuses LCHComposeDetailFormNameField', function() {
					browser.assert.hasFocus('.LCHComposeDetailFormNameField');
				});
			
			});
		
		});

	});

	context('escape', function test_escape () {

		before(function () {
			browser.fill('.LCHComposeDetailFormNameField', 'alfa');
		});

		before(function () {
			browser.fill('.OLSKMasterListFilterField', 'alfa');
		});

		before(function () {
			browser.assert.input('.OLSKMasterListFilterField', 'alfa');
		});

		before(function () {
			browser.query('.LCHComposeDetailFormCallbackBody .LCHComposeInputFieldDebug').focus();
		});

		before(function () {
			browser.assert.hasFocus('.LCHComposeDetailFormCallbackBody .LCHComposeInputFieldDebug');
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});
		
		it('focuses OLSKMasterListFilterField', function() {
			browser.assert.hasFocus('.OLSKMasterListFilterField');
		});
		
		it.skip('clears LCHComposeMasterFilterText', function() {
			browser.assert.input('.OLSKMasterListFilterField', '');
		});

	});

	context('select', function test_select () {
		
		before(function () {
			return browser.click('.LCHComposeMasterListItem');
		});

		it('classes OLSKMasterListFocused', function() {
			browser.assert.hasNoClass('.LCHComposeMaster', 'OLSKMasterListFocused');
		});

		it('classes OLSKMobileViewInactive', function() {
			browser.assert.hasClass('.LCHComposeMaster', 'OLSKMobileViewInactive');
		});

		it('sets LCHComposeMasterListItemSelected', function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 1);
		});

		it('classes OLSKMobileViewInactive', function() {
			browser.assert.hasNoClass('.LCHComposeDetail', 'OLSKMobileViewInactive');
		});

		it('sets LCHComposeDetailItem', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

		it('focus LCHComposeDetailFormNameField', function() {
			browser.assert.hasFocus('.LCHComposeDetailFormNameField');
		});

	});

	context('filter', function test_filter () {

		before(function () {
			return browser.pressButton('.LCHComposeMasterCreateButton');
		});

		before(function () {
			browser.fill('.LCHComposeDetailFormNameField', 'bravo');
		});

		context('no match', function () {
			
			before(function () {
				browser.fill('.OLSKMasterListFilterField', 'charlie');
			});

			it('filters all LCHComposeMasterListItem', function() {
				browser.assert.elements('.LCHComposeMasterListItem', 0);
			});

			it('sets LCHComposeDetailItem', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 1);
			});
		
		});

		context('partial match', function () {

			before(function () {
				browser.fill('.OLSKMasterListFilterField', 'a');
			});

			it('filters partial LCHComposeMasterListItem', function() {
				browser.assert.elements('.LCHComposeMasterListItem', 2);
			});

			it('sets LCHComposeMasterListItemSelected', function () {
				browser.assert.elements('.OLSKResultsListItemSelected', 1);
			});

			it('sets LCHComposeDetailItem', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 0);
			});
		
		});

		context('exact match', function () {

			before(function () {
				browser.fill('.OLSKMasterListFilterField', 'bravo');
			});

			it('filters exact LCHComposeMasterListItem', function() {
				browser.assert.elements('.LCHComposeMasterListItem', 1);
			});

			it('sets LCHComposeMasterListItemSelected', function () {
				browser.assert.elements('.OLSKResultsListItemSelected', 1);
			});

			it('sets LCHComposeDetailItem', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 0);
			});
		
		});

		context('clear', function () {
			
			before(function () {
				return browser.pressButton('.OLSKInputWrapperClearButton');
			});

			it('filters no LCHComposeMasterListItem', function() {
				browser.assert.elements('.LCHComposeMasterListItem', 2);
			});

			it('sets LCHComposeMasterListItemSelected', function () {
				browser.assert.elements('.OLSKResultsListItemSelected', 0);
			});

			it('sets LCHComposeDetailItem', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 1);
			});

			it('sorts LCHComposeMasterListItem', function () {
				browser.assert.text('.LCHComposeMasterListItemTitle', 'bravoalfa');
			});
		
		});

	});

	context('selection', function test_selection () {
		
		before(function () {
			return browser.click('.LCHComposeMasterListItem');
		});

		it('sets LCHComposeMasterListItemSelected', function () {
			browser.assert.hasClass('.OLSKResultsListItem:first-of-type', 'OLSKResultsListItemSelected');
		});

		context('arrow', function () {

			before(function () {
				return browser.query('.LCHComposeInputFieldDebug').focus();
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
			});

			it('sets no LCHComposeMasterListItemSelected', function () {
				browser.assert.hasClass('.OLSKResultsListItem:first-of-type', 'OLSKResultsListItemSelected');
			});
		
		});

	});

	context('edit', function test_edit () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});
		
		before(function () {
			return browser.pressButton('.LCHComposeMasterCreateButton');
		});

		context('title', function () {
			
			before(function () {
				browser.fill('.LCHComposeDetailFormNameField', 'alfa');
			});

			it('sets OLSKMasterListItemAccessibilitySummaryFunction', function () {
				browser.assert.attribute('.OLSKMasterListItem', 'aria-label', 'alfa');
			});

			it('sets LCHComposeMasterListItemTitle', function () {
				browser.assert.text('.LCHComposeMasterListItemTitle', 'alfa');
			});

		});

	});

	context('clone', function test_clone () {

		before(function () {
			browser.assert.elements('.LCHComposeMasterListItem', 1);
		});

		before(function () {
			return browser.pressButton('.LCHComposeDetailToolbarCloneButton');
		});

		it('creates LCHComposeMasterListItem', function () {
			browser.assert.elements('.LCHComposeMasterListItem', 2);
		});

		it('copies properties from previous item', function () {
			browser.assert.text('.LCHComposeMasterListItemTitle', 'alfaalfa');
		});

		context('modify', function () {
			
			before(function () {
				browser.fill('.LCHComposeDetailFormNameField', 'bravo');
			});

			it('focuses LCHComposeDetailFormNameField', function() {
				browser.assert.hasFocus('.LCHComposeDetailFormNameField');
			});

			it('sets LCHComposeDetailItem', function () {
				browser.assert.text('.LCHComposeMasterListItemTitle', 'alfabravo');
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
		
		it('classes OLSKStorageToolbar', function () {
			browser.assert.hasClass(LCHComposeStorageToolbar, 'OLSKStorageToolbar');
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
			browser.assert.elements('.LCHComposeMasterListItem', 2);
		});
		
		before(function () {
			return browser.OLSKLauncherRun('LCHComposeLauncherItemClone');
		});

		it('runs command', function () {
			browser.assert.elements('.LCHComposeMasterListItem', 3);
		});
	
	});	

});
