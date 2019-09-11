import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHComposeBuildUIPair', function () {

	context('PreloadPublicKey', function testPreloadPublicKey() {

		before(function() {
			return browser.visit(`${ kDefaultRoute.OLSKRoutePath }?BuildPublicKey=alfa`);
		});
		
		it('hides LCHComposeBuildPairButton', function() {
			browser.assert.elements(LCHComposeBuildPairButton, 0);
		});
		
		it('shows LCHComposeBuildPairExtension', function() {
			browser.assert.elements(LCHComposeBuildPairExtension, 1);
		});

	});

});
