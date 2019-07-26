import { throws, doesNotThrow, deepEqual } from 'assert';

import * as mainModule from './rollup-config-custom.js';

describe('LCHRollupGrabContainerSelector', function testLCHRollupGrabContainerSelector() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHRollupGrabContainerSelector(null);
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if no identifier', function() {
		throws(function() {
			mainModule.LCHRollupGrabContainerSelector('.Containerr {');
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if no bracket', function() {
		throws(function() {
			mainModule.LCHRollupGrabContainerSelector('.Container');
		}, /LCHErrorInputInvalid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.LCHRollupGrabContainerSelector('.Container {'), '.Container');
	});

	it('matches if leading space', function() {
		deepEqual(mainModule.LCHRollupGrabContainerSelector(' .Container {'), '.Container');
	});

	it('matches if no bracket space', function() {
		deepEqual(mainModule.LCHRollupGrabContainerSelector('.Container{'), '.Container');
	});

});

describe('LCHRollupPrefixSelector', function testLCHRollupPrefixSelector() {

	it('throws error if param1 not string', function() {
		throws(function() {
			mainModule.LCHRollupPrefixSelector(null, '');
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if param2 not string', function() {
		throws(function() {
			mainModule.LCHRollupPrefixSelector('', null);
		}, /LCHErrorInputInvalid/);
	});

	it('prefixes with identifier', function() {
		deepEqual(mainModule.LCHRollupPrefixSelector('alfa', `\ntemplate {
display: none;
}

[hidden] {
display: none;
}`), `\nalfa :global(template ) {
display: none;
}

alfa :global([hidden] ) {
display: none;
}`);
	});

	it('strips body', function() {
		deepEqual(mainModule.LCHRollupPrefixSelector('alfa', `\nbody {
display: none;
}`), `\nalfa {
display: none;
}`);
	});

	it('strips html', function() {
		deepEqual(mainModule.LCHRollupPrefixSelector('alfa', `\nhtml {
display: none;
}`), `\nalfa {
display: none;
}`);
	});

});
