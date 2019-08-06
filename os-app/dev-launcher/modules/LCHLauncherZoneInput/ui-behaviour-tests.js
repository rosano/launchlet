'use strict'
import { throws, deepEqual } from 'assert';

const Browser = require('zombie');

Browser.localhost('loc.tests', 3000);

const browser = new Browser();
const kDefaultRoutePath = '/modules/LCHLauncherZoneInput';
const LCHLauncherZoneInputText = '#LCHLauncherZoneInputText';

describe.only('LCHLauncherZoneInputDiscovery', function testLCHLauncherZoneInputDiscovery() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(LCHLauncherZoneInputText, 1);
	});

});

describe.only('LCHLauncherZoneInputLanguage', function testLCHLauncherZoneInputLanguage() {

	['en'].forEach(function (languageCode) {

		context(languageCode, function () {

			const uLocalized = function (inputData) {
				return OLSKTestingLocalized(inputData, languageCode);
			};

			before(function() {
				return browser.visit(kDefaultRoutePath);
			});

			it('on startup', function() {
				deepEqual(browser.query(LCHLauncherZoneInputText).textContent, 'Type to search');
			});

		});
		
	});
});

