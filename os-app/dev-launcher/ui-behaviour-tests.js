import { throws, deepEqual } from 'assert';

const Browser = require('zombie');

Browser.localhost('loc.tests', 3000);

Object.entries({
	LCHLauncherFilterInput: '#LCHLauncherFilterInput',

	LCHLauncherListItem: '.ListItem',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('LCHLauncher', function() {

describe('Discovery', function testDiscovery() {

	const browser = new Browser();

	before(function() {
		return browser.visit('/launcher');
	});

	it('on startup', function() {
		browser.assert.elements(LCHLauncherFilterInput, 1);
		
		browser.assert.elements(LCHLauncherListItem, 0);
	});

	it('on filter', async function() {
		browser.fill(LCHLauncherFilterInput, 'a');
		await browser.wait({ element: LCHLauncherListItem });

		browser.assert.elements(LCHLauncherListItem, 5);
	});

	context.skip('jump', function () {
		
		it('', async function() {
		});

	})

});

describe('Language', function testLanguage() {

	['en'].forEach(function (languageCode) {

		context(languageCode, function () {
			
			const browser = new Browser();
			const uLocalized = function (inputData) {
				return OLSKTestingLocalized(inputData, languageCode);
			};

			before(function() {
				return browser.visit(`${ languageCode }/launcher`);
			});

			it('localizes interface', function() {
				deepEqual(browser.query(LCHLauncherFilterInput).placeholder, uLocalized('LCHLauncherInputPlaceholderDefault'));
			});

			it.skip('on filter', async function() {
				browser.fill(LCHLauncherFilterInput, 'a');
				await browser.wait({ element: LCHLauncherListItem });

				// browser.assert.elements(LCHLauncherListItem, 1);
			});

		});
		
	});
});

describe('Interaction', function testInteraction() {

	const browser = new Browser();

	before(function() {
		return browser.visit('/launcher');
	});

	context('command', function () {
		
		it('shows no items on startup', function() {
			browser.assert.elements(LCHLauncherListItem, 0);
		});

		it('shows filtered items', async function() {
			browser.fill(LCHLauncherFilterInput, 'e');
			await browser.wait({ element: LCHLauncherListItem });
			
			browser.assert.elements(LCHLauncherListItem, 6);
		});

		it('selects first item', async function() {
			browser.fill(LCHLauncherFilterInput, 'a');
			await browser.wait({ element: LCHLauncherListItem });
			
			browser.assert.hasClass(browser.query(LCHLauncherListItem), 'ListItemSelected');
		});

	});

});

});
