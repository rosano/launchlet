import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLauncherPrompt_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	before(function () {
		browser.assert.text('#LCHLauncherPromptStubItemSelected', 'undefined');
	});

	context('set PromptItems', function() {
		
		before(function () {
			return browser.pressButton('#LCHLauncherPromptTestSetPromptItemsMultiple');
		});

		it('sets ResultItems', function() {
			browser.assert.elements('.OLSKResultsListItem', 3);
		});

	});

	context('set ItemSelected', function() {
		
		before(function () {
			return browser.pressButton('#LCHLauncherPromptTestSetStubItemSelected');
		});

		it('sets ItemSelected', function() {
			browser.assert.text('.OLSKResultsListItemSelected', 'bravo');
		});

	});

	context('ArrowDown', function() {
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
		});

		it('sends ResultListDispatchArrrow', function() {
			browser.assert.text('#OLSKResultsListTestResultListDispatchArrow', '1');
		});

	});

	context('ArrowUp', function() {
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
		});

		it('sends ResultListDispatchArrrow', function() {
			browser.assert.text('#OLSKResultsListTestResultListDispatchArrow', '2');
		});

	});

	context('click', function() {
		
		before(function () {
			return browser.click('.OLSKResultsListItem');
		});

		it('sends ResultListDispatchClick', function() {
			browser.assert.text('#OLSKResultsListTestResultListDispatchClick', '1');
		});

	});

});

