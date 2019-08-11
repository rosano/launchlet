import { throws, deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = '/modules/LCHLauncherResultList';

const LCHLauncherResultList = '.LCHLauncherResultList';
const LCHLauncherResultListItem = '.LCHLauncherResultListItem';
const LCHLauncherResultListEmpty = '.LCHLauncherResultListEmpty';

describe('LCHLauncherResultListElements', function testLCHLauncherResultListElements() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(LCHLauncherResultList, 0);
		browser.assert.elements(LCHLauncherResultListItem, 0);

		browser.assert.elements(LCHLauncherResultListEmpty, 1);
	});
	
	it('on set single', async function() {
		browser.pressButton('#LCHLauncherZoneInputTestSetTestItemsSingle');
		await browser.wait({element: LCHLauncherResultListItem});

		browser.assert.elements(LCHLauncherResultList, 1);
		browser.assert.elements(LCHLauncherResultListItem, 1);
		
		browser.assert.elements(LCHLauncherResultListEmpty, 0);
	});
	
	it('on set multiple', async function() {
		browser.pressButton('#LCHLauncherZoneInputTestSetTestItemsMultiple');
		await browser.wait({element: LCHLauncherResultListItem});

		browser.assert.elements(LCHLauncherResultListItem, 3);
		
		browser.assert.elements(LCHLauncherResultListEmpty, 0);
	});
	
	it('on set zero', async function() {
		await browser.pressButton('#LCHLauncherZoneInputTestSetTestItemsZero');

		browser.assert.elements(LCHLauncherResultList, 0);
		browser.assert.elements(LCHLauncherResultListItem, 0);

		browser.assert.elements(LCHLauncherResultListEmpty, 1);
	});

});

describe('LCHLauncherResultListText', function testLCHLauncherResultListText() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});

	it('on startup', function() {
		browser.assert.text(LCHLauncherResultListEmpty, 'TestItemsZero');
	});

});

describe('LCHLauncherResultListInteraction', function testLCHLauncherResultListInteraction() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});

	it('selects none by default', async function() {
		await browser.pressButton('#LCHLauncherZoneInputTestSetTestItemsMultiple');

		browser.assert.elements(LCHLauncherResultListItem, 3);
		browser.assert.elements('.LCHLauncherResultListItemSelected', 0);
		browser.assert.text('#LCHLauncherZoneInputTestItemSelected', 'null');
	});

	it('adds class on set', async function() {
		await browser.pressButton('#LCHLauncherZoneInputTestSetTestItemSelected');

		browser.assert.elements('.LCHLauncherResultListItemSelected', 1);
		browser.assert.text('#LCHLauncherZoneInputTestItemSelected', 'bravo');
	});
	
	it('increments on ArrowDown', async function() {
		await browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');

		browser.assert.elements('.LCHLauncherResultListItemSelected', 1);
		browser.assert.hasClass(`${ LCHLauncherResultListItem }:nth-child(3)`, 'LCHLauncherResultListItemSelected');
		browser.assert.text('#LCHLauncherZoneInputTestItemSelected', 'charlie');
	});
	
	it('does nothing if selected item no longer exists', async function() {
		await browser.pressButton('#LCHLauncherZoneInputTestSetTestItemsSingle');

		browser.assert.elements('.LCHLauncherResultListItemSelected', 0);
		browser.assert.text('#LCHLauncherZoneInputTestItemSelected', 'charlie');
	});
	
	it('sets on click', async function() {
		await browser.click(LCHLauncherResultListItem);

		browser.assert.elements('.LCHLauncherResultListItemSelected', 1);
		browser.assert.text('#LCHLauncherZoneInputTestItemSelected', 'alfa');
	});
	
	it('does nothing if selected item still exists', async function() {
		await browser.pressButton('#LCHLauncherZoneInputTestSetTestItemsSingle');

		browser.assert.elements('.LCHLauncherResultListItemSelected', 1);
		browser.assert.text('#LCHLauncherZoneInputTestItemSelected', 'alfa');
	});
	
	it('decrements on ArrowUp', async function() {
		await browser.pressButton('#LCHLauncherZoneInputTestSetTestItemsMultiple');
		await browser.OLSKFireKeyboardEvent(browser.window, 'ArrowUp');

		browser.assert.elements('.LCHLauncherResultListItemSelected', 1);
		browser.assert.hasClass(`${ LCHLauncherResultListItem }:nth-child(3)`, 'LCHLauncherResultListItemSelected');
		browser.assert.text('#LCHLauncherZoneInputTestItemSelected', 'charlie');
	});

});
