const { throws, deepEqual } = require('assert');

const mainModule = require('./rollup-config-custo.js');

describe('LCHLaunchxrRollupGrabContainerSelector', function test_LCHLaunchxrRollupGrabContainerSelector() {

	it('throws error if not string', function() {
		throws(function() {
			mainModule.LCHLaunchxrRollupGrabContainerSelector(null);
		}, /LCHErrorInputNotValid/);
	});

	it('throws error if no identifier', function() {
		throws(function() {
			mainModule.LCHLaunchxrRollupGrabContainerSelector('.Containerr {');
		}, /LCHErrorInputNotValid/);
	});

	it('throws error if no bracket', function() {
		throws(function() {
			mainModule.LCHLaunchxrRollupGrabContainerSelector('.Container');
		}, /LCHErrorInputNotValid/);
	});

	it('returns string', function() {
		deepEqual(mainModule.LCHLaunchxrRollupGrabContainerSelector('.Container {'), '.Container');
	});

	it('matches if leading space', function() {
		deepEqual(mainModule.LCHLaunchxrRollupGrabContainerSelector(' .Container {'), '.Container');
	});

	it('matches if no bracket space', function() {
		deepEqual(mainModule.LCHLaunchxrRollupGrabContainerSelector('.Container{'), '.Container');
	});

});

describe('LCHLaunchxrRollupPrefixSelector', function test_LCHLaunchxrRollupPrefixSelector() {

	it('throws error if param1 not string', function() {
		throws(function() {
			mainModule.LCHLaunchxrRollupPrefixSelector(null, '');
		}, /LCHErrorInputNotValid/);
	});

	it('throws error if param2 not string', function() {
		throws(function() {
			mainModule.LCHLaunchxrRollupPrefixSelector('', null);
		}, /LCHErrorInputNotValid/);
	});

	it('prefixes with identifier single', function() {
		deepEqual(mainModule.LCHLaunchxrRollupPrefixSelector('alfa', `\ntemplate {
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
		deepEqual(mainModule.LCHLaunchxrRollupPrefixSelector('alfa', `\ntemplate, sidebar {
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
		deepEqual(mainModule.LCHLaunchxrRollupPrefixSelector('alfa', `\nbody {
display: none;
}`), `\nalfa {
display: none;
}`);
	});

	it('strips html', function() {
		deepEqual(mainModule.LCHLaunchxrRollupPrefixSelector('alfa', `\nhtml {
display: none;
}`), `\nalfa {
display: none;
}`);
	});

});

describe('LCHLaunchxrRollupConfigCustom', function test_LCHLaunchxrRollupConfigCustom() {

	it('throws error if not object', function() {
		throws(function() {
			mainModule.LCHLaunchxrRollupConfigCustom(null);
		}, /LCHErrorInputNotValid/);
	})

	it('sets output.format', function() {
		deepEqual(mainModule.LCHLaunchxrRollupConfigCustom({
			output: {},
		}).output.format, 'umd');
	});

});
