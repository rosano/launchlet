const { throws, deepEqual } = require('assert');

const mod = require('./main.js').default;

describe('_LCHFlags', function test_LCHFlags() {

	it('throws error if not string', function() {
		throws(function() {
			mod._LCHFlags(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns array', function() {
		deepEqual(mod._LCHFlags(''), []);
	});

	it('returns error string if not valid', function() {
		deepEqual(mod._LCHFlags('eval()'), ['LCHFlagEval']);
	});

	context('LCHFlagEval', function () {

		// Evaluating JavaScript code via eval() and new Function() https://2ality.com/2014/01/eval.html

		it('flags if eval direct', function() {
			deepEqual(mod._LCHFlags('eval()'), ['LCHFlagEval']);
		});
		
		it('flags if eval indirect variable', function() {
			deepEqual(mod._LCHFlags('(function () { alfa = eval; alfa() })'), ['LCHFlagEval']);
		});
		
		it('flags if eval indirect call', function() {
			deepEqual(mod._LCHFlags('eval.call(null)'), ['LCHFlagEval']);
		});
		
		it('flags if eval indirect window', function() {
			deepEqual(mod._LCHFlags('window.eval(null)'), ['LCHFlagEval']);
		});
		
		it('flags if eval indirect reference', function() {
			deepEqual(mod._LCHFlags('(1, eval)(null)'), ['LCHFlagEval']);
		});
		
		it.skip('ignores if eval other', function() {
			deepEqual(mod._LCHFlags('(function () { eval = console.log; eval() })'), []);
		});
		
		it('flags if Function Identifier', function() {
			deepEqual(mod._LCHFlags('new Function()'), ['LCHFlagEval']);
		});
		
		it('flags if Function MemberExpression', function() {
			deepEqual(mod._LCHFlags('window.Function(null)'), ['LCHFlagEval']);
		});
	
	});

	context('LCHFlagMultipleExpressions', function () {

		it('flags if multiple expressions at top-level', function() {
			deepEqual(mod._LCHFlags('(function () {});({})'), ['LCHFlagMultipleExpressions']);
		});

		it('flags if multiple expressions at second-level', function() {
			deepEqual(mod._LCHFlags('(function () {},{})'), ['LCHFlagMultipleExpressions']);
		});

		it('flags if multiple expressions via arguments', function() {
			deepEqual(mod._LCHFlags('(function () {},{})'), ['LCHFlagMultipleExpressions']);
		});
		
		it('ignores if single expression', function() {
			deepEqual(mod._LCHFlags('(function () {})'), []);
		});
	
	});

	context('LCHFlagStateful', function () {

		it('flags if cookie MemberExpression', function() {
			deepEqual(mod._LCHFlags('document.cookie'), ['LCHFlagStateful']);
		});

		it('flags if localStorage Identifier', function() {
			deepEqual(mod._LCHFlags('localStorage'), ['LCHFlagStateful']);
		});

		it('flags if localStorage MemberExpression', function() {
			deepEqual(mod._LCHFlags('window.localStorage'), ['LCHFlagStateful']);
		});

		it('flags if sessionStorage Identifier', function() {
			deepEqual(mod._LCHFlags('sessionStorage'), ['LCHFlagStateful']);
		});

		it('flags if sessionStorage MemberExpression', function() {
			deepEqual(mod._LCHFlags('window.sessionStorage'), ['LCHFlagStateful']);
		});

		it('flags if indexedDB Identifier', function() {
			deepEqual(mod._LCHFlags('indexedDB'), ['LCHFlagStateful']);
		});

		it('flags if indexedDB MemberExpression', function() {
			deepEqual(mod._LCHFlags('window.indexedDB'), ['LCHFlagStateful']);
		});

		it('flags if Cache Identifier', function() {
			deepEqual(mod._LCHFlags('Cache'), ['LCHFlagStateful']);
		});

		it('flags if Cache MemberExpression', function() {
			deepEqual(mod._LCHFlags('window.Cache'), ['LCHFlagStateful']);
		});
	
	});

	context('LCHFlagStateful', function () {

		it('flags if XMLHttpRequest Identifier', function() {
			deepEqual(mod._LCHFlags('XMLHttpRequest'), ['LCHFlagStateful']);
		});

		it('flags if XMLHttpRequest MemberExpression', function() {
			deepEqual(mod._LCHFlags('window.XMLHttpRequest'), ['LCHFlagStateful']);
		});

		it('flags if $ Identifier', function() {
			deepEqual(mod._LCHFlags('$'), ['LCHFlagStateful']);
		});

		it('flags if $ MemberExpression', function() {
			deepEqual(mod._LCHFlags('window.$'), ['LCHFlagStateful']);
		});

		it('flags if fetch Identifier', function() {
			deepEqual(mod._LCHFlags('fetch'), ['LCHFlagStateful']);
		});

		it('flags if fetch MemberExpression', function() {
			deepEqual(mod._LCHFlags('window.fetch'), ['LCHFlagStateful']);
		});
	
	});

});

describe('LCHFlags', function test_LCHFlags() {

	it('throws error if not object', function() {
		throws(function() {
			mod.LCHFlags(null);
		}, /LCHErrorInputNotValid/);
	});

	it('returns null', function() {
		deepEqual(mod.LCHFlags({
			alfa: 'bravo',
		}), null);
	});

	it('returns object if not valid', function() {
		deepEqual(mod.LCHFlags({
			alfa: 'eval'
		}), {
			alfa: ['LCHFlagEval'],
		});
	});

	it('ignores if not string', function() {
		deepEqual(mod.LCHFlags({
			alfa: new Date(),
		}), null);
	});

});
