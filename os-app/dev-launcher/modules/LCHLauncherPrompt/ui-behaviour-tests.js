import { throws, deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = '/modules/LCHLauncherPrompt';

const kLCHLauncherPrompt = '.LCHLauncherPrompt';
const kLCHLauncherZoneInput = '.LCHLauncherZoneInput';
const kLCHLauncherZoneInputPipeItem = '.LCHLauncherZoneInput .LCHLauncherPipeItem';
const kLCHLauncherResultList = '.LCHLauncherResultList';
const kLCHLauncherResultListItem = '.LCHLauncherResultListItem';

describe.only('LCHLauncherPromptElements', function testLCHLauncherPromptElements() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(kLCHLauncherPrompt, 1);

		browser.assert.elements(kLCHLauncherZoneInput, 1);
		browser.assert.elements(kLCHLauncherZoneInputPipeItem, 0);

		browser.assert.elements(kLCHLauncherResultList, 1);
		browser.assert.elements(kLCHLauncherResultListItem, 0);
	});

	it('on set single', async function() {
		await browser.pressButton('#LCHLauncherPromptTestSetPromptItemsSingle');

		browser.assert.elements(kLCHLauncherResultListItem, 1);
		browser.assert.elements(kLCHLauncherZoneInputPipeItem, 1);
	});
	
	it('on set multiple', async function() {
		await browser.pressButton('#LCHLauncherPromptTestSetPromptItemsMultiple');

		browser.assert.elements(kLCHLauncherResultListItem, 3);
		browser.assert.elements(kLCHLauncherZoneInputPipeItem, 1);
	});
	
	it('on set zero', async function() {
		await browser.pressButton('#LCHLauncherPromptTestSetPromptItemsZero');

		browser.assert.elements(kLCHLauncherResultListItem, 0);
		browser.assert.elements(kLCHLauncherZoneInputPipeItem, 0);
	});

});

describe.only('LCHLauncherPromptText', function testLCHLauncherPromptText() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});

	it('on startup', function() {
		browser.assert.text('.LCHLauncherZoneInputHeading', 'Undefined');
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

});

describe.only('LCHLauncherPromptInteraction', function testLCHLauncherPromptInteraction() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on update MatchStop', async function() {
		browser.check('#LCHLauncherPromptTestSetMatchStop');
		await browser.wait({ element: '.LCHLauncherZoneInputHeading' });

		browser.assert.hasClass('.LCHLauncherZoneInputHeading', 'LCHLauncherZoneInputHeadingMatchStop');
	});

});
