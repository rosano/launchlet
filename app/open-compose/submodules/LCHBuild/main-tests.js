import { throws, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('LCHBuildFunctionString', function testLCHBuildFunctionString() {

	it('throws error if param1 not string', function() {
		throws(function() {
			mainModule.LCHBuildFunctionString(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.LCHBuildFunctionString('alfa', ''), 'function () { alfa }');
	});

	context('param2', function() {

		it('throws error if not string', function() {
			throws(function() {
				mainModule.LCHBuildFunctionString('', null);
			}, /LCHErrorInputNotValid/);
		});

		it('returns string', function() {
			deepEqual(mainModule.LCHBuildFunctionString('alfa', 'bravo'), 'function (bravo) { alfa }');
		});

	});

});
