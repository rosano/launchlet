const assert = require('assert');

const mainModule = require('./ui-logic.js');

describe('LCHComposeLogicFilter', function testLCHComposeLogicFilter() {

	it('throws error if not string', function() {
		assert.throws(function() {
			mainModule.LCHComposeLogicFilter(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns function', function() {
		assert.strictEqual(typeof mainModule.LCHComposeLogicFilter('alfa'), 'function');
	});

	context('function', function () {

		it('returns false if match id', function() {
			assert.strictEqual(mainModule.LCHComposeLogicFilter('alfa')({
				id: 'alfa',
			}), false);
		});

		it('returns false if match fn', function() {
			assert.strictEqual(mainModule.LCHComposeLogicFilter('alfa')({
				fn: function () {
					return 'alfa';
				},
			}), false);
		});

		it('returns false if no match name', function() {
			assert.strictEqual(mainModule.LCHComposeLogicFilter('alfa')({
				name: 'bravo',
			}), false);
		});

		it('returns false if no match labels', function() {
			assert.strictEqual(mainModule.LCHComposeLogicFilter('alfa')({
				labels: [
					'bravo',
				],
			}), false);
		});

		it('returns true if match name', function() {
			assert.strictEqual(mainModule.LCHComposeLogicFilter('alfa')({
				name: 'alfa',
			}), true);
		});

		it('returns true if match labels', function() {
			assert.strictEqual(mainModule.LCHComposeLogicFilter('alfa')({
				labels: [
					'alfa',
				],
			}), true);
		});

		it('returns true if match partial', function() {
			assert.strictEqual(mainModule.LCHComposeLogicFilter('alf')({
				name: 'alfa',
			}), true);
		});

		it('returns true if alternate case', function() {
			assert.strictEqual(mainModule.LCHComposeLogicFilter('ALF')({
				name: 'alfa',
			}), true);
		});
		
	});

});

describe('LCHComposeLogicSort', function testLCHComposeLogicSort() {

	it('sorts by LCHMemberModificationDate descending', function() {
		let item1 = {
			LCHMemberModificationDate: new Date(0),
		};
		let item2 = {
			LCHMemberModificationDate: new Date(1),
		};

		assert.deepEqual([item1, item2].sort(mainModule.LCHComposeLogicSort), [item2, item1]);
	});

	it('sorts by LCHMemberCreationDate descending if no LCHMemberModificationDate', function() {
		let item1 = {
			LCHMemberCreationDate: new Date(0),
		};
		let item2 = {
			LCHMemberCreationDate: new Date(1),
		};

		assert.deepEqual([item1, item2].sort(mainModule.LCHComposeLogicSort), [item2, item1]);
	});

});
