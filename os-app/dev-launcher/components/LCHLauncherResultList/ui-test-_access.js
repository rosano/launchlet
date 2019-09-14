import { deepEqual } from 'assert';
const kDefaultRoutePath = '/stubs/LCHLauncherResultList';

const LCHLauncherResultList = '.LCHLauncherResultList';
const LCHLauncherResultListItem = '.LCHLauncherResultListItem';
const LCHLauncherResultListEmpty = '.LCHLauncherResultListEmpty';

describe('LCHLauncherResultListUIElement', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(LCHLauncherResultList, 0);
		browser.assert.elements(LCHLauncherResultListItem, 0);

		browser.assert.elements(LCHLauncherResultListEmpty, 1);
	});
	
	it('on set single', async function() {
		browser.pressButton('#LCHLauncherResultListTestSetTestItemsSingle');
		await browser.wait({element: LCHLauncherResultListItem});

		browser.assert.elements(LCHLauncherResultList, 1);
		browser.assert.elements(LCHLauncherResultListItem, 1);
		
		browser.assert.elements(LCHLauncherResultListEmpty, 0);
	});
	
	it('on set multiple', async function() {
		browser.pressButton('#LCHLauncherResultListTestSetTestItemsMultiple');
		await browser.wait({element: LCHLauncherResultListItem});

		browser.assert.elements(LCHLauncherResultListItem, 3);
		
		browser.assert.elements(LCHLauncherResultListEmpty, 0);
	});
	
	it('on set zero', async function() {
		await browser.pressButton('#LCHLauncherResultListTestSetTestItemsZero');

		browser.assert.elements(LCHLauncherResultList, 0);
		browser.assert.elements(LCHLauncherResultListItem, 0);

		browser.assert.elements(LCHLauncherResultListEmpty, 1);
	});

});
