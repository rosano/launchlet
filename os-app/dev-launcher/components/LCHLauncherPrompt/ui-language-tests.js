import { deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = '/components/LCHLauncherPrompt';

const LCHLauncherPrompt = '.LCHLauncherPrompt';
const LCHLauncherPromptItemSelected = '.LCHLauncherZoneInput .LCHLauncherPipeItem';
const LCHLauncherResultList = '.LCHLauncherResultList';
const LCHLauncherResultListItem = '.LCHLauncherResultListItem';

describe('LCHLauncherPromptUILanguage', function () {

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
