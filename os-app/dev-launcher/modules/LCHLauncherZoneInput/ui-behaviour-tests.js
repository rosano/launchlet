import { throws, deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = '/modules/LCHLauncherZoneInput';

describe.skip('LCHLauncherZoneInputInteraction', function testLCHLauncherZoneInputInteraction() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});

	it('runs callback on click', async function() {
		deepEqual(browser.query('#LCHLauncherZoneInputTestClick').textContent, '0');

		browser.click(LCHLauncherZoneInput);
		await browser.wait({ element: '.LCHLauncherZoneInput' });

		deepEqual(browser.query('#LCHLauncherZoneInputTestClick').textContent, '1');
	});

});
