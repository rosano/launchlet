import { deepEqual } from 'assert';
const kDefaultRoutePath = '/stubs/LCHLauncherResultList';

const LCHLauncherResultList = '.LCHLauncherResultList';
const LCHLauncherResultListItem = '.LCHLauncherResultListItem';
const LCHLauncherResultListEmpty = '.LCHLauncherResultListEmpty';

describe('LCHLauncherResultListUIFeature', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});

	it('selects none by default', async function() {
		browser.pressButton('#LCHLauncherResultListTestSetTestItemsMultiple');
		await browser.wait({ element: LCHLauncherResultListItem });

		browser.assert.elements(LCHLauncherResultListItem, 3);
		browser.assert.elements('.LCHLauncherResultListItemSelected', 0);
		browser.assert.text('#LCHLauncherResultListTestItemSelected', 'null');
		browser.assert.text('#LCHLauncherResultListTestResultListDispatchArrow', '0');
		browser.assert.text('#LCHLauncherResultListTestResultListDispatchClick', '0');
	});

	it('adds class on set', async function() {
		await browser.pressButton('#LCHLauncherResultListTestSetTestItemSelected');

		browser.assert.elements('.LCHLauncherResultListItemSelected', 1);
		browser.assert.text('#LCHLauncherResultListTestItemSelected', 'bravo');
	});
	
	it('increments on ArrowDown', async function() {
		await browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');

		browser.assert.elements('.LCHLauncherResultListItemSelected', 1);
		browser.assert.hasClass(`${ LCHLauncherResultListItem }:nth-child(3)`, 'LCHLauncherResultListItemSelected');
		browser.assert.text('#LCHLauncherResultListTestItemSelected', 'charlie');
	});
	
	it('emits ResultListDispatchArrow on ArrowDown', async function() {
		browser.assert.text('#LCHLauncherResultListTestResultListDispatchArrow', '1');
	});
	
	it('does nothing if selected item no longer exists', async function() {
		await browser.pressButton('#LCHLauncherResultListTestSetTestItemsSingle');

		browser.assert.elements('.LCHLauncherResultListItemSelected', 0);
		browser.assert.text('#LCHLauncherResultListTestItemSelected', 'charlie');
	});
	
	it('sets on click', async function() {
		await browser.click(LCHLauncherResultListItem);

		browser.assert.elements('.LCHLauncherResultListItemSelected', 1);
		browser.assert.text('#LCHLauncherResultListTestItemSelected', 'alfa');
	});
	
	it('emits ResultListDispatchClick', async function() {
		browser.assert.text('#LCHLauncherResultListTestResultListDispatchClick', '1');
	});
	
	it('does nothing if selected item still exists', async function() {
		await browser.pressButton('#LCHLauncherResultListTestSetTestItemsSingle');

		browser.assert.elements('.LCHLauncherResultListItemSelected', 1);
		browser.assert.text('#LCHLauncherResultListTestItemSelected', 'alfa');
	});
	
	it('decrements on ArrowUp', async function() {
		await browser.pressButton('#LCHLauncherResultListTestSetTestItemsMultiple');
		await browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');

		browser.assert.elements('.LCHLauncherResultListItemSelected', 1);
		browser.assert.hasClass(`${ LCHLauncherResultListItem }:nth-child(3)`, 'LCHLauncherResultListItemSelected');
		browser.assert.text('#LCHLauncherResultListTestItemSelected', 'charlie');
	});

});
