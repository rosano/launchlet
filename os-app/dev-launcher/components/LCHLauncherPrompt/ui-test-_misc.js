import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLauncherPromptMisc', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	before(function () {
		browser.assert.text('#LCHLauncherPromptStubItemSelected', 'undefined');
	});

	context('set PromptItems', function() {
		
		before(function () {
			return browser.pressButton('#LCHLauncherPromptTestSetPromptItemsMultiple');
		});

		it('sets ResultItems', function() {
			browser.assert.elements('.LCHLauncherResultListItem', 3);
		});

	});

	context('set ItemSelected', function() {
		
		before(function () {
			return browser.pressButton('#LCHLauncherPromptTestSetStubItemSelected');
		});

		it('sets ItemSelected', function() {
			browser.assert.text('.LCHLauncherResultListItemSelected', 'bravo');
		});

	});

	context('ArrowDown', function() {
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
		});

		it('sends ResultListDispatchArrrow', function() {
			browser.assert.text('#LCHLauncherResultListTestResultListDispatchArrow', '1');
		});

	});

	context('ArrowUp', function() {
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
		});

		it('sends ResultListDispatchArrrow', function() {
			browser.assert.text('#LCHLauncherResultListTestResultListDispatchArrow', '2');
		});

	});

	context('click', function() {
		
		before(function () {
			return browser.click('.LCHLauncherResultListItem');
		});

		it('sends ResultListDispatchClick', function() {
			browser.assert.text('#LCHLauncherResultListTestResultListDispatchClick', '1');
		});

	});

});

