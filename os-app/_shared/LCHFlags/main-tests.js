import { throws, rejects, deepEqual } from 'assert';

import * as mainModule from './main.js';

describe('_LCHFlags', function test_LCHFlags() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule._LCHFlags(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns array', function() {
		deepEqual(mainModule._LCHFlags(''), []);
	});

	it('returns error string if not valid', function() {
		deepEqual(mainModule._LCHFlags('eval()'), ['LCHFlagEval']);
	});

	context('LCHFlagEval', function () {

		// Evaluating JavaScript code via eval() and new Function() https://2ality.com/2014/01/eval.html

		it('flags if eval direct', function() {
			deepEqual(mainModule._LCHFlags('eval()'), ['LCHFlagEval']);
		});
		
		it('flags if eval indirect variable', function() {
			deepEqual(mainModule._LCHFlags('(function () { alfa = eval; alfa() })'), ['LCHFlagEval']);
		});
		
		it('flags if eval indirect call', function() {
			deepEqual(mainModule._LCHFlags('eval.call(null)'), ['LCHFlagEval']);
		});
		
		it('flags if eval indirect window', function() {
			deepEqual(mainModule._LCHFlags('window.eval(null)'), ['LCHFlagEval']);
		});
		
		it('flags if eval indirect reference', function() {
			deepEqual(mainModule._LCHFlags('(1, eval)(null)'), ['LCHFlagEval']);
		});
		
		it.skip('ignores if eval other', function() {
			deepEqual(mainModule._LCHFlags('(function () { eval = console.log; eval() })'), []);
		});
		
		it('flags if Function Identifier', function() {
			deepEqual(mainModule._LCHFlags('new Function()'), ['LCHFlagEval']);
		});
		
		it('flags if Function MemberExpression', function() {
			deepEqual(mainModule._LCHFlags('window.Function(null)'), ['LCHFlagEval']);
		});
	
	});

	context('LCHFlagMultipleExpressions', function () {

		it('flags if multiple expressions at top-level', function() {
			deepEqual(mainModule._LCHFlags('(function () {});({})'), ['LCHFlagMultipleExpressions']);
		});

		it('flags if multiple expressions at second-level', function() {
			deepEqual(mainModule._LCHFlags('(function () {},{})'), ['LCHFlagMultipleExpressions']);
		});

		it('flags if multiple expressions via arguments', function() {
			deepEqual(mainModule._LCHFlags('(function () {},{})'), ['LCHFlagMultipleExpressions']);
		});
		
		it('ignores if single expression', function() {
			deepEqual(mainModule._LCHFlags('(function () {})'), []);
		});
	
	});

	context('LCHFlagStateful', function () {

		it('flags if cookie MemberExpression', function() {
			deepEqual(mainModule._LCHFlags('document.cookie'), ['LCHFlagStateful']);
		});

		it('flags if localStorage Identifier', function() {
			deepEqual(mainModule._LCHFlags('localStorage'), ['LCHFlagStateful']);
		});

		it('flags if localStorage MemberExpression', function() {
			deepEqual(mainModule._LCHFlags('window.localStorage'), ['LCHFlagStateful']);
		});

		it('flags if sessionStorage Identifier', function() {
			deepEqual(mainModule._LCHFlags('sessionStorage'), ['LCHFlagStateful']);
		});

		it('flags if sessionStorage MemberExpression', function() {
			deepEqual(mainModule._LCHFlags('window.sessionStorage'), ['LCHFlagStateful']);
		});

		it('flags if indexedDB Identifier', function() {
			deepEqual(mainModule._LCHFlags('indexedDB'), ['LCHFlagStateful']);
		});

		it('flags if indexedDB MemberExpression', function() {
			deepEqual(mainModule._LCHFlags('window.indexedDB'), ['LCHFlagStateful']);
		});

		it('flags if Cache Identifier', function() {
			deepEqual(mainModule._LCHFlags('Cache'), ['LCHFlagStateful']);
		});

		it('flags if Cache MemberExpression', function() {
			deepEqual(mainModule._LCHFlags('window.Cache'), ['LCHFlagStateful']);
		});
	
	});

	context('LCHFlagStateful', function () {

		it('flags if XMLHttpRequest Identifier', function() {
			deepEqual(mainModule._LCHFlags('XMLHttpRequest'), ['LCHFlagStateful']);
		});

		it('flags if XMLHttpRequest MemberExpression', function() {
			deepEqual(mainModule._LCHFlags('window.XMLHttpRequest'), ['LCHFlagStateful']);
		});

		it('flags if $ Identifier', function() {
			deepEqual(mainModule._LCHFlags('$'), ['LCHFlagStateful']);
		});

		it('flags if $ MemberExpression', function() {
			deepEqual(mainModule._LCHFlags('window.$'), ['LCHFlagStateful']);
		});

		it('flags if fetch Identifier', function() {
			deepEqual(mainModule._LCHFlags('fetch'), ['LCHFlagStateful']);
		});

		it('flags if fetch MemberExpression', function() {
			deepEqual(mainModule._LCHFlags('window.fetch'), ['LCHFlagStateful']);
		});
	
	});

});

describe('LCHFlags', function testLCHFlags() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHFlags(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns null', function() {
		deepEqual(mainModule.LCHFlags({
			alfa: 'bravo',
		}), null);
	});

	it('returns object if not valid', function() {
		deepEqual(mainModule.LCHFlags({
			alfa: 'eval'
		}), {
			alfa: ['LCHFlagEval'],
		});
	});

	it('ignores if not string', function() {
		deepEqual(mainModule.LCHFlags({
			alfa: new Date(),
		}), null);
	});

});
