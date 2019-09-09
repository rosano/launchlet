import { deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = '/launcher?loadRecipes=actions/LCHCopyToClipboard';

describe('LCHCopyToClipboardUIFeature', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('focuses button', async function() {
		browser.fill(LCHLauncherFilterInput, 'LCHCopyToClipboardTest');
		await browser.wait({element: LCHLauncherListItem});

		browser.click(LCHLauncherListItem);
		await browser.wait({element: LCHCopyToClipboardButton});

		deepEqual(browser.document.activeElement, browser.query(LCHCopyToClipboardButton));
	});
	
	it.skip('closes on click', async function() {
		browser.pressButton(LCHCopyToClipboardButton);
		await browser.wait({element: LCHCopyToClipboardButton});

		browser.assert.elements(LCHLauncherFilterInput, 0);
	});

});
