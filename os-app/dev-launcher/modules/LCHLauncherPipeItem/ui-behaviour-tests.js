import { throws, deepEqual } from 'assert';

const Browser = require('zombie');

Browser.localhost('loc.tests', 3000);

const browser = new Browser();
const kDefaultRoutePath = '/modules/LCHLauncherPipeItem';
const LCHLauncherPipeItem = '.LCHLauncherPipeItem';

describe('LCHLauncherPipeItemDiscovery', function testLCHLauncherPipeItemDiscovery() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(LCHLauncherPipeItem, 1);
	});

});

describe('LCHLauncherPipeItemLanguage', function testLCHLauncherPipeItemLanguage() {

	['en'].forEach(function (languageCode) {

		context(languageCode, function () {

			const uLocalized = function (inputData) {
				return OLSKTestingLocalized(inputData, languageCode);
			};

			before(function() {
				return browser.visit(kDefaultRoutePath);
			});

			it('on startup', function() {
				deepEqual(browser.query(LCHLauncherPipeItem).textContent, 'alfa');
			});

		});
		
	});
});
