import { deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = '/launcher?loadRecipes=LCHCopyToClipboard';

Object.entries({
	LCHLauncherFilterInput: '#LCHLauncherFilterInput',

	LCHCopyToClipboardButton: '#LCHCopyToClipboardButton',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});


describe('LCHCopyToClipboardUIVisibility', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(LCHCopyToClipboardButton, 0);
	});

	it('on run', async function() {
		browser.fill(LCHLauncherFilterInput, 'LCHCopyToClipboardTest');
		await browser.wait({element: LCHLauncherListItem});

		browser.click(LCHLauncherListItem);
		await browser.wait({element: LCHCopyToClipboardButton});

		browser.assert.elements(LCHCopyToClipboardButton, 1);
	});

	it('on click', async function() {
		browser.pressButton(LCHCopyToClipboardButton);
		await browser.wait({element: LCHLauncherListItem});

		browser.assert.elements(LCHCopyToClipboardButton, 0);
	});

});
