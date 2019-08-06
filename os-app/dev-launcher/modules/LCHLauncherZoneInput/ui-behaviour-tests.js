'use strict'
import { throws, deepEqual } from 'assert';

const Browser = require('zombie');

Browser.localhost('loc.tests', 3000);

const browser = new Browser();
const kDefaultRoutePath = '/modules/LCHLauncherZoneInput';
const LCHLauncherZoneInput = '.LCHLauncherZoneInput';
const LCHLauncherZoneInputPlaceholder = '.LCHLauncherZoneInputPlaceholder';

describe.only('LCHLauncherZoneInputDiscovery', function testLCHLauncherZoneInputDiscovery() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('on startup', function() {
		browser.assert.elements(LCHLauncherZoneInputPlaceholder, 1);
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
				deepEqual(browser.query(LCHLauncherZoneInputPlaceholder).textContent, 'Type to search');
			});

		});
		
	});
});

describe.only('LCHLauncherZoneInputInteraction', function testLCHLauncherZoneInputInteraction() {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});

	context('isSelected', function () {

		it('defaults to false', function() {
			browser.assert.hasNoClass(LCHLauncherZoneInput, 'LCHLauncherZoneInputSelected');
		});

		it('adds class if true', async function() {
			browser.pressButton('#LCHLauncherZoneInputTestSelect');
			await browser.wait({ element: '.LCHLauncherZoneInputSelected' });

			browser.assert.hasClass(LCHLauncherZoneInput, 'LCHLauncherZoneInputSelected');
		});
		
	});

	context('didClick', function () {

		it('runs callback on click', async function() {
			deepEqual(browser.query('#LCHLauncherZoneInputTestClick').textContent, '0');

			browser.click(LCHLauncherZoneInput);
			await browser.wait({ element: '.LCHLauncherZoneInputSelected' });

			deepEqual(browser.query('#LCHLauncherZoneInputTestClick').textContent, '1');
		});
		
	});

});
