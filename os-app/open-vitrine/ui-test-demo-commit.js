import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().LCHVitrineRoute;

const uFilter = function (inputData) {
	browser.fill(LCHLauncherFilterInput, inputData)
	return browser.wait({ elemen: '.LCHLauncherResultListItem' })
};

describe('LCHVitrineDemoCommit', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath)
	});

	context('LCHVitrineRandomizePageColours', function () {

		const elementQuery = 'style.LCHVitrineRandomizePageColours';

		before(async function () {
			browser.click(LCHVitrineDemoButtonCommit);
			await browser.wait({element: LCHLauncherFilterInput});
		});

		let item, initialContent;
		
		it('adds style element', async function() {
			await uFilter('random');

			browser.click('.LCHLauncherResultListItem');
			await browser.wait({element: elementQuery});

			browser.assert.elements(elementQuery, 1)

			item = browser.query(elementQuery)
			initialContent = item.innerHTML;
		});
		
		it('sets --LCHVitrineBackground', async function() {
			deepEqual(initialContent.includes('--LCHVitrineBackground'), true)
		});
		
		it('sets --LCHVitrineForeground', async function() {
			deepEqual(initialContent.includes('--LCHVitrineForeground'), true)
		});
		
		it('updates element', async function() {
			browser.click(LCHVitrineDemoButtonCommit);
			await browser.wait({element: LCHLauncherFilterInput});

			await uFilter('random');

			browser.click('.LCHLauncherResultListItem');
			await browser.wait({element: elementQuery});

			deepEqual(item, browser.query(elementQuery))
		});
		
		it('updates declarations', async function() {
			deepEqual(initialContent !== browser.query(elementQuery).innerHTML, true)
		});
	
	});

	context('LCHVitrineSendEmail', function () {

		before(async function () {
			browser.click(LCHVitrineDemoButtonCommit);
			await browser.wait({element: LCHLauncherFilterInput});
		});
		
		it('opens mailto', async function() {
			await uFilter('send');

			deepEqual(browser.OLSKAlert(function () {
				browser.click('.LCHLauncherResultListItem');
			}), 'mailto:')
		});
	
	});

});
