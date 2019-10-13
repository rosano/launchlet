import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHComposeBuildPairExtensionDeleteKey', function () {

	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			BuildPairExtensionPublicKey: 'alfa',
		}));
	});

	context('DeleteKey', function testDeleteKey () {

		before(function () {
			browser.click(LCHBuildPairExtensionDeleteKeyButton)
		});

		it('sends BuildPairExtensionDispatchPublicKeyUpdate', function() {
			browser.assert.text('#LCHComposeBuildPairExtensionDispatchPublicKeyUpdate', '1');
			browser.assert.text('#LCHComposeBuildPairExtensionDispatchPublicKeyUpdateText', '');
		});

	});

});
