import { throws, deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = '/modules/LCHLauncherResultList';
const LCHLauncherResultList = '.LCHLauncherResultList';
const LCHLauncherResultListItem = '.LCHLauncherResultListItem';
const LCHLauncherResultListEmpty = '.LCHLauncherResultListEmpty';

describe.only('LCHLauncherResultListElements', function testLCHLauncherResultListElements() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(LCHLauncherResultList, 1);

		browser.assert.elements(LCHLauncherResultListItem, 0);

		browser.assert.elements(LCHLauncherResultListEmpty, 1);
	});
	
	it('on set single', async function() {
		await browser.pressButton('#LCHLauncherZoneInputTestSetTestItemsSingle');

		browser.assert.elements(LCHLauncherResultListItem, 1);
		
		browser.assert.elements(LCHLauncherResultListEmpty, 0);
	});
	
	it('on set multiple', async function() {
		await browser.pressButton('#LCHLauncherZoneInputTestSetTestItemsMultiple');

		browser.assert.elements(LCHLauncherResultListItem, 3);
		
		browser.assert.elements(LCHLauncherResultListEmpty, 0);
	});
	
	it('on set zero', async function() {
		await browser.pressButton('#LCHLauncherZoneInputTestSetTestItemsZero');

		browser.assert.elements(LCHLauncherResultListItem, 0);

		browser.assert.elements(LCHLauncherResultListEmpty, 1);
	});

});

describe.only('LCHLauncherResultListText', function testLCHLauncherResultListText() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});

	it('on startup', function() {
		browser.assert.text(LCHLauncherResultListEmpty, 'TestItemsZero');
	});

});

describe.only('LCHLauncherResultListInteraction', function testLCHLauncherResultListInteraction() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});

	context('SelectedIndex', function() {
		
		it('defaults to 0', async function() {
			await browser.pressButton('#LCHLauncherZoneInputTestSetTestItemsMultiple');

			browser.assert.hasClass(`${ LCHLauncherResultListItem }:nth-child(1)`, 'LCHLauncherResultListItemSelected');
			browser.assert.elements('.LCHLauncherResultListItemSelected', 1);
			browser.assert.text('#LCHLauncherZoneInputTestItemSelected', 'alfa');
		});
		
		it('increments on ArrowDown', async function() {
			await browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');

			browser.assert.elements('.LCHLauncherResultListItemSelected', 1);
			browser.assert.hasClass(`${ LCHLauncherResultListItem }:nth-child(2)`, 'LCHLauncherResultListItemSelected');
			browser.assert.text('#LCHLauncherZoneInputTestItemSelected', 'bravo');
		});
		
		it('sets to 0 on result change', async function() {
			await browser.pressButton('#LCHLauncherZoneInputTestSetTestItemsSingle');

			browser.assert.hasClass(LCHLauncherResultListItem, 'LCHLauncherResultListItemSelected');
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
		
		it('sets on click', async function() {
			await browser.click(`${ LCHLauncherResultListItem }:nth-child(2)`);

			browser.assert.elements('.LCHLauncherResultListItemSelected', 1);
			browser.assert.hasClass(`${ LCHLauncherResultListItem }:nth-child(2)`, 'LCHLauncherResultListItemSelected');
			browser.assert.text('#LCHLauncherZoneInputTestItemSelected', 'bravo');
		});

	});

});
