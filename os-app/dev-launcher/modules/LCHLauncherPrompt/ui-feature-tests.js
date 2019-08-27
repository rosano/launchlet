import { deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = '/modules/LCHLauncherPrompt';

const LCHLauncherPrompt = '.LCHLauncherPrompt';
const LCHLauncherPromptItemSelected = '.LCHLauncherZoneInput .LCHLauncherPipeItem';
const LCHLauncherResultList = '.LCHLauncherResultList';
const LCHLauncherResultListItem = '.LCHLauncherResultListItem';

describe('LCHLauncherPromptUIFeature', function () {

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

