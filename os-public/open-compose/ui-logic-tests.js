const assert = require('assert');

const RCSLaunchletLogic = require('./ui-logic.js');

context('RCSLaunchletLogicFilter', function() {

	it('throws error if not string', function() {
		assert.throws(function() {
			RCSLaunchletLogic.RCSLaunchletLogicFilter(null);
		}, /RCSErrorInvalidInput/);
	});

	it('returns function', function() {
		assert.strictEqual(typeof RCSLaunchletLogic.RCSLaunchletLogicFilter('alfa'), 'function');
	});

	context('function', function () {

		it('returns false if match id', function() {
			assert.strictEqual(RCSLaunchletLogic.RCSLaunchletLogicFilter('alfa')({
				id: 'alfa',
			}), false);
		});

		it('returns false if match fn', function() {
			assert.strictEqual(RCSLaunchletLogic.RCSLaunchletLogicFilter('alfa')({
				fn: function () {
					return 'alfa';
				},
			}), false);
		});

		it('returns false if no match name', function() {
			assert.strictEqual(RCSLaunchletLogic.RCSLaunchletLogicFilter('alfa')({
				name: 'bravo',
			}), false);
		});

		it('returns false if no match labels', function() {
			assert.strictEqual(RCSLaunchletLogic.RCSLaunchletLogicFilter('alfa')({
				labels: [
					'bravo',
				],
			}), false);
		});

		it('returns true if match name', function() {
			assert.strictEqual(RCSLaunchletLogic.RCSLaunchletLogicFilter('alfa')({
				name: 'alfa',
			}), true);
		});

		it('returns true if match labels', function() {
			assert.strictEqual(RCSLaunchletLogic.RCSLaunchletLogicFilter('alfa')({
				labels: [
					'alfa',
				],
			}), true);
		});

		it('returns true if match partial', function() {
			assert.strictEqual(RCSLaunchletLogic.RCSLaunchletLogicFilter('alf')({
				name: 'alfa',
			}), true);
		});
		
	});

});
