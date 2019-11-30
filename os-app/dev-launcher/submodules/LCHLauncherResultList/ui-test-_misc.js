import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHLauncherResultList_Misc', function () {

before(function() {
	return browser.OLSKVisit(kDefaultRoute);
});

before(function () {
	browser.assert.elements('.LCHLauncherResultListItemSelected', 0);
	browser.assert.text('#LCHLauncherResultListTestItemSelected', 'null');
	browser.assert.text('#LCHLauncherResultListTestResultListDispatchArrow', '0');
	browser.assert.text('#LCHLauncherResultListTestResultListDispatchClick', '0');
});

context('set initial', function () {

	before(function() {
		browser.pressButton('#LCHLauncherResultListTestSetTestItemsMultiple');
	});

	it('selects none', function() {
		browser.assert.elements('.LCHLauncherResultListItemSelected', 0);
	});

});

context('select', function () {
	
	before(function () {
		browser.pressButton('#LCHLauncherResultListTestSetTestItemSelected');
	});

	it('sets class', function() {
		browser.assert.elements('.LCHLauncherResultListItemSelected', 1);
		browser.assert.text('.LCHLauncherResultListItemSelected', 'bravo');
	});

});

context('ArrowDown', function () {
	
	before(function () {
		return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
	});

	it('sets class', function() {
		browser.assert.elements('.LCHLauncherResultListItemSelected', 1);
		browser.assert.text('.LCHLauncherResultListItemSelected', 'charlie');
	});

	it('sends ResultListDispatchArrow', function() {
		browser.assert.text('#LCHLauncherResultListTestResultListDispatchArrow', '1');
	});

	it('sends detail', function() {
		browser.assert.text('#LCHLauncherResultListTestItemSelected', 'charlie');
	});

});

context('ArrowUp', function () {
	
	before(function () {
		return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
	});

	it('sets class', function() {
		browser.assert.elements('.LCHLauncherResultListItemSelected', 1);
		browser.assert.text('.LCHLauncherResultListItemSelected', 'bravo');
	});

	it('sends ResultListDispatchArrow', function() {
		browser.assert.text('#LCHLauncherResultListTestResultListDispatchArrow', '2');
	});

	it('sends detail', function() {
		browser.assert.text('#LCHLauncherResultListTestItemSelected', 'bravo');
	});

});

context('change items exclude selected', function () {
	
	before(function () {
		browser.pressButton('#LCHLauncherResultListTestSetTestItemsSingle');
	});

	it('selects none', function () {
		browser.assert.elements('.LCHLauncherResultListItemSelected', 0);
	});

});

context('click item', function () {
	
	before(function () {
		return browser.click(LCHLauncherResultListItem);
	});

	it('sets class', function () {
		browser.assert.elements('.LCHLauncherResultListItemSelected', 1);
		browser.assert.text('.LCHLauncherResultListItemSelected', 'alfa');
	});

	it('sends ResultListDispatchClick', function() {
		browser.assert.text('#LCHLauncherResultListTestResultListDispatchClick', '1');
	});

	it('sends detail', function() {
		browser.assert.text('#LCHLauncherResultListTestItemSelected', 'alfa');
	});

});

context('set items include selected', function () {

	before(function () {
		browser.pressButton('#LCHLauncherResultListTestSetTestItemsSingle');
	});
	
	it('keeps previous selection', function () {
		browser.assert.text('.LCHLauncherResultListItemSelected', 'alfa');
	});

});

context('ArrowUp on first item', function () {

	before(function () {
		return browser.pressButton('#LCHLauncherResultListTestSetTestItemsMultiple');
	});
	
	before(function () {
		return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');
	});

	it('sets to last', function() {
		browser.assert.elements('.LCHLauncherResultListItemSelected', 1);
		browser.assert.text('.LCHLauncherResultListItemSelected', 'charlie');
	});

});

context('ArrowDown on last item', function () {
	
	before(function () {
		return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
	});

	it('sets to first', function() {
		browser.assert.elements('.LCHLauncherResultListItemSelected', 1);
		browser.assert.text('.LCHLauncherResultListItemSelected', 'alfa');
	});

});

});
