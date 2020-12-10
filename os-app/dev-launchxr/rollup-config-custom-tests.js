const { throws, deepEqual } = require('assert');

const mod = require('./rollup-config-custo.js');

describe('LCHLauncherRollupGrabContainerSelector', function test_LCHLauncherRollupGrabContainerSelector() {

	it('throws error if not string', function() {
		throws(function() {
			mod.LCHLauncherRollupGrabContainerSelector(null);
		}, /LCHErrorInputNotValid/);
	});

	it('throws error if no identifier', function() {
		throws(function() {
			mod.LCHLauncherRollupGrabContainerSelector('.Containerr {');
		}, /LCHErrorInputNotValid/);
	});

	it('throws error if no bracket', function() {
		throws(function() {
			mod.LCHLauncherRollupGrabContainerSelector('.Container');
		}, /LCHErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mod.LCHLauncherRollupGrabContainerSelector('.Container {'), '.Container');
	});

	it('matches if leading space', function() {
		deepEqual(mod.LCHLauncherRollupGrabContainerSelector(' .Container {'), '.Container');
	});

	it('matches if no bracket space', function() {
		deepEqual(mod.LCHLauncherRollupGrabContainerSelector('.Container{'), '.Container');
	});

});

describe('LCHLauncherRollupPrefixSelector', function test_LCHLauncherRollupPrefixSelector() {

	it('throws error if param1 not string', function() {
		throws(function() {
			mod.LCHLauncherRollupPrefixSelector(null, '');
		}, /LCHErrorInputNotValid/);
	});

	it('throws error if param2 not string', function() {
		throws(function() {
			mod.LCHLauncherRollupPrefixSelector('', null);
		}, /LCHErrorInputNotValid/);
	});

	it('prefixes with identifier single', function() {
		deepEqual(mod.LCHLauncherRollupPrefixSelector('alfa', `\ntemplate {
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
		deepEqual(mod.LCHLauncherRollupPrefixSelector('alfa', `\ntemplate, sidebar {
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
		deepEqual(mod.LCHLauncherRollupPrefixSelector('alfa', `\nbody {
display: none;
}`), `\nalfa {
display: none;
}`);
	});

	it('strips html', function() {
		deepEqual(mod.LCHLauncherRollupPrefixSelector('alfa', `\nhtml {
display: none;
}`), `\nalfa {
display: none;
}`);
	});

});

describe('LCHLauncherRollupConfigCustom', function test_LCHLauncherRollupConfigCustom() {

	it('throws error if not object', function() {
		throws(function() {
			mod.LCHLauncherRollupConfigCustom(null);
		}, /LCHErrorInputNotValid/);
	})

	it('sets output.format', function() {
		deepEqual(mod.LCHLauncherRollupConfigCustom({
			output: {},
		}).output.format, 'umd');
	});

});
