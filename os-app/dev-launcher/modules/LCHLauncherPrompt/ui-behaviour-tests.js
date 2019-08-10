import { throws, deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = '/modules/LCHLauncherPrompt';

const LCHLauncherPrompt = '.LCHLauncherPrompt';
const LCHLauncherZoneInput = '.LCHLauncherZoneInput';
const LCHLauncherZoneInputPipeItem = '.LCHLauncherZoneInput .LCHLauncherPipeItem';
const LCHLauncherResultList = '.LCHLauncherResultList';
const LCHLauncherResultListItem = '.LCHLauncherResultListItem';

describe('LCHLauncherPromptElements', function testLCHLauncherPromptElements() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(LCHLauncherPrompt, 1);

		browser.assert.elements(LCHLauncherZoneInput, 1);
		browser.assert.elements(LCHLauncherZoneInputPipeItem, 0);

		browser.assert.elements(LCHLauncherResultList, 1);
		browser.assert.elements(LCHLauncherResultListItem, 0);
	});

	it('on set single', async function() {
		await browser.pressButton('#LCHLauncherPromptTestSetPromptItemsSingle');

		browser.assert.elements(LCHLauncherZoneInputPipeItem, 1);

		browser.assert.elements(LCHLauncherResultListItem, 1);
	});
	
	it('on set multiple', async function() {
		await browser.pressButton('#LCHLauncherPromptTestSetPromptItemsMultiple');

		browser.assert.elements(LCHLauncherZoneInputPipeItem, 1);

		browser.assert.elements(LCHLauncherResultListItem, 3);
	});
	
	it('on set zero', async function() {
		await browser.pressButton('#LCHLauncherPromptTestSetPromptItemsZero');

		browser.assert.elements(LCHLauncherZoneInputPipeItem, 0);

		browser.assert.elements(LCHLauncherResultListItem, 0);
	});
	
	it('on HideResults', async function() {
		browser.check('#LCHLauncherPromptTestSetResultsHidden');
		await browser.pressButton('#LCHLauncherPromptTestSetPromptItemsMultiple');

		browser.assert.elements(LCHLauncherResultList, 0);
	});

});

describe('LCHLauncherPromptText', function testLCHLauncherPromptText() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});

	it('on startup', function() {
		browser.assert.text('.LCHLauncherZoneInputHeading', 'Undefined');
		browser.assert.text('#LCHLauncherPromptStubItemSelected', 'null');
	});

	it('on update HeaderText', async function() {
		browser.fill('#LCHLauncherPromptTestSetHeaderText', 'alfa');
		await browser.wait({ element: '.LCHLauncherZoneInputHeading' });

		browser.assert.text('.LCHLauncherZoneInputHeading', 'alfa');
	});

	it('on update FilterText', async function() {
		browser.fill('#LCHLauncherPromptTestSetFilterText', 'bravo');
		await browser.wait({ element: '.LCHLauncherZoneInputHeading' });

		browser.assert.text('.LCHLauncherZoneInputHeading', 'BRAVO');
	});
	
	it('on set single', async function() {
		await browser.pressButton('#LCHLauncherPromptTestSetPromptItemsSingle');

		browser.assert.text('#LCHLauncherPromptStubItemSelected', 'alfa');
	});
	
	it('on set multiple', async function() {
		await browser.pressButton('#LCHLauncherPromptTestSetPromptItemsMultiple');

		browser.assert.text('#LCHLauncherPromptStubItemSelected', 'bravo');
	});

});

describe('LCHLauncherPromptInteraction', function testLCHLauncherPromptInteraction() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on update MatchStop', async function() {
		browser.check('#LCHLauncherPromptTestSetMatchStop');
		await browser.wait({ element: '.LCHLauncherZoneInputHeading' });

		browser.assert.hasClass('.LCHLauncherZoneInputHeading', 'LCHLauncherZoneInputHeadingMatchStop');
	});

});
