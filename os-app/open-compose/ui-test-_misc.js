import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHCompose_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('classes OLSKMobileViewInactive', function () {
		browser.assert.hasNoClass('.LCHComposeMaster', 'OLSKMobileViewInactive');
		browser.assert.hasClass('.LCHComposeDetail', 'OLSKMobileViewInactive');
	});

	it('sets LCHComposeDetailItem', function () {
		browser.assert.elements('.OLSKDetailPlaceholder', 1);
	});

	it('focuses LCHComposeMasterFilterField', function() {
		browser.assert.hasFocus('.LCHComposeMasterFilterField');
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

	context('back', function test_back () {

		before(function () {
			return browser.pressButton('.LCHComposeDetailToolbarBackButton');
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

	context('arrow', function test_arrow () {

		before(function () {
			return browser.focus('.LCHComposeMasterFilterField');
		});

		before(function() {
			browser.assert.hasClass('.LCHComposeMaster', 'LCHComposeMasterFocused');
		});
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
		});

		it('classes LCHComposeMasterFocused', function() {
			browser.assert.hasClass('.LCHComposeMaster', 'LCHComposeMasterFocused');
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
				browser.assert.hasFocus('.LCHComposeMasterFilterField');
			});

			before(function() {
				browser.assert.hasClass('.LCHComposeMaster', 'LCHComposeMasterFocused');
			});
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			});

			it('classes LCHComposeMasterFocused', function() {
				browser.assert.hasNoClass('.LCHComposeMaster', 'LCHComposeMasterFocused');
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
					browser.assert.hasNoClass('.LCHComposeMaster', 'LCHComposeMasterFocused');
				});

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Tab', {
						shiftKey: true,
					});
				});

				it('focuses LCHComposeMasterFilterField', function() {
					browser.assert.hasFocus('.LCHComposeMasterFilterField');
				});

				it('classes LCHComposeMasterFocused', function() {
					browser.assert.hasClass('.LCHComposeMaster', 'LCHComposeMasterFocused');
				});
			
			});
			
			context('master focused', function () {

				before(function() {
					browser.assert.hasFocus('.LCHComposeMasterFilterField');
				});

				before(function() {
					browser.assert.hasClass('.LCHComposeMaster', 'LCHComposeMasterFocused');
				});
				
				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Tab', {
						shiftKey: true,
					});
				});

				it('classes LCHComposeMasterFocused', function() {
					browser.assert.hasNoClass('.LCHComposeMaster', 'LCHComposeMasterFocused');
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
			browser.fill('.LCHComposeMasterFilterField', 'alfa');
		});

		before(function () {
			browser.assert.input('.LCHComposeMasterFilterField', 'alfa');
		});

		before(function () {
			browser.query('.LCHComposeInputFieldDebug').focus();
		});

		before(function () {
			deepEqual(browser.activeElement, browser.query('.LCHComposeInputFieldDebug'));
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});
		
		it('focuses LCHComposeMasterFilterField', function() {
			deepEqual(browser.activeElement, browser.query('.LCHComposeMasterFilterField'));
		});
		
		it('clears LCHComposeMasterFilterText', function() {
			browser.assert.input('.LCHComposeMasterFilterField', '');
		});

	});

	context('select', function test_select () {
		
		before(function () {
			return browser.click('.LCHComposeMasterListItem');
		});

		it('classes LCHComposeMasterFocused', function() {
			browser.assert.hasNoClass('.LCHComposeMaster', 'LCHComposeMasterFocused');
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
				browser.fill('.LCHComposeMasterFilterField', 'charlie');
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
				browser.fill('.LCHComposeMasterFilterField', 'a');
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
				browser.fill('.LCHComposeMasterFilterField', 'bravo');
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

			it('sets LCHComposeMasterListItemAccessibilitySummary', function () {
				browser.assert.attribute('.LCHComposeMasterListItem', 'aria-label', 'alfa');
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
				browser.assert.text('.LCHComposeMasterListItemTitle', 'bravoalfa');
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

	describe('LCHComposeStorageWidget', function test_LCHComposeStorageWidget () {
		
		it('classes LCHComposeStorageWidgetHidden', function () {
			browser.assert.hasClass(LCHComposeStorageWidget, 'LCHComposeStorageWidgetHidden');
		});

		context('click OLSKAppToolbarStorageButton', function () {
			
			before(function () {
				return browser.pressButton('.OLSKAppToolbarStorageButton');
			});
			
			it('classes LCHComposeStorageWidgetHidden', function () {
				browser.assert.hasNoClass(LCHComposeStorageWidget, 'LCHComposeStorageWidgetHidden');
			});
		
		});
	
	});

	describe('LCHComposeViewportFooter', function test_LCHComposeViewportFooter () {

		it('sets class', function () {
			browser.assert.hasClass(LCHComposeViewportFooter, 'OLSKMobileViewFooter');
		});

	});

	describe('OLSKAppToolbar', function test_OLSKAppToolbar () {

		it('sets OLSKAppToolbarGuideURL', function () {
			browser.assert.attribute('.OLSKAppToolbarGuideLink', 'href', require('../open-guide/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath);
		});

		it('sets OLSKAppToolbarDonateURL', function () {
			browser.assert.attribute('.OLSKAppToolbarDonateLink', 'href', process.env.LCH_SHARED_DONATE_URL);
		});

	});	

});
