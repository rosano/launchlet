import { throws, rejects, deepEqual } from 'assert';

import * as mainModule from './safety.js';

describe('LCHSafetyFlags', function testLCHSafetyFlags() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHSafetyFlags(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns array', function() {
		deepEqual(mainModule.LCHSafetyFlags(''), []);
	});

	it('returns error string if not valid', function() {
		deepEqual(mainModule.LCHSafetyFlags('eval()'), ['LCHSafetyErrorEvaluatesString']);
	});

	context('LCHSafetyErrorEvaluatesString', function () {

		// Evaluating JavaScript code via eval() and new Function() https://2ality.com/2014/01/eval.html

		it('flags if eval direct', function() {
			deepEqual(mainModule.LCHSafetyFlags('eval()'), ['LCHSafetyErrorEvaluatesString']);
		});
		
		it('flags if eval indirect variable', function() {
			deepEqual(mainModule.LCHSafetyFlags('alfa = eval; alfa()'), ['LCHSafetyErrorEvaluatesString']);
		});
		
		it('flags if eval indirect call', function() {
			deepEqual(mainModule.LCHSafetyFlags('eval.call(null)'), ['LCHSafetyErrorEvaluatesString']);
		});
		
		it('flags if eval indirect window', function() {
			deepEqual(mainModule.LCHSafetyFlags('window.eval(null)'), ['LCHSafetyErrorEvaluatesString']);
		});
		
		it('flags if eval indirect reference', function() {
			deepEqual(mainModule.LCHSafetyFlags('(1, eval)(null)'), ['LCHSafetyErrorEvaluatesString']);
		});
		
		it.skip('ignores if eval other', function() {
			deepEqual(mainModule.LCHSafetyFlags('eval = console.log; eval()'), []);
		});
		
		it('flags if Function Identifier', function() {
			deepEqual(mainModule.LCHSafetyFlags('new Function()'), ['LCHSafetyErrorEvaluatesString']);
		});
		
		it('flags if Function MemberExpression', function() {
			deepEqual(mainModule.LCHSafetyFlags('window.Function(null)'), ['LCHSafetyErrorEvaluatesString']);
		});
	
	});

});
