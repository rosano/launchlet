import { throws, doesNotThrow, deepEqual } from 'assert';

import * as mainModule from './rollup-config-custom.js';

describe('LCHRollupGrabContainerSelector', function testLCHRollupGrabContainerSelector() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHRollupGrabContainerSelector(null);
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if no bracket', function() {
		throws(function() {
			mainModule.LCHRollupGrabContainerSelector('.Container.svelte-alfa123');
		}, /LCHErrorInputInvalid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.LCHRollupGrabContainerSelector('.Container.svelte-alfa123 {'), '.Container.svelte-alfa123');
	});

	it('matches without space', function() {
		deepEqual(mainModule.LCHRollupGrabContainerSelector('.Container.svelte-alfa123{'), '.Container.svelte-alfa123');
	});

});
