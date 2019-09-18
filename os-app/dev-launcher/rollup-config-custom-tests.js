import { throw, deepEqual } from 'assert';

import * as mainModule from './rollup-config-custom.js';

describe('LCHLauncherRollupGrabContainerSelector', function testLCHLauncherRollupGrabContainerSelector() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHLauncherRollupGrabContainerSelector(null);
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if no identifier', function() {
		throws(function() {
			mainModule.LCHLauncherRollupGrabContainerSelector('.Containerr {');
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if no bracket', function() {
		throws(function() {
			mainModule.LCHLauncherRollupGrabContainerSelector('.Container');
		}, /LCHErrorInputInvalid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.LCHLauncherRollupGrabContainerSelector('.Container {'), '.Container');
	});

	it('matches if leading space', function() {
		deepEqual(mainModule.LCHLauncherRollupGrabContainerSelector(' .Container {'), '.Container');
	});

	it('matches if no bracket space', function() {
		deepEqual(mainModule.LCHLauncherRollupGrabContainerSelector('.Container{'), '.Container');
	});

});

describe('LCHLauncherRollupPrefixSelector', function testLCHLauncherRollupPrefixSelector() {

	it('throws error if param1 not string', function() {
		throws(function() {
			mainModule.LCHLauncherRollupPrefixSelector(null, '');
		}, /LCHErrorInputInvalid/);
	});

	it('throws error if param2 not string', function() {
		throws(function() {
			mainModule.LCHLauncherRollupPrefixSelector('', null);
		}, /LCHErrorInputInvalid/);
	});

	it('prefixes with identifier single', function() {
		deepEqual(mainModule.LCHLauncherRollupPrefixSelector('alfa', `\ntemplate {
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

	it('prefixes with identifier multiple', function() {
		deepEqual(mainModule.LCHLauncherRollupPrefixSelector('alfa', `\ntemplate, sidebar {
display: none;
}

[hidden], [disabled] {
display: none;
}`), `\nalfa :global(template, sidebar ) {
display: none;
}

alfa :global([hidden], [disabled] ) {
display: none;
}`);
	});

	it('strips body', function() {
		deepEqual(mainModule.LCHLauncherRollupPrefixSelector('alfa', `\nbody {
display: none;
}`), `\nalfa {
display: none;
}`);
	});

	it('strips html', function() {
		deepEqual(mainModule.LCHLauncherRollupPrefixSelector('alfa', `\nhtml {
display: none;
}`), `\nalfa {
display: none;
}`);
	});

});

describe('LCHLauncherRollupConfigCustom', function testLCHLauncherRollupConfigCustom() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHLauncherRollupConfigCustom(null);
		}, /LCHErrorInputInvalid/);
	})

	it('sets output.format', function() {
		deepEqual(mainModule.LCHLauncherRollupConfigCustom({
			output: {},
		}).output.format, 'umd');
	});

});
