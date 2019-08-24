import { deepEqual } from 'assert';


const browser = new OLSKBrowser();
Object.entries({
	LCHLauncherFilterInput: '#LCHLauncherFilterInput',

	LCHLargeTypeContainer: '#LCHLargeTypeContainer',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

const kDefaultRoutePath = '/launcher?loadRecipes=LCHLargeType';

describe.only('LCHLargeTypeUITestDiscovery', function testDiscovery() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(LCHLargeTypeContainer, 0);
	});

	it('on run', async function() {
		browser.fill(LCHLauncherFilterInput, 'LCHLargeTypeTest');
		await browser.wait({element: LCHLauncherListItem});

		browser.click(LCHLauncherListItem);
		await browser.wait({element: LCHLargeTypeContainer});

		browser.assert.elements(LCHLargeTypeContainer, 1);
	});

	it('on click inside', async function() {
		browser.click(LCHLargeTypeContainer);
		await browser.wait({element: LCHLauncherListItem});

		browser.assert.elements(LCHLargeTypeContainer, 1);
	});

	it('on click outside', async function() {
		browser.click('textarea');
		await browser.wait({element: LCHLauncherListItem});

		browser.assert.elements(LCHLargeTypeContainer, 0);
	});

});

describe('LCHLargeTypeUITestInteraction', function testInteraction() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('displays input', async function() {
		browser.fill(LCHLauncherFilterInput, 'LCHLargeTypeTest');
		await browser.wait({element: LCHLauncherListItem});

		browser.click(LCHLauncherListItem);
		await browser.wait({element: LCHLargeTypeContainer});

		browser.assert.text(LCHLargeTypeContainer, 'LCHLargeTypeAlfa');
	});

});
