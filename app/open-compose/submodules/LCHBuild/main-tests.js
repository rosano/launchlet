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

describe('LCHBuildConvertDocumentFunctions', function testLCHBuildConvertDocumentFunctions() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHBuildConvertDocumentFunctions(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns object', function() {
		deepEqual(mainModule.LCHBuildConvertDocumentFunctions({}), {});
	});

	it('returns new object', function() {
		let item = {};
		deepEqual(mainModule.LCHBuildConvertDocumentFunctions(item) !== item, true);
	});

	context('LCHDocumentCallbackBody', function () {

		it('converts body', function() {
			deepEqual(mainModule.LCHBuildConvertDocumentFunctions({
				LCHDocumentCallbackBody: 'alfa',
			}), {
				LCHDocumentCallback: 'function () { alfa }',
			});
		});

		it('converts arguments', function() {
			deepEqual(mainModule.LCHBuildConvertDocumentFunctions({
				LCHDocumentCallbackArgs: 'alfa',
				LCHDocumentCallbackBody: 'bravo',
			}), {
				LCHDocumentCallback: 'function (alfa) { bravo }',
			});
		});
	
	});

	context('LCHDocumentCanonicalExampleCallback', function () {

		it('converts body', function() {
			deepEqual(mainModule.LCHBuildConvertDocumentFunctions({
				LCHDocumentCanonicalExampleCallbackBody: 'alfa',
			}), {
				LCHDocumentCanonicalExampleCallback: 'function () { alfa }',
			});
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

describe('LCHBuildRecipeArrayString', function testLCHBuildRecipeArrayString() {

	it('throws error if not array', function() {
		throws(function() {
			mainModule.LCHBuildRecipeArrayString(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.LCHBuildRecipeArrayString([]), '[]');
	});

	it('serializes objects', function() {
		deepEqual(mainModule.LCHBuildRecipeArrayString([{
			alfa: 'bravo',
			charlie: true,
		}]), '[{"alfa":"bravo","charlie":true}]');
	});

	it('converts fields', function() {
		deepEqual(mainModule.LCHBuildRecipeArrayString([{
			LCHDocumentName: 'alfa',
			LCHDocumentCallbackBody: 'bravo'
		}]), '[{"LCHRecipeName":"alfa","LCHRecipeCallback":function () { bravo }}]');
	});

});
