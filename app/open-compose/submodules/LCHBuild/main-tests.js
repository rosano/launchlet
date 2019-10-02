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

	it('excludes @context', function() {
		deepEqual(mainModule.LCHBuildRecipeArrayString([{
			'@context': 'alfa',
		}]), '[{}]');
	});

	it('excludes LCHDocumentID', function() {
		deepEqual(mainModule.LCHBuildRecipeArrayString([{
			LCHDocumentID: 'alfa',
		}]), '[{}]');
	});

	it('excludes LCHDocumentCreationDate', function() {
		deepEqual(mainModule.LCHBuildRecipeArrayString([{
			LCHDocumentCreationDate: 'alfa',
		}]), '[{}]');
	});

	it('excludes LCHDocumentModificationDate', function() {
		deepEqual(mainModule.LCHBuildRecipeArrayString([{
			LCHDocumentModificationDate: 'alfa',
		}]), '[{}]');
	});

	it('excludes LCHDocumentIsFlagged', function() {
		deepEqual(mainModule.LCHBuildRecipeArrayString([{
			LCHDocumentIsFlagged: 'alfa',
		}]), '[{}]');
	});

});

describe('LCHBuildStripLivereload', function testLCHBuildStripLivereload() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHBuildStripLivereload(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.LCHBuildStripLivereload(''), '');
	});

	it('strips livereload single', function() {
		deepEqual(mainModule.LCHBuildStripLivereload(`alfa(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':1234567890/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e);})(document, 'script');bravo`), 'alfabravo');
	});

	it('strips livereload multiple', function() {
		deepEqual(mainModule.LCHBuildStripLivereload(`alfa(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':1234567890/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e);})(document, 'script');bravo(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':5000/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e);})(document, 'script');charlie`), 'alfabravocharlie');
	});

});
