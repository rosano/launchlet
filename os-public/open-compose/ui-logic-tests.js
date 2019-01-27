const assert = require('assert');

const LCHComposeLogic = require('./ui-logic.js');

context('LCHComposeLogicFilter', function() {

	it('throws error if not string', function() {
		assert.throws(function() {
			LCHComposeLogic.LCHComposeLogicFilter(null);
		}, /LCHErrorInvalidInput/);
	});

	it('returns function', function() {
		assert.strictEqual(typeof LCHComposeLogic.LCHComposeLogicFilter('alfa'), 'function');
	});

	context('function', function () {

		it('returns false if match id', function() {
			assert.strictEqual(LCHComposeLogic.LCHComposeLogicFilter('alfa')({
				id: 'alfa',
			}), false);
		});

		it('returns false if match fn', function() {
			assert.strictEqual(LCHComposeLogic.LCHComposeLogicFilter('alfa')({
				fn: function () {
					return 'alfa';
				},
			}), false);
		});

		it('returns false if no match name', function() {
			assert.strictEqual(LCHComposeLogic.LCHComposeLogicFilter('alfa')({
				name: 'bravo',
			}), false);
		});

		it('returns false if no match labels', function() {
			assert.strictEqual(LCHComposeLogic.LCHComposeLogicFilter('alfa')({
				labels: [
					'bravo',
				],
			}), false);
		});

		it('returns true if match name', function() {
			assert.strictEqual(LCHComposeLogic.LCHComposeLogicFilter('alfa')({
				name: 'alfa',
			}), true);
		});

		it('returns true if match labels', function() {
			assert.strictEqual(LCHComposeLogic.LCHComposeLogicFilter('alfa')({
				labels: [
					'alfa',
				],
			}), true);
		});

		it('returns true if match partial', function() {
			assert.strictEqual(LCHComposeLogic.LCHComposeLogicFilter('alf')({
				name: 'alfa',
			}), true);
		});
		
	});

});
