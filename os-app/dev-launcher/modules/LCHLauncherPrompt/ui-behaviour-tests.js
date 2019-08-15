import { deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = '/modules/LCHLauncherPrompt';

const LCHLauncherPrompt = '.LCHLauncherPrompt';
const LCHLauncherPromptItemSelected = '.LCHLauncherZoneInput .LCHLauncherPipeItem';
const LCHLauncherResultList = '.LCHLauncherResultList';
const LCHLauncherResultListItem = '.LCHLauncherResultListItem';

describe('LCHLauncherPromptElements', function testLCHLauncherPromptElements() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(LCHLauncherPrompt, 1);

		browser.assert.elements(LCHLauncherPromptItemSelected, 0);

		browser.assert.elements(LCHLauncherResultList, 0);
	});

	it('on set single', async function() {
		browser.pressButton('#LCHLauncherPromptTestSetPromptItemsSingle');
		await browser.wait({element: LCHLauncherResultListItem});

		browser.assert.elements(LCHLauncherResultListItem, 1);
	});
	
	it('on set multiple', async function() {
		browser.pressButton('#LCHLauncherPromptTestSetPromptItemsMultiple');
		await browser.wait({element: LCHLauncherResultListItem});

		browser.assert.elements(LCHLauncherResultListItem, 3);
	});
	
	it('on set zero', async function() {
		browser.pressButton('#LCHLauncherPromptTestSetPromptItemsZero');
		await browser.wait({element: LCHLauncherResultListItem});

		browser.assert.elements(LCHLauncherResultListItem, 0);
	});
	
	it('on ResultsHidden', async function() {
		browser.check('#LCHLauncherPromptTestSetResultsHidden');
		await browser.pressButton('#LCHLauncherPromptTestSetPromptItemsMultiple');

		browser.assert.elements(LCHLauncherResultList, 0);
	});
	
	it('on set ItemSelected', async function() {
		await browser.pressButton('#LCHLauncherPromptTestSetStubItemSelected');
		
		browser.assert.elements(LCHLauncherPromptItemSelected, 1);
	});
	
	it('on ItemSelectedHidden', async function() {
		await browser.check('#LCHLauncherPromptTestSetItemSelectedHidden');

		browser.assert.elements(LCHLauncherPromptItemSelected, 0);
	});

});

describe('LCHLauncherPromptLanguage', function testLCHLauncherPromptLanguage() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});

	it('on startup', function() {
		browser.assert.text('#LCHLauncherPromptStubItemSelected', 'undefined');
	});

	it('does nothing on set', async function() {
		browser.pressButton('#LCHLauncherPromptTestSetPromptItemsMultiple');
		await browser.wait({element: LCHLauncherResultListItem});

		browser.assert.text('#LCHLauncherPromptStubItemSelected', 'undefined');
	});
	
	it('on set selected', async function() {
		await browser.pressButton('#LCHLauncherPromptTestSetStubItemSelected');
		
		browser.assert.text('#LCHLauncherPromptStubItemSelected', 'bravo');
	});

});

describe('LCHLauncherPromptInteraction', function testLCHLauncherPromptInteraction() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('bubbles ResultListDispatchArrow', async function() {
		browser.pressButton('#LCHLauncherPromptTestSetPromptItemsMultiple');
		await browser.wait({element: LCHLauncherResultListItem});

		browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
		await browser.wait({element: LCHLauncherResultListItem});

		browser.assert.text('#LCHLauncherResultListTestResultListDispatchArrow', '1');
	});
	
	it('bubbles ResultListDispatchClick', async function() {
		await browser.click(LCHLauncherResultListItem);

		browser.assert.text('#LCHLauncherResultListTestResultListDispatchClick', '1');
	});

});

