import { throws, deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = '/modules/LCHLauncherPrompt';

const LCHLauncherPrompt = '.LCHLauncherPrompt';
const LCHLauncherZoneInput = '.LCHLauncherZoneInput';
const LCHLauncherZoneInputPipeItem = '.LCHLauncherZoneInput .LCHLauncherPipeItem';
const LCHLauncherResultList = '.LCHLauncherResultList';
const LCHLauncherResultListItem = '.LCHLauncherResultListItem';

describe.only('LCHLauncherPromptElements', function testLCHLauncherPromptElements() {

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

		browser.assert.elements(LCHLauncherResultListItem, 1);
		browser.assert.elements(LCHLauncherZoneInputPipeItem, 1);
	});
	
	it('on set multiple', async function() {
		await browser.pressButton('#LCHLauncherPromptTestSetPromptItemsMultiple');

		browser.assert.elements(LCHLauncherResultListItem, 3);
		browser.assert.elements(LCHLauncherZoneInputPipeItem, 1);
	});
	
	it('on set zero', async function() {
		await browser.pressButton('#LCHLauncherPromptTestSetPromptItemsZero');

		browser.assert.elements(LCHLauncherResultListItem, 0);
		browser.assert.elements(LCHLauncherZoneInputPipeItem, 0);
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
