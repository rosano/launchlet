import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHComposeBuildPairExtensionUIStatus', function () {

	before(function() {
		return browser.visit(`${ kDefaultRoute.OLSKRoutePath }?BuildPairExtensionPublicKey=alfa`);
	});

	context('Failed', function testFailed () {
		
		before(function () {
			browser.evaluate(`window.postMessage({
				LBXMessageResponse: 'alfa',
			}, window.location.href)`)
		});
		
		it('hides LCHBuildPairExtensionStatusWaiting', function() {
			browser.assert.elements(LCHBuildPairExtensionStatusWaiting, 0);
		});
		
		it('shows LCHBuildPairExtensionStatusFailed', function() {
			browser.assert.elements(LCHBuildPairExtensionStatusFailed, 1);
		});
	
	});

});
