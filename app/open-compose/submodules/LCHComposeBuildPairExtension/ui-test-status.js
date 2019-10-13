import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('LCHComposeBuildPairExtensionStatus', function () {

	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			BuildPairExtensionPublicKey: 'alfa',
		}));
	});

	context('Failed', function testFailed () {

		before(function () {
			browser.evaluate(`window.postMessage({
				LBXResponseHash: 'alfa',
				LBXResponseError: 'bravo',
			}, window.location.href)`)
		});

		it('hides LCHBuildPairExtensionStatusWaiting', function() {
			browser.assert.elements(LCHBuildPairExtensionStatusWaiting, 0);
		});

		it('shows LCHBuildPairExtensionStatusFailed', function() {
			browser.assert.elements(LCHBuildPairExtensionStatusFailed, 1);
		});

		it('shows LCHBuildPairExtensionStatusFailedError', function() {
			browser.assert.elements(LCHBuildPairExtensionStatusFailedError, 1);
		});

		it('displays LBXResponseError', function() {
			browser.assert.text(LCHBuildPairExtensionStatusFailedError, 'bravo');
		});

	});

	context('Success', function testSuccess () {

		before(function () {
			browser.evaluate(`window.postMessage({
				LBXResponseHash: 'LBX_TESTING_RESPONSE_HASH',
			}, window.location.href)`)
		});

		it('hides LCHBuildPairExtensionStatusWaiting', function() {
			browser.assert.elements(LCHBuildPairExtensionStatusWaiting, 0);
		});

		it('hides LCHBuildPairExtensionStatusFailed', function() {
			browser.assert.elements(LCHBuildPairExtensionStatusFailed, 0);
		});

	});

});
