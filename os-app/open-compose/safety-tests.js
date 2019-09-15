import { throws, rejects, deepEqual } from 'assert';

import * as mainModule from './safety.js';

describe('_LCHSafetyFlags', function test_LCHSafetyFlags() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule._LCHSafetyFlags(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns array', function() {
		deepEqual(mainModule._LCHSafetyFlags(''), []);
	});

	it('returns error string if not valid', function() {
		deepEqual(mainModule._LCHSafetyFlags('eval()'), ['LCHSafetyFlagEvaluatesString']);
	});

	context('LCHSafetyFlagEvaluatesString', function () {

		// Evaluating JavaScript code via eval() and new Function() https://2ality.com/2014/01/eval.html

		it('flags if eval direct', function() {
			deepEqual(mainModule._LCHSafetyFlags('eval()'), ['LCHSafetyFlagEvaluatesString']);
		});
		
		it('flags if eval indirect variable', function() {
			deepEqual(mainModule._LCHSafetyFlags('alfa = eval; alfa()'), ['LCHSafetyFlagEvaluatesString']);
		});
		
		it('flags if eval indirect call', function() {
			deepEqual(mainModule._LCHSafetyFlags('eval.call(null)'), ['LCHSafetyFlagEvaluatesString']);
		});
		
		it('flags if eval indirect window', function() {
			deepEqual(mainModule._LCHSafetyFlags('window.eval(null)'), ['LCHSafetyFlagEvaluatesString']);
		});
		
		it('flags if eval indirect reference', function() {
			deepEqual(mainModule._LCHSafetyFlags('(1, eval)(null)'), ['LCHSafetyFlagEvaluatesString']);
		});
		
		it.skip('ignores if eval other', function() {
			deepEqual(mainModule._LCHSafetyFlags('eval = console.log; eval()'), []);
		});
		
		it('flags if Function Identifier', function() {
			deepEqual(mainModule._LCHSafetyFlags('new Function()'), ['LCHSafetyFlagEvaluatesString']);
		});
		
		it('flags if Function MemberExpression', function() {
			deepEqual(mainModule._LCHSafetyFlags('window.Function(null)'), ['LCHSafetyFlagEvaluatesString']);
		});
	
	});

});

describe('LCHSafetyFlags', function testLCHSafetyFlags() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHSafetyFlags(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns null', function() {
		deepEqual(mainModule.LCHSafetyFlags({
			alfa: 'bravo',
		}), null);
	});

	it('returns object if not valid', function() {
		deepEqual(mainModule.LCHSafetyFlags({
			alfa: 'eval'
		}), {
			alfa: ['LCHSafetyFlagEvaluatesString'],
		});
	});

	it('ignores if not string', function() {
		deepEqual(mainModule.LCHSafetyFlags({
			alfa: new Date(),
		}), null);
	});

});
