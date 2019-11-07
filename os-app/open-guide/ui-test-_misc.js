import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHGuide_Misc', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath)
	});

	context('LCHGuide', function () {
		
		it('sets class', function () {
			browser.assert.hasClass(LCHGuide, 'OLSKCommon')
		});
	
	});

});
