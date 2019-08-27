import { deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = '/launcher?loadRecipes=LCHLargeText';

describe('LCHLargeTextUIFeature', function () {

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
