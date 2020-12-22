const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uItem = function (inputData = 'alfa') {
	return {
		LCHDocumentID: inputData,
		LCHDocumentCallbackBody: '',
		LCHDocumentCreationDate: new Date('2019-02-23T13:56:36Z'),
		LCHDocumentModificationDate: new Date('2019-02-23T13:56:36Z'),
	};
};

describe('LCHComposeMaster_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			LCHComposeMasterFilterText: 'alfa',
			LCHComposeMasterListItems: JSON.stringify([uItem('alfa'), uItem('bravo')]),
			LCHComposeMasterListItemSelected: JSON.stringify(uItem('alfa')),
		});
	});
	
	describe('OLSKMasterList', function test_OLSKMasterList() {

		it('binds OLSKMasterListFilterText', function () {
			browser.assert.input('.OLSKMasterListFilterField', 'alfa');
		});

		it('sets OLSKMasterListItemAccessibilitySummaryFor', function () {
			browser.assert.attribute('.OLSKResultsListItem:nth-child(1) .OLSKMasterListItem', 'aria-label', 'Untitled');
		});

		it('sets OLSKMasterListItemSelected', function () {
			browser.assert.hasClass('.OLSKResultsListItem:nth-child(1)', 'OLSKResultsListItemSelected');
		});

		context('input', function () {
		
			before(function () {
				browser.assert.text('#TestLCHComposeMasterDispatchFilter', '0');
				browser.assert.text('#TestLCHComposeMasterDispatchFilterData', 'undefined');
			});

			before(function () {
				browser.fill('.OLSKMasterListFilterField', 'charlie');
			});

			it('sends LCHComposeMasterDispatchFilter', function () {
				browser.assert.text('#TestLCHComposeMasterDispatchFilter', '1');
				browser.assert.text('#TestLCHComposeMasterDispatchFilterData', 'charlie');
			});
		
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
				browser.assert.text('#TestLCHComposeMasterDispatchClickData', JSON.stringify(uItem()));
			});
		
		});

	});

	describe('LCHComposeMasterCreateButton', function test_LCHComposeMasterCreateButton () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

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

		it('sets OLSKMasterListItemAccessibilitySummaryFor', function () {
			browser.assert.attribute('.OLSKMasterListItem', 'aria-label', '[Flagged]\nbravo');
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
				LCHComposeMasterFilterText: 'alfa',
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
