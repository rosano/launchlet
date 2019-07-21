import { throws, deepEqual } from 'assert';

import * as mainModule from './ui-logic.js';

describe('LCHBookmarkletLogicFilter', function testLCHBookmarkletLogicFilter() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHBookmarkletLogicFilter(null);
		}, /LCHErrorInputInvalid/);
	});

	it('returns function', function() {
		deepEqual(typeof mainModule.LCHBookmarkletLogicFilter('alfa'), 'function');
	});

	context('function', function () {

		it('returns false if match id', function() {
			deepEqual(mainModule.LCHBookmarkletLogicFilter('alfa')({
				id: 'alfa',
			}), false);
		});

		it('returns false if match fn', function() {
			deepEqual(mainModule.LCHBookmarkletLogicFilter('alfa')({
				fn: function () {
					return 'alfa';
				},
			}), false);
		});

		it('returns false if no match name', function() {
			deepEqual(mainModule.LCHBookmarkletLogicFilter('alfa')({
				name: 'bravo',
			}), false);
		});

		it('returns false if no match labels', function() {
			deepEqual(mainModule.LCHBookmarkletLogicFilter('alfa')({
				labels: [
					'bravo',
				],
			}), false);
		});

		it('returns true if match name', function() {
			deepEqual(mainModule.LCHBookmarkletLogicFilter('alfa')({
				name: 'alfa',
			}), true);
		});

		it('returns true if match labels', function() {
			deepEqual(mainModule.LCHBookmarkletLogicFilter('alfa')({
				labels: [
					'alfa',
				],
			}), true);
		});

		it('returns true if match partial', function() {
			deepEqual(mainModule.LCHBookmarkletLogicFilter('alf')({
				name: 'alfa',
			}), true);
		});

		it('returns true if alternate case', function() {
			deepEqual(mainModule.LCHBookmarkletLogicFilter('ALF')({
				name: 'alfa',
			}), true);
		});
		
	});

});
