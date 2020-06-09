import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uFilter = function (inputData) {
	browser.fill('.LCHLauncherFilterInput', inputData);
	return browser.wait({ elemen: '.OLSKResultsListItem' });
};

describe('LCHVitrineDemoCommit', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	context('LCHVitrinePageColoursRandomize', function () {

		const elementQuery = 'style.LCHVitrinePageColoursRandomize';

		before(async function () {
			browser.click(LCHVitrineDemoButtonCommit);
			await browser.wait({element: '.LCHLauncherFilterInput'});
		});

		let item, initialContent;
		
		it('adds style element', async function() {
			await uFilter('random');

			browser.click('.OLSKResultsListItem');
			await browser.wait({element: elementQuery});

			browser.assert.elements(elementQuery, 1);

			item = browser.query(elementQuery);
			initialContent = item.innerHTML;
		});
		
		it('sets --LCHCommonBackground', async function() {
			deepEqual(initialContent.includes('--LCHCommonBackground'), true);
		});
		
		it('sets --LCHCommonForeground', async function() {
			deepEqual(initialContent.includes('--LCHCommonForeground'), true);
		});
		
		it('updates element', async function() {
			browser.click(LCHVitrineDemoButtonCommit);
			await browser.wait({element: '.LCHLauncherFilterInput'});

			await uFilter('random');

			browser.click('.OLSKResultsListItem');
			await browser.wait({element: elementQuery});

			deepEqual(item, browser.query(elementQuery));
		});
		
		it('updates declarations', async function() {
			deepEqual(initialContent !== browser.query(elementQuery).innerHTML, true);
		});
	
	});

	context('LCHVitrinePageColoursRestore', function () {

		const elementQuery = 'style.LCHVitrinePageColoursRandomize';

		before(async function () {
			browser.query('style').remove();
			
			browser.click(LCHVitrineDemoButtonCommit);
			await browser.wait({element: '.LCHLauncherFilterInput'});
		});

		let item, initialContent;
		
		it('hides recipe', async function() {
			await uFilter('colour');
			browser.assert.elements('.OLSKResultsListItem', 1);
		});
		
		it('shows after execute sibling', async function() {
			browser.click('.OLSKResultsListItem');
			await browser.wait({element: elementQuery});

			browser.click(LCHVitrineDemoButtonCommit);
			await browser.wait({element: '.LCHLauncherFilterInput'});
			await uFilter('colour');
			browser.assert.elements('.OLSKResultsListItem', 2);
		});
		
		it('removes element', async function() {
			browser.click('.OLSKResultsListItem');
			await browser.wait({element: elementQuery});

			browser.assert.elements(elementQuery, 0);
		});
	
	});

	context('LCHVitrineSendEmail', function () {

		before(async function () {
			browser.click(LCHVitrineDemoButtonCommit);
			await browser.wait({element: '.LCHLauncherFilterInput'});
		});
		
		it('opens mailto', async function() {
			await uFilter('send');

			browser.assert.OLSKAlertText(function () {
				return browser.click('.OLSKResultsListItem');
			}, 'mailto:');
		});
	
	});

	context('LCHVitrineCopyPageInfo', function () {

		before(async function () {
			browser.click(LCHVitrineDemoButtonCommit);
			await browser.wait({element: '.LCHLauncherFilterInput'});
		});
		
		it('copies to clipboard', async function() {
			await uFilter('info');

			browser.assert.OLSKAlertText(function () {
				return browser.click('.OLSKResultsListItem');
			}, 'Copied to clipboard');
		});
	
	});

});
