import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, 'en');
};

describe('LCHGuideLocalize', function () {

	before(function() {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	context('Startup', function testStartup() {

		it('localizes title', function() {
			browser.assert.text('title', uLocalized('LCHGuideTitle'))
		});

		it('localizes description', function() {
			browser.assert.attribute('meta[name=description]', 'content', uLocalized('LCHGuideDescription'))
		});
		
	});

});
