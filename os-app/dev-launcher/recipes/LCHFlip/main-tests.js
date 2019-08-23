import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHFlip', function testLCHFlip() {

	it('throws error if not function', function() {
		throws(function() {
			mainModule.LCHFlip(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns function', function() {
		deepEqual(typeof mainModule.LCHFlip(function() {}, []), 'function');
	});

	it('passes param2 to this', function() {
		deepEqual(mainModule.LCHFlip(function() {
			return this.alfa;
		}, {
			alfa: 'bravo',
		})(), 'bravo');
	});

	context('function', function () {
		
		it('reverses parameters', function () {
			deepEqual(mainModule.LCHFlip(function() {
				return Array.from(arguments);
			})('alfa', 'bravo'), ['bravo', 'alfa']);
		});
	
	});

});
