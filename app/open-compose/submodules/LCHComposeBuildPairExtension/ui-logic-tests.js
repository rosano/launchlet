const { throws, deepEqual } = require('assert');

const mainModule = require('./ui-logic.js');

describe('LCHComposeBuildPairExtensionPublicKeyIsValid', function testLCHComposeBuildPairExtensionPublicKeyIsValid() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHComposeBuildPairExtensionPublicKeyIsValid(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns false if empty', function() {
		deepEqual(mainModule.LCHComposeBuildPairExtensionPublicKeyIsValid(''), false);
	});

	it('returns false if blank', function() {
		deepEqual(mainModule.LCHComposeBuildPairExtensionPublicKeyIsValid(' '), false);
	});

	it('returns false if whitespace leading', function() {
		deepEqual(mainModule.LCHComposeBuildPairExtensionPublicKeyIsValid(' alfa'), false);
	});

	it('returns false if whitespace trailing', function() {
		deepEqual(mainModule.LCHComposeBuildPairExtensionPublicKeyIsValid('alfa '), false);
	});

	it('returns true', function() {
		deepEqual(mainModule.LCHComposeBuildPairExtensionPublicKeyIsValid('alfa'), true);
	});

});
