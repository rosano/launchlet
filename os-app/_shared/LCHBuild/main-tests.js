const { throws, deepEqual } = require('assert');

const mod = require('./main.js').default;

describe('LCHBuildFunctionString', function test_LCHBuildFunctionString() {

	it('throws error if param1 not string', function() {
		throws(function() {
			mod.LCHBuildFunctionString(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mod.LCHBuildFunctionString('alfa', ''), 'function () { alfa }');
	});

	context('param2', function() {

		it('throws error if not string', function() {
			throws(function() {
				mod.LCHBuildFunctionString('', null);
			}, /LCHErrorInputNotValid/);
		});

		it('returns string', function() {
			deepEqual(mod.LCHBuildFunctionString('alfa', 'bravo'), 'function (bravo) { alfa }');
		});

	});

});

describe('LCHBuildConvertDocumentFunctions', function test_LCHBuildConvertDocumentFunctions() {

	it('throws error if not object', function() {
		throws(function() {
			mod.LCHBuildConvertDocumentFunctions(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns object', function() {
		deepEqual(mod.LCHBuildConvertDocumentFunctions({}), {});
	});

	it('returns new object', function() {
		let item = {};
		deepEqual(mod.LCHBuildConvertDocumentFunctions(item) !== item, true);
	});

	context('LCHDocumentCallbackBody', function () {

		it('converts body', function() {
			deepEqual(mod.LCHBuildConvertDocumentFunctions({
				LCHDocumentCallbackBody: 'alfa',
			}), {
				LCHDocumentCallback: 'function () { alfa }',
			});
		});

		it('converts arguments', function() {
			deepEqual(mod.LCHBuildConvertDocumentFunctions({
				LCHDocumentCallbackArgs: 'alfa',
				LCHDocumentCallbackBody: 'bravo',
			}), {
				LCHDocumentCallback: 'function (alfa) { bravo }',
			});
		});
	
	});

	context('LCHDocumentCanonicalExampleCallback', function () {

		it('converts body', function() {
			deepEqual(mod.LCHBuildConvertDocumentFunctions({
				LCHDocumentCanonicalExampleCallbackBody: 'alfa',
			}), {
				LCHDocumentCanonicalExampleCallback: 'function () { alfa }',
			});
		});
	
	});

});

describe('LCHBuildObjectString', function test_LCHBuildObjectString() {

	it('throws error if not object', function() {
		throws(function() {
			mod.LCHBuildObjectString(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mod.LCHBuildObjectString({}), '{}');
	});

	it('stringifies inputData', function() {
		deepEqual(mod.LCHBuildObjectString({
			alfa: 'bravo',
			charlie: true,
		}), '{"alfa":"bravo","charlie":true}');
	});

	context('function', function () {

		it('prints directly', function() {
			deepEqual(mod.LCHBuildObjectString({
				alfa: 'function () { bravo }',
			}), '{"alfa":function () { bravo }}');
		});

		it('prints line breaks', function() {
			deepEqual(mod.LCHBuildObjectString({
				LCHRecipeCallback: `function() {
bravo
}`,
			}), `{"LCHRecipeCallback":function() {\nbravo\n}}`);
		});
	
	});

});

describe('LCHBuildRecipeArrayString', function test_LCHBuildRecipeArrayString() {

	it('throws error if not array', function() {
		throws(function() {
			mod.LCHBuildRecipeArrayString(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mod.LCHBuildRecipeArrayString([]), '[]');
	});

	it('serializes objects', function() {
		deepEqual(mod.LCHBuildRecipeArrayString([{
			alfa: 'bravo',
			charlie: true,
		}]), '[{"alfa":"bravo","charlie":true}]');
	});

	it('converts fields', function() {
		deepEqual(mod.LCHBuildRecipeArrayString([{
			LCHDocumentName: 'alfa',
			LCHDocumentCallbackBody: 'bravo'
		}]), '[{"LCHRecipeName":"alfa","LCHRecipeCallback":function () { bravo }}]');
	});

	it('excludes @context', function() {
		deepEqual(mod.LCHBuildRecipeArrayString([{
			'@context': 'alfa',
		}]), '[{}]');
	});

	it('excludes LCHDocumentID', function() {
		deepEqual(mod.LCHBuildRecipeArrayString([{
			LCHDocumentID: 'alfa',
		}]), '[{}]');
	});

	it('excludes LCHDocumentCreationDate', function() {
		deepEqual(mod.LCHBuildRecipeArrayString([{
			LCHDocumentCreationDate: 'alfa',
		}]), '[{}]');
	});

	it('excludes LCHDocumentModificationDate', function() {
		deepEqual(mod.LCHBuildRecipeArrayString([{
			LCHDocumentModificationDate: 'alfa',
		}]), '[{}]');
	});

	it('excludes LCHDocumentIsFlagged', function() {
		deepEqual(mod.LCHBuildRecipeArrayString([{
			LCHDocumentIsFlagged: 'alfa',
		}]), '[{}]');
	});

});

describe('LCHBuildStripLivereload', function test_LCHBuildStripLivereload() {

	it('throws error if not string', function() {
		throws(function() {
			mod.LCHBuildStripLivereload(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mod.LCHBuildStripLivereload(''), '');
	});

	it('strips single', function() {
		deepEqual(mod.LCHBuildStripLivereload(`alfa(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':1234567890/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e);})(document, 'script');bravo`), 'alfabravo');
	});

	it('strips multiple', function() {
		deepEqual(mod.LCHBuildStripLivereload(`alfa(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':1234567890/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e);})(document, 'script');bravo(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':5000/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e);})(document, 'script');charlie`), 'alfabravocharlie');
	});

	it('strips legacy', function() {
		deepEqual(mod.LCHBuildStripLivereload(`alfa(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':1234567890/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');bravo`), 'alfabravo');
	});

});

describe('LCHBuildStripSourceMap', function test_LCHBuildStripSourceMap() {

	it('throws error if not string', function() {
		throws(function() {
			mod.LCHBuildStripSourceMap(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mod.LCHBuildStripSourceMap(''), '');
	});

	it('strips single', function() {
		deepEqual(mod.LCHBuildStripSourceMap(`alfa//# sourceMappingURL=ui-behaviour.js.mapbravo`), 'alfabravo');
	});

	it('strips multiple', function() {
		deepEqual(mod.LCHBuildStripSourceMap(`alfa//# sourceMappingURL=launchlet.js.mapbravo//# sourceMappingURL=ui-behaviour.js.mapcharlie`), 'alfabravocharlie');
	});

	it('strips css', function() {
		deepEqual(mod.LCHBuildStripSourceMap(`alfa//# sourceMappingURL=ui-behaviour.css.mapbravo`), 'alfabravo');
	});

});

describe('LCHBuildEscape', function test_LCHBuildEscape() {

	it('throws error if not string', function() {
		throws(function() {
			mod.LCHBuildEscape(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mod.LCHBuildEscape('(function() { return; })()'), 'javascript:(function()%20%7B%20return%3B%20%7D)()');
	});

});
