const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('LCHFlip', function test_LCHFlip() {

	it('throws error if not function', function() {
		throws(function() {
			mod.LCHFlip(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns function', function() {
		deepEqual(typeof mod.LCHFlip(function() {}, []), 'function');
	});

	it('passes param2 to this', function() {
		deepEqual(mod.LCHFlip(function() {
			return this.alfa;
		}, {
			alfa: 'bravo',
		})(), 'bravo');
	});

	context('function', function () {
		
		it('reverses parameters', function () {
			deepEqual(mod.LCHFlip(function() {
				return [...arguments];
			})('alfa', 'bravo'), ['bravo', 'alfa']);
		});
	
	});

});
