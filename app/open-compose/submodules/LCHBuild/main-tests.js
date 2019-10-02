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

describe('LCHBuildObjectString', function testLCHBuildObjectString() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHBuildObjectString(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.LCHBuildObjectString({}), '{}');
	});

	it('stringifies inputData', function() {
		deepEqual(mainModule.LCHBuildObjectString({
			alfa: 'bravo',
			charlie: true,
		}), '{"alfa":"bravo","charlie":true}');
	});

	context('function', function () {

		it('prints directly', function() {
			deepEqual(mainModule.LCHBuildObjectString({
				alfa: 'function () { bravo }',
			}), '{"alfa":function () { bravo }}');
		});

		it('prints line breaks', function() {
			deepEqual(mainModule.LCHBuildObjectString({
				LCHRecipeCallback: `function() {
bravo
}`,
			}), `{"LCHRecipeCallback":function() {\nbravo\n}}`);
		});
	
	});

});
