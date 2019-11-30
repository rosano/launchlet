import { deepEqual } from 'assert';

const kDefaultRoute = require('../../controller.js').OLSKControllerRoutes().shift();

describe('LCHComposeDetail_Misc', function () {

context('Clone', function testClone() {

	before(async function () {
		await browser.OLSKVisit(kDefaultRoute);

		await uCreateItem(browser);
		browser.fill(LCHComposeFormNameField, 'alfa');
		
		browser.pressButton(LCHComposeDetailToolbarCloneButton);
		await browser.wait({ element: `${ LCHComposeListItem }:nth-child(2)` });
	});

	it('creates new item', function() {
		browser.assert.elements(LCHComposeListItem, 2);
	});

	it('copies properties from previous item', function() {
		browser.assert.input(LCHComposeFormNameField, 'alfa');
	});

	it.skip('focuses LCHComposeFormNameField', async function() {
		deepEqual(browser.document.activeElement.id, LCHComposeFormNameField);
		// deepEqual(browser.document.activeElement, browser.query(LCHComposeFormNameField));
	});

});

});
