import { deepEqual } from 'assert';

const browser = new OLSKBrowser();
const kDefaultRoutePath = require('../../controller.js').OLSKControllerRoutes().LCHComposeRoute.OLSKRoutePath;

describe('LCHCompileUILocalize', function () {

	['en'].forEach(function (languageCode) {

		context(languageCode, function () {

			const uLocalized = function (inputData) {
				return OLSKTestingLocalized(inputData, languageCode);
			};

			before(function() {
				return browser.visit(`${ languageCode }${ kDefaultRoutePath }`);
			});

			it('localizes interface', function() {
				browser.assert.text(`label[for=${ LCHCompileModePipeEnabledToggle.replace('#', '') }]`, uLocalized('LCHCompileModePipeEnabledToggleLabelText'));
			});

		});
		
	});

});
