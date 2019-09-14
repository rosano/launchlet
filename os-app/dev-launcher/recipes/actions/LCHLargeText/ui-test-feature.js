import { deepEqual } from 'assert';

const kDefaultRoutePath = '/launcher?loadRecipes=actions/LCHLargeText';

describe('LCHLargeTextFeature', function () {

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
