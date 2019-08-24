import { deepEqual } from 'assert';


const browser = new OLSKBrowser();
Object.entries({
	LCHLauncherFilterInput: '#LCHLauncherFilterInput',

	LCHLargeTextContainer: '#LCHLargeTextContainer',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

const kDefaultRoutePath = '/launcher?loadRecipes=LCHLargeText';

describe('LCHLargeTextUITestDiscovery', function testDiscovery() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(LCHLargeTextContainer, 0);
	});

	it('on run', async function() {
		browser.fill(LCHLauncherFilterInput, 'LCHLargeTextTest');
		await browser.wait({element: LCHLauncherListItem});

		browser.click(LCHLauncherListItem);
		await browser.wait({element: LCHLargeTextContainer});

		browser.assert.elements(LCHLargeTextContainer, 1);
	});

	it('on click inside', async function() {
		browser.click(LCHLargeTextContainer);
		await browser.wait({element: LCHLauncherListItem});

		browser.assert.elements(LCHLargeTextContainer, 1);
	});

	it('on click outside', async function() {
		browser.click('textarea');
		await browser.wait({element: LCHLauncherListItem});

		browser.assert.elements(LCHLargeTextContainer, 0);
	});

});

describe('LCHLargeTextUITestInteraction', function testInteraction() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('displays input', async function() {
		browser.fill(LCHLauncherFilterInput, 'LCHLargeTextTest');
		await browser.wait({element: LCHLauncherListItem});

		browser.click(LCHLauncherListItem);
		await browser.wait({element: LCHLargeTextContainer});

		browser.assert.text(LCHLargeTextContainer, 'LCHLargeTextAlfa');
	});

});
