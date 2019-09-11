import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHComposeBuildPairExtensionUIUnpair', function () {

	before(function() {
		return browser.visit(`${ kDefaultRoute.OLSKRoutePath }?BuildPairExtensionPublicKey=alfa`);
	});

	context('Unpair', function testUnpair () {
		
		before(function () {
			browser.click(LCHBuildPairExtensionUnpairButton)
		});
		
		it('sends BuildPairExtensionDispatchPublicKeyUpdate', function() {
			browser.assert.text('#LCHComposeBuildPairExtensionDispatchPublicKeyUpdate', '1');
			browser.assert.text('#LCHComposeBuildPairExtensionDispatchPublicKeyUpdateText', '');
		});
	
	});

});
