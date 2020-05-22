import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHComposeMaster_Misc', function () {

	describe('LCHComposeMaster', function test_LCHComposeMaster () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});
		
		it('classes OLSKViewportMaster', function () {
			browser.assert.hasClass(LCHComposeMaster, 'OLSKViewportMaster');
		});

		context('blur LCHComposeMasterFilterField', function() {

			before(function () {
				browser.assert.hasClass(LCHComposeMaster, 'LCHComposeMasterFocused');
			});

			before(function () {
				browser.click(LCHComposeMasterCreateButton);
			});
			
			it.skip('classes LCHComposeMasterFocused', function() {
				browser.assert.hasNoClass(LCHComposeMaster, 'LCHComposeMasterFocused');
			});

		});

		context('focus LCHComposeMasterFilterField', function() {

			before(function () {
				return browser.click(LCHComposeMasterFilterField);
			});
			
			it('classes LCHComposeMasterFocused', function() {
				browser.assert.hasClass(LCHComposeMaster, 'LCHComposeMasterFocused');
			});

		});

		context('OLSKMobileViewInactive', function () {

			before(function () {
				browser.assert.hasNoClass(LCHComposeMaster, 'OLSKMobileViewInactive');
			});

			before(function () {
				browser.assert.attribute(LCHComposeMaster, 'aria-hidden', null);
			});
			
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKMobileViewInactive: true,
				});
			});

			it('classes OLSKMobileViewInactive', function () {
				browser.assert.hasClass(LCHComposeMaster, 'OLSKMobileViewInactive');
			});

			it('sets aria-hidden', function () {
				browser.assert.attribute(LCHComposeMaster, 'aria-hidden', 'true');
			});
		
		});

		context('OLSKResultsDispatchArrow', function () {

			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					LCHComposeMasterListItems: JSON.stringify([{
						LCHDocumentID: 'alfa',
						LCHDocumentName: 'bravo',
					}, {
						LCHDocumentID: 'charlie',
						LCHDocumentName: 'delta',
					}, {
						LCHDocumentID: 'echo',
						LCHDocumentName: 'foxtrot',
					}]),
					LCHComposeMasterListItemSelected: JSON.stringify({
						LCHDocumentID: 'charlie',
						LCHDocumentName: 'delta',
					}),
				});
			});

			context('keydown ArrowUp', function() {

				before(function () {
					return browser.query('.LCHComposeMasterFilterField').focus();
				});
				
				before(function () {
					browser.assert.text('#TestLCHComposeMasterDispatchArrow', '0');
				});

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
				});

				it('sends LCHComposeMasterDispatchArrow', function () {
					browser.assert.text('#TestLCHComposeMasterDispatchArrow', '1');
					browser.assert.text('#TestLCHComposeMasterDispatchArrowData', JSON.stringify({
						LCHDocumentID: 'alfa',
						LCHDocumentName: 'bravo',
					}));
				});

			});
		
		});
	
	});

	describe('LCHComposeMasterToolbar', function test_LCHComposeMasterToolbar () {
		
		it('classes OLSKMobileViewHeader', function () {
			browser.assert.hasClass(LCHComposeMasterToolbar, 'OLSKMobileViewHeader');
		});
	
	});

	describe('LCHComposeMasterFilterField', function test_LCHComposeMasterFilterField() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeMasterFilterText: 'alfa',
			});
		});

		it('classes OLSKMobileSafariRemoveDefaultInputStyle', function () {
			browser.assert.hasClass(LCHComposeMasterFilterField, 'OLSKMobileSafariRemoveDefaultInputStyle');
		});

		it('binds LCHComposeMasterFilterText', function () {
			browser.assert.input(LCHComposeMasterFilterField, 'alfa');
		});

		it('sets OLSKInputWrapperValue', function () {
			browser.assert.elements('.OLSKInputWrapperClearButton', 1);
		});
			
		context('input', function () {
		
			before(function () {
				browser.assert.text('#TestLCHComposeMasterDispatchFilter', '0');
				browser.assert.text('#TestLCHComposeMasterDispatchFilterData', 'undefined');
			});

			before(function () {
				browser.fill(LCHComposeMasterFilterField, 'bravo');
			});

			it('sends LCHComposeMasterDispatchFilter', function () {
				browser.assert.text('#TestLCHComposeMasterDispatchFilter', '1');
				browser.assert.text('#TestLCHComposeMasterDispatchFilterData', 'bravo');
			});
		
		});

		context('clear', function () {

			before(function () {
				return browser.pressButton('.OLSKInputWrapperClearButton');
			});

			it('sends LCHComposeMasterDispatchFilter', function () {
				browser.assert.text('#TestLCHComposeMasterDispatchFilter', '2');
				browser.assert.text('#TestLCHComposeMasterDispatchFilterData', '');
			});
		
		});

	});

	describe('LCHComposeMasterCreateButton', function test_LCHComposeMasterCreateButton () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(LCHComposeMasterCreateButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(LCHComposeMasterCreateButton, 'OLSKLayoutElementTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(LCHComposeMasterCreateButton, 'OLSKToolbarButton');
		});
		
		it('sets accesskey', function () {
			browser.assert.attribute(LCHComposeMasterCreateButton, 'accesskey', 'n');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestLCHComposeMasterDispatchCreate', '0');
			});
			
			before(function () {
				return browser.pressButton(LCHComposeMasterCreateButton);
			});

			it('sends LCHComposeMasterDispatchCreate', function () {
				browser.assert.text('#TestLCHComposeMasterDispatchCreate', '1');
			});
		
		});
	
	});

	describe('LCHComposeMasterCreateButtonImage', function test_LCHComposeMasterCreateButtonImage () {

		it('sets src', function () {
			browser.assert.elements(`${ LCHComposeMasterCreateButtonImage } #_OLSKSharedCreate`, 1);
		});
	
	});

	describe('LCHComposeMasterBody', function test_LCHComposeMasterBody () {
		
		it('classes OLSKMobileViewBody', function () {
			browser.assert.hasClass(LCHComposeMasterBody, 'OLSKMobileViewBody');
		});
	
	});

	describe('LCHComposeMasterListItem', function test_LCHComposeMasterListItem() {

		const item = {
			LCHDocumentID: 'alfa',
			LCHDocumentName: 'bravo',
			LCHDocumentIsFlagged: true,
		};
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeMasterListItems: JSON.stringify([item]),
			});
		});

		it('sets LCHComposeMasterListItemAccessibilitySummary', function () {
			browser.assert.attribute('.LCHComposeMasterListItem', 'aria-label', '[Flagged]\nbravo');
		});

		it('sets LCHComposeMasterListItemTitle', function () {
			browser.assert.text('.LCHComposeMasterListItemTitle', 'bravo');
		});

		it('sets LCHComposeMasterListItemTitle', function () {
			browser.assert.hasClass('.LCHComposeMasterListItem', 'LCHComposeMasterListItemFlagged');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestLCHComposeMasterDispatchClick', '0');
				browser.assert.text('#TestLCHComposeMasterDispatchClickData', 'undefined');
			});
			
			before(function () {
				return browser.click('.LCHComposeMasterListItem');
			});

			it('sends LCHComposeMasterDispatchClick', function () {
				browser.assert.text('#TestLCHComposeMasterDispatchClick', '1');
				browser.assert.text('#TestLCHComposeMasterDispatchClickData', JSON.stringify(item));
			});
		
		});
		
	});

	describe('LCHComposeMasterListItemSelected', function test_LCHComposeMasterListItemSelected() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				LCHComposeMasterListItems: JSON.stringify([{
					LCHDocumentID: 'alfa',
					LCHDocumentName: 'bravo',
				}, {
					LCHDocumentID: 'charlie',
					LCHDocumentName: 'delta',
				}]),
				LCHComposeMasterListItemSelected: JSON.stringify({
					LCHDocumentID: 'charlie',
					LCHDocumentName: 'delta',
				}),
			});
		});

		it('sets OLSKResultsListItemSelected', function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 1);
			browser.assert.hasClass('.OLSKResultsListItem:nth-child(2)', 'OLSKResultsListItemSelected');
		});
		
	});

});
